'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Classifica() {
  const [classifica, setClassifica] = useState<any[]>([])

  useEffect(() => {
    const fetchClassifica = async () => {
      const { data } = await supabase.from('atleti').select('*').not('arrivo', 'is', null)
      if (data) {
        const calcolata = data.map(a => {
          const ms = new Date(a.arrivo).getTime() - new Date(a.partenza).getTime()
          const min = Math.floor(ms / 60000)
          const sec = Math.floor((ms % 60000) / 1000)
          return { ...a, tempoMs: ms, tempoStr: `${min}:${sec < 10 ? '0' : ''}${sec}` }
        }).sort((a, b) => a.tempoMs - b.tempoMs)
        setClassifica(calcolata)
      }
    }
    fetchClassifica()
    const interval = setInterval(fetchClassifica, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#002FA7] text-white p-6 pt-24 md:p-12 md:pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic text-[#FF5F00] mb-12 text-center leading-none">Classifica Live</h1>
        
        <div className="space-y-2">
          {classifica.map((atleta, index) => (
            <div key={atleta.id} className={`flex items-center justify-between p-5 border ${index < 3 ? 'bg-[#FF5F00] border-[#FF5F00] text-white shadow-lg' : 'bg-white/5 border-white/10'}`}>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-black italic w-8">{index + 1}°</span>
                <div>
                  <p className="font-black uppercase leading-none">{atleta.nome}</p>
                  <p className="text-[10px] uppercase font-bold opacity-60 tracking-widest">{atleta.squadra || 'Indipendente'}</p>
                </div>
              </div>
              <div className="text-2xl font-black italic font-mono">
                {atleta.tempoStr}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}