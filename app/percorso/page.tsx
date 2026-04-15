'use client'

import Link from 'next/link'

export default function Percorso() {
  return (
    <main className="min-h-screen bg-[#002FA7] text-white p-6 pt-24 relative overflow-hidden">
      {/* Sfondo decorativo */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic text-[#FF5F00] leading-none mb-4">
            Il Percorso
          </h1>
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
            Analisi Tecnica // 300m D+ // Lake Como
          </p>
        </div>

        {/* MAPPA INTERATTIVA KOMOOT */}
        <div className="w-full h-[650px] bg-white shadow-2xl border-4 border-white/10">
          <iframe 
            src="https://www.komoot.com/it-it/tour/2886518280/embed?share_token=auzZZBGnr2AdggqMwy83770UejmuYjiTGl4xtBO2I9GAKAGkfS&profile=1" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no"
          ></iframe>
        </div>

        {/* DETTAGLI TECNICI AGGIORNATI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 p-6 border-l-4 border-[#FF5F00]">
            <p className="text-[10px] uppercase opacity-50 font-bold mb-1">Distanza</p>
            <p className="text-2xl font-black italic">1.61 km</p>
          </div>
          <div className="bg-white/5 p-6 border-l-4 border-[#FF5F00]">
            <p className="text-[10px] uppercase opacity-50 font-bold mb-1">Dislivello Positivo</p>
            <p className="text-2xl font-black italic">300 m</p>
          </div>
          <div className="bg-white/5 p-6 border-l-4 border-[#FF5F00]">
            <p className="text-[10px] uppercase opacity-50 font-bold mb-1">Pendenza Media</p>
            <p className="text-2xl font-black italic">18.6%</p>
          </div>
        </div>

        <div className="mt-12 text-center pb-12">
           <Link href="/iscrizioni" className="inline-block bg-[#FF5F00] text-white font-black px-10 py-4 uppercase italic hover:scale-105 transition-transform shadow-xl">
             Accetta la sfida
           </Link>
        </div>
      </div>
    </main>
  )
}