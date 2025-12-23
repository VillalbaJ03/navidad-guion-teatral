import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fuentes de Google
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// Metadata del sitio
export const metadata: Metadata = {
  title: "La Navidad que el mundo olvidó… y volvió a recordar | Guion Teatral",
  description:
    "Guion teatral navideño cristiano para iglesias y escuelas. La Navidad no es lo que recibimos, sino a Quién recibimos.",
  keywords: [
    "navidad",
    "guion teatral",
    "obra navideña",
    "cristiano",
    "iglesia",
    "escuela",
    "teatro",
  ],
  authors: [{ name: "Ministerio de Drama" }],
  openGraph: {
    title: "La Navidad que el mundo olvidó… y volvió a recordar",
    description: "Guion teatral navideño cristiano",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {/* Skip link para accesibilidad */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        
        {children}
      </body>
    </html>
  );
}
