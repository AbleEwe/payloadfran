import type { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Francesca Santos",
  description: "Tu fotógrafa de confianza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPayloadAdmin = (await headers()).get("x-payload-admin") === "1";

  if (isPayloadAdmin) {
    const { AdminPayloadRoot } = await import("./AdminPayloadRoot");
    return <AdminPayloadRoot>{children}</AdminPayloadRoot>;
  }

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
