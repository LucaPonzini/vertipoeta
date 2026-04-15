'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [stats, setStats] = useState({ iscritti: 0, record: '--:--' })

  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase.from('atleti').select('*', { count: 'exact', head: true })
      const { data: recordData } = await supabase.from('atleti').select('partenza, arrivo').not('arrivo', 'is', null)

      let migliorTempo = '--:--'
      if (recordData && recordData.length > 0) {
        const tempi = recordData.map(a => new Date(a.arrivo).getTime() - new Date(a.partenza).getTime())
        const minMs = Math.min(...tempi)
        const min = Math.floor(minMs / 60000)
        const sec = Math.floor((minMs % 60000) / 1000)
        migliorTempo = `${min}:${sec < 10 ? '0' : ''}${sec}`
      }
      setStats({ iscritti: count || 0, record: migliorTempo })
    }
    fetchStats()
  }, [])

  return (
    <main className="min-h-screen text-white flex flex-col items-center p-6 relative overflow-hidden bg-black">
      
      {/* LA FOTO: Caricamento diretto senza filtri blu sopra */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2000&auto=format&fit=crop")',
        }}
      />
      
      {/* SFUMATURA NERA: Solo in alto e in basso per far leggere i menu/testi, ma lascia il centro pulito */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* HERO SECTION */}
      <section className="relative z-10 text-center pt-24 mb-12">
        <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
          Verti<span className="text-[#FF5F00]">Poeta</span>
        </h1>
        <p className="text-white text-xs md:text-sm font-black uppercase tracking-[0.5em] mb-12 drop-shadow-xl">
          Lake Como Vertical Challenge
        </p>

        {/* BOX STATISTICHE: Trasparenza pura stile Summit Series */}
        <div className="flex gap-4 w-full max-w-2xl mx-auto mb-10">
          <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 p-5 text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/80 mb-1">Partenti</p>
            <p className="text-3xl font-black italic">{stats.iscritti}</p>
          </div>
          <div className="flex-1 bg-[#FF5F00] p-5 text-center shadow-2xl border border-[#FF5F00]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/90 mb-1">Miglior Tempo</p>
            <p className="text-3xl font-black italic font-mono">{stats.record}</p>
          </div>
        </div>

        {/* BOTTONI: Bianco Solido e Blu Trasparente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl mx-auto">
          <Link href="/iscrizioni" className="bg-white text-[#002FA7] p-8 flex flex-col justify-between hover:bg-[#FF5F00] hover:text-white transition-all duration-300 min-h-[160px] group">
            <span className="text-4xl font-black uppercase italic leading-none text-left">Prendi il<br/>Pettorale</span>
            <span className="text-[11px] font-black uppercase tracking-widest self-end">Iscriviti →</span>
          </Link>
          <Link href="/classifica" className="bg-[#002FA7]/40 backdrop-blur-lg border-2 border-white p-8 flex flex-col justify-between hover:bg-white hover:text-[#002FA7] transition-all duration-300 min-h-[160px] group">
            <span className="text-4xl font-black uppercase italic leading-none text-left">Classifica<br/>Live</span>
            <span className="text-[11px] font-black uppercase tracking-widest self-end">Risultati →</span>
          </Link>
        </div>
      </section>

      {/* BOX INFO: Spostato in fondo e reso più compatto per non coprire il centro della foto */}
      <section className="relative z-10 w-full max-w-2xl bg-black/30 backdrop-blur-xl p-8 border border-white/10 shadow-2xl mt-auto mb-10">
        <div className="flex flex-wrap gap-8 items-center justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase italic text-[#FF5F00]">La Sfida</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">1.61 KM // 300M D+ // VERTICAL</p>
          </div>
          <Link href="/percorso" className="bg-white text-[#002FA7] px-6 py-3 font-black uppercase italic text-xs hover:bg-[#FF5F00] hover:text-white transition-all">
            Mappa Percorso
          </Link>
        </div>
      </section>

      <footer className="relative z-10 pb-4 text-white/60 text-[9px] font-black uppercase tracking-[0.5em]">
        VertiPoeta // Nessuna scorciatoia
      </footer>
    </main>
  )
}