import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Francesca Santos",
  description: "Tu fotógrafa de confianza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
