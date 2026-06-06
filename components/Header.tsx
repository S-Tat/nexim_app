import { getTranslations } from "next-intl/server";
import type { Locale } from "@/routing";
import { Link } from "@/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeaderLogoLink } from "@/components/HeaderLogoLink";

type Props = {
  locale: Locale;
};

export async function Header({ locale }: Props) {
  const t = await getTranslations("nav");

  return (
    <header className="relative z-20 border-b border-white/[0.06] bg-nexim-bg/80 backdrop-blur-xl print:hidden">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 md:px-10 md:py-0 md:h-[4.25rem]">
        <HeaderLogoLink className="shrink-0 font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white rtl:font-arabic">
          {t("logo")}
        </HeaderLogoLink>
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/blog"
            className="text-sm font-medium text-nexim-muted transition hover:text-white rtl:font-arabic"
          >
            {t("blog")}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
