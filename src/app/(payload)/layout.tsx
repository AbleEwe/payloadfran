/**
 * Admin/API route group: do not wrap with Payload `RootLayout` here.
 * The app root `src/app/layout.tsx` already provides the document shell
 * (`RootLayout` includes `<html>` / `<body>`). Nesting it caused invalid DOM
 * and hydration errors on `/admin`.
 */
import "./custom.scss";

export default function PayloadRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
