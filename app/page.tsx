// app/page.tsx
import { redirect } from "next/navigation";

export default function Root() {
  // Send anyone who hits the site root straight to the CK2 calculator
  redirect("/ck2");
}
