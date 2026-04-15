import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VertiPoeta | La Sfida Verticale",
  description: "Gara di corsa in montagna nel giardino del poeta. Iscriviti, corri e guarda la classifica in tempo reale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {/* La Navbar sarà visibile in tutte le pagine */}
        <Navbar />
        
        {/* Aggiungiamo 'pt-16' (padding-top) per evitare che il contenuto 
          delle pagine finisca dietro la Navbar che è 'fixed' 
        */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}