"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Calculator, CircleHelp } from "lucide-react";

/** Currency formatter */
const money = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

type Mode = "hourly" | "fixed";

export default function CK2() {
  // Core
  const [mode, setMode] = useState<Mode>("hourly");
  const [rate, setRate] = useState<number>(65);
  const [hours, setHours] = useState<number>(12);
  const [fixedBid, setFixedBid] = useState<number>(1200);

  // Expenses
  const [materials, setMaterials] = useState<number>(0);
  const [subs, setSubs] = useState<number>(0);
  const [mileage, setMileage] = useState<number>(0);
  const [otherExp, setOtherExp] = useState<number>(0);

  // Fees
  const [platformPct, setPlatformPct] = useState<number>(0);
  const [processorPct, setProcessorPct] = useState<number>(2.9);
  const [processorFlat, setProcessorFlat] = useState<number>(0.3);

  // Adjustments
  const [contingencyPct, setContingencyPct] = useState<number>(0);
  const [discountPct, setDiscountPct] = useState<number>(0);
  const [retainagePct, setRetainagePct] = useState<number>(0);

  // Taxes
  const [taxSetAsideEnabled, setTaxSetAsideEnabled] = useState<boolean>(true);
  const [taxSetAsidePct, setTaxSetAsidePct] = useState<number>(20);

  // Payment schedule
  const [depositPct, setDepositPct] = useState<number>(30);
  const [progressPct, setProgressPct] = useState<number>(40);
  const [finalPct, setFinalPct] = useState<number>(30);

  // Derived amounts
  const expenses = useMemo(() => materials + subs + mileage + otherExp, [materials, subs, mileage, otherExp]);
  const base = useMemo(() => (mode === "hourly" ? rate * hours : fixedBid), [mode, rate, hours, fixedBid]);
  const contingency = useMemo(() => (base * contingencyPct) / 100, [base, contingencyPct]);
  const discount = useMemo(() => (base * discountPct) / 100, [base, discountPct]);
  const retainage = useMemo(() => (base * retainagePct) / 100, [base, retainagePct]);
  const subtotal = useMemo(() => Math.max(0, base + contingency - discount - retainage), [base, contingency, discount, retainage]);

  const platformFee = useMemo(() => (subtotal * platformPct) / 100, [subtotal, platformPct]);
  const processorFee = useMemo(() => (subtotal * processorPct) / 100 + processorFlat, [subtotal, processorPct, processorFlat]);

  const gross = useMemo(() => subtotal, [subtotal]);
  const totalFees = useMemo(() => platformFee + processorFee, [platformFee, processorFee]);
  const netBeforeTax = useMemo(() => gross - expenses - totalFees, [gross, expenses, totalFees]);
  const taxSetAside = useMemo(
    () => (taxSetAsideEnabled ? (netBeforeTax * taxSetAsidePct) / 100 : 0),
    [taxSetAsideEnabled, netBeforeTax, taxSetAsidePct]
  );
  const takeHome = useMemo(() => netBeforeTax - taxSetAside, [netBeforeTax, taxSetAside]);

  const effectiveHourly = useMemo(() => {
    const hrs = mode === "hourly" ? hours : hours || 1;
    return takeHome / hrs;
  }, [mode, hours, takeHome]);

  const schedule = useMemo(() => {
    const clamp = (n: number) => Math.max(0, Math.min(100, n));
    const d = clamp(depositPct);
    const p = clamp(progressPct);
    const f = clamp(finalPct);
    const sum = d + p + f || 1;
    const norm = { d: (d / sum) * 100, p: (p / sum) * 100, f: (f / sum) * 100 };
    return {
      deposit: (gross * norm.d) / 100,
      progress: (gross * norm.p) / 100,
      final: (gross * norm.f) / 100,
      norm,
    };
  }, [gross, depositPct, progressPct, finalPct]);

  const copyBreakdown = async () => {
    const lines = [
      `CK2 — Quote Breakdown`,
      `Mode: ${mode === "hourly" ? "Hourly" : "Fixed Bid"}`,
      mode === "hourly" ? `Rate x Hours: ${money(rate)} × ${hours} = ${money(base)}` : `Fixed Bid: ${money(base)}`,
      `Contingency: ${contingencyPct}% → ${money(contingency)}`,
      `Discount: ${discountPct}% → -${money(discount)}`,
      `Retainage: ${retainagePct}% → -${money(retainage)}`,
      `Subtotal (pre-fees/exp): ${money(subtotal)}`,
      `Platform Fee: ${platformPct}% → -${money(platformFee)}`,
      `Processor Fee: ${processorPct}% + $${processorFlat.toFixed(2)} → -${money(processorFee)}`,
      `Expenses: -${money(expenses)}  (materials ${money(materials)}, subs ${money(subs)}, mileage ${money(mileage)}, other ${money(otherExp)})`,
      `Net before Tax: ${money(netBeforeTax)}`,
      `Tax Set-Aside: ${taxSetAsideEnabled ? `${taxSetAsidePct}% → -${money(taxSetAside)}` : "OFF"}`,
      `Estimated Take-Home: ${money(takeHome)}`,
      ``,
      `Payment Schedule (of Gross ${money(gross)}):`,
      `• Deposit (${schedule.norm.d.toFixed(0)}%): ${money(schedule.deposit)}`,
      `• Progress (${schedule.norm.p.toFixed(0)}%): ${money(schedule.progress)}`,
      `• Final (${schedule.norm.f.toFixed(0)}%): ${money(schedule.final)}`,
      ``,
      `Effective Hourly: ${money(effectiveHourly)}/hr`,
    ].join("\n");
    await navigator.clipboard.writeText(lines);
    alert("Breakdown copied to clipboard.");
  };

  return (
    <div className="min-h-[70vh] w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CK2 — Contractor Pay Calculator</h1>
          <p className="text-sm text-gray-600">Quote with confidence. Adjust fees, expenses, taxes, and schedule.</p>
        </div>
        <button
          onClick={copyBreakdown}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          <Copy size={16} /> Copy breakdown
        </button>
      </div>

      {/* Core controls */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card
          title="Mode & Amounts"
          help="Pick Hourly (rate × hours) or Fixed (one total). Contingency = buffer for unknowns. Discount reduces price. Retainage is held until the end."
        >
          <Row label="Mode">
            <div className="flex gap-2">
              <Toggle active={mode === "hourly"} onClick={() => setMode("hourly")}>Hourly</Toggle>
              <Toggle active={mode === "fixed"} onClick={() => setMode("fixed")}>Fixed</Toggle>
            </div>
          </Row>

          {mode === "hourly" ? (
            <>
              <Row label="Hourly rate ($/hr)">
                <InputNumber value={rate} onChange={setRate} />
              </Row>
              <Row label="Hours">
                <InputNumber value={hours} onChange={setHours} />
              </Row>
            </>
          ) : (
            <Row label="Fixed bid ($)">
              <InputNumber value={fixedBid} onChange={setFixedBid} />
            </Row>
          )}

          <Row label="Contingency (%)"><InputNumber value={contingencyPct} onChange={setContingencyPct} /></Row>
          <Row label="Discount (%)"><InputNumber value={discountPct} onChange={setDiscountPct} /></Row>
          <Row label="Retainage (%)"><InputNumber value={retainagePct} onChange={setRetainagePct} /></Row>
        </Card>

        <Card
          title="Expenses"
          help="Stuff you pay out-of-pocket for this job. Materials, subcontractors, mileage, and other pass-through costs."
        >
          <Row label="Materials ($)"><InputNumber value={materials} onChange={setMaterials} /></Row>
          <Row label="Subcontractors ($)"><InputNumber value={subs} onChange={setSubs} /></Row>
          <Row label="Mileage ($)"><InputNumber value={mileage} onChange={setMileage} /></Row>
          <Row label="Other ($)"><InputNumber value={otherExp} onChange={setOtherExp} /></Row>
        </Card>

        <Card
          title="Fees"
          help="Platform fee = the marketplace cut (if any). Processor fee = card/Stripe fee (percent + flat per charge)."
        >
          <Row label="Platform fee (%)"><InputNumber value={platformPct} onChange={setPlatformPct} /></Row>
          <Row label="Processor fee (%)"><InputNumber value={processorPct} onChange={setProcessorPct} /></Row>
          <Row label="Processor flat ($)"><InputNumber value={processorFlat} onChange={setProcessorFlat} step={0.05} /></Row>
        </Card>

        <Card
          title="Taxes & Schedule"
          help="Tax set-aside = chunk of NET you save for taxes. Deposit/Progress/Final are normalized to 100% and split the gross invoice."
        >
          <Row label="Tax set-aside">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={taxSetAsideEnabled} onChange={(e) => setTaxSetAsideEnabled(e.target.checked)} />
              enable
            </label>
          </Row>
          <Row label="Tax set-aside (%)">
            <InputNumber value={taxSetAsidePct} onChange={setTaxSetAsidePct} />
          </Row>
          <div className="h-px w-full bg-gray-200 my-2" />
          <Row label="Deposit (%)"><InputNumber value={depositPct} onChange={setDepositPct} /></Row>
          <Row label="Progress (%)"><InputNumber value={progressPct} onChange={setProgressPct} /></Row>
          <Row label="Final (%)"><InputNumber value={finalPct} onChange={setFinalPct} /></Row>
          <p className="text-xs text-gray-500 mt-1">We’ll normalize these to 100% automatically.</p>
        </Card>
      </section>

      {/* Results */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat label="Gross (invoice)" value={money(gross)} />
        <Stat label="Expenses" value={money(expenses)} />
        <Stat label="Fees (platform+processor)" value={money(totalFees)} />
        <Stat label="Net before tax" value={money(netBeforeTax)} />
        <Stat label={`Tax set-aside ${taxSetAsideEnabled ? `(${taxSetAsidePct}%)` : "(off)"}`} value={money(taxSetAside)} />
        <Stat label="Estimated take-home" value={money(takeHome)} highlight />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card
          title="Payment schedule"
          help="These dollar amounts are the split of your gross invoice across Deposit/Progress/Final."
        >
          <p className="text-sm text-gray-600 mb-2">Split of gross {money(gross)}:</p>
          <ul className="text-sm leading-7">
            <li>Deposit ({schedule.norm.d.toFixed(0)}%): <b>{money(schedule.deposit)}</b></li>
            <li>Progress ({schedule.norm.p.toFixed(0)}%): <b>{money(schedule.progress)}</b></li>
            <li>Final ({schedule.norm.f.toFixed(0)}%): <b>{money(schedule.final)}</b></li>
          </ul>
        </Card>
        <Card
          title="Effective hourly"
          help="Your estimated take-home divided by hours. Lets you compare fixed bids to hourly."
        >
          <div className="text-3xl font-semibold">{money(effectiveHourly)}/hr</div>
          <p className="text-xs text-gray-500 mt-2">
            Based on estimated take-home divided by {mode === "hourly" ? hours : `${hours || 1} planned`} hours.
          </p>
        </Card>
        <Card
          title="Tips"
          help="Quick reminders while bidding."
        >
          <ul className="text-sm list-disc ml-5 space-y-1">
            <li>Use contingency for unknowns; don’t forget retainage on long jobs.</li>
            <li>Processor fee defaults to 2.9% + $0.30 (Stripe-like).</li>
            <li>Turn off tax set-aside if you’re modelling cash flow only.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

/** ——— small UI helpers (no extra libraries) ——— */

function Card({
  title,
  children,
  help,
}: {
  title: string;
  children: React.ReactNode;
  help?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border p-4 shadow-sm bg-white"
    >
      <div className="mb-3 flex items-center gap-2">
        <Calculator size={16} className="text-gray-500" />
        <h2 className="font-semibold">{title}</h2>
        {help ? <HelpTip text={help} /> : null}
      </div>
      {children}
    </motion.div>
  );
}

function HelpTip({ text }: { text: string }) {
  return (
    <span className="relative group inline-flex items-center">
      <CircleHelp size={16} className="text-gray-400 cursor-help" />
      <span
        className="invisible group-hover:visible absolute left-5 top-1 z-10 max-w-xs rounded-md border bg-white p-2 text-xs text-gray-700 shadow-md"
        style={{ width: 260 }}
      >
        {text}
      </span>
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 grid grid-cols-12 items-center gap-3">
      <label className="col-span-6 text-sm text-gray-700">{label}</label>
      <div className="col-span-6">{children}</div>
    </div>
  );
}

function InputNumber({
  value,
  onChange,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <input
      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      type="number"
      step={step}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(parseFloat(e.target.value || "0"))}
    />
  );
}

function Toggle({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-md border px-3 py-1 text-sm " +
        (active ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50")
      }
    >
      {children}
    </button>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={"rounded-lg border p-4 " + (highlight ? "bg-blue-50 border-blue-200" : "bg-white")}>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
