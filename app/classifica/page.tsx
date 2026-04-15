'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Atleta {
  id: number; nome: string; squadra: string; pettorale: number; partenza: string; arrivo: string; tempoMs?: number; tempoLabel?: string;
}

export default function Classifica() {
  const [classifica, setClassifica] = useState<Atleta[]>([])

  const fetchClassifica = useCallback(async () => {
    const { data } = await supabase.from('atleti').select('*').not('arrivo', 'is', null)
    if (data) {
      const elaborati = data.map((atleta: any) => {
        const diff = new Date(atleta.arrivo).getTime() - new Date(atleta.partenza).getTime()
        const min = Math.floor(diff / 60000)
        const sec = ((diff % 60000) / 1000).toFixed(0)
        return { ...atleta, tempoMs: diff, tempoLabel: `${min}:${parseInt(sec) < 10 ? '0' : ''}${sec}` }
      })
      setClassifica(elaborati.sort((a, b) => (a.tempoMs ?? 0) - (b.tempoMs ?? 0)))
    }
  }, [])

  useEffect(() => {
    fetchClassifica()
    const interval = setInterval(fetchClassifica, 10000)
    return () => clearInterval(interval)
  }, [fetchClassifica])

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black uppercase italic text-lime-400 mb-10 text-center">Classifica Live</h1>
        <div className="space-y-4">
          {classifica.map((atleta, index) => (
            <div key={atleta.id} className="flex items-center bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-lime-400 text-black font-black rounded-lg mr-4 italic">{index + 1}</div>
              <div className="grow">
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">#{atleta.pettorale} {atleta.squadra ? `| ${atleta.squadra}` : ''}</p>
                <h2 className="text-lg font-black uppercase leading-none">{atleta.nome}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white font-mono">{atleta.tempoLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}