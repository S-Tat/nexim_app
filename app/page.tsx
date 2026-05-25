import { redirect } from "next/navigation";
import { routing } from "@/routing";

/** Root URL: next-intl locale prefix is required (`localePrefix: "always"`). */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
