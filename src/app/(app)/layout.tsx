import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDropdownSesionItems } from "@/lib/sesionSlides";
import localFont from "next/font/local";

// Avoid connecting to MongoDB during Vercel build (build IPs are not whitelisted in Atlas)
export const dynamic = "force-dynamic";

const Butler = localFont({
  src: [
    {
      path: '../../../public/fonts/Butler.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Butler-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Butler-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Butler-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Butler-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Butler-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dropdownItems = await getDropdownSesionItems();
  return (
    <div className={Butler.className}>
      <Navbar dropdownItems={dropdownItems} />
      {children}
      <Footer />
    </div>
  );
}
