import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resto App",
  description:
    "Aplicación para la gestión de pedidos, menú y personal del restaurante.",
  keywords: [
    "restaurante",
    "menú",
    "pedidos",
    "mozos",
    "cocina",
    "caja",
    "gestión",
  ],
  authors: [{ name: "Resto App Team" }],
  openGraph: {
    title: "Resto App",
    description:
      "Administra tu restaurante fácilmente. Controla pedidos, personal y menú desde un solo lugar.",
    siteName: "Resto App",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resto App",
    description: "Gestión completa de restaurante. Simple, rápida y eficiente.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
