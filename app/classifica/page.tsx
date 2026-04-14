'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Classifica() {
  const [classifica, setClassifica] = useState<any[]>([])

  useEffect(() => {
    const fetchClassifica = async () => {
      const { data } = await supabase
        .from('atleti')
        .select('*')
        .not('arrivo', 'is', null) // Prendiamo solo chi è arrivato

      if (data) {
        // Calcoliamo il tempo per ogni atleta
        const elaborati = data.map(atleta => {
          const inizio = new Date(atleta.partenza).getTime()
          const fine = new Date(atleta.arrivo).getTime()
          const diff = fine - inizio // Differenza in millisecondi
          
          // Formattazione MM:SS
          const minuti = Math.floor(diff / 60000)
          const secondi = ((diff % 60000) / 1000).toFixed(0)
          const tempoFormattato = `${minuti}:${parseInt(secondi) < 10 ? '0' : ''}${secondi}`
          
          return { ...atleta, tempoMs: diff, tempoLabel: tempoFormattato }
        })

        // Ordiniamo dal più veloce al più lento
        elaborati.sort((a, b) => a.tempoMs - b.tempoMs)
        setClassifica(elaborati)
      }
    }

    fetchClassifica()
    // Bonus: aggiorna la classifica ogni 10 secondi in automatico
    const interval = setInterval(fetchClassifica, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-black mb-10 text-center uppercase italic text-lime-400">
        🏆 Classifica Live <span className="text-white">VertiPoeta</span>
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {classifica.map((atleta, index) => (
          <div key={atleta.pettorale} className="flex items-center bg-slate-800 p-6 rounded-2xl border-l-4 border-lime-400 shadow-xl">
            <span className="text-2xl font-black mr-6 text-slate-500 w-8">{index + 1}°</span>
            <div className="flex-grow">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Pettorale #{atleta.pettorale}</p>
              <h2 className="text-xl font-bold uppercase">{atleta.nome}</h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-lime-400 font-mono">{atleta.tempoLabel}</p>
            </div>
          </div>
        ))}
        
        {classifica.length === 0 && (
          <p className="text-center text-slate-500 italic">Ancora nessun arrivato. La sfida è in corso!</p>
        )}
      </div>
    </main>
  )
}