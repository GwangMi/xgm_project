import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/ambient-background";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "GwangMin Jeon | Data & AI Service Planner",
  description:
    "데이터와 AI로 의사결정을 돕는 서비스 기획자 전광민의 포트폴리오",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AmbientBackground />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
