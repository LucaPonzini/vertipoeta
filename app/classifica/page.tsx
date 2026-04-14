'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// 1. Definiamo l'interfaccia precisa per l'atleta che arriva dal DB
interface AtletaDB {
  id: number;
  nome: string;
  pettorale: number;
  partenza: string;
  arrivo: string;
}

// 2. Definiamo l'interfaccia per l'atleta con i calcoli del tempo
interface AtletaClassifica extends AtletaDB {
  tempoMs: number;
  tempoLabel: string;
}

export default function Classifica() {
  const [classifica, setClassifica] = useState<AtletaClassifica[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const scaricaDati = async () => {
      // Specifichiamo il tipo qui <AtletaDB[]>
      const { data, error } = await supabase
        .from('atleti')
        .select('*')
        .not('arrivo', 'is', null)

      if (error) {
        console.error('Errore:', error.message)
      } else if (data) {
        // Tipizziamo esplicitamente l'atleta nel map
        const elaborati: AtletaClassifica[] = (data as AtletaDB[]).map((atleta) => {
          const inizio = new Date(atleta.partenza).getTime()
          const fine = new Date(atleta.arrivo).getTime()
          const diff = fine - inizio
          
          const minuti = Math.floor(diff / 60000)
          const secondi = ((diff % 60000) / 1000).toFixed(0)
          const tempoFormattato = `${minuti}:${parseInt(secondi) < 10 ? '0' : ''}${secondi}`
          
          return { 
            ...atleta, 
            tempoMs: diff, 
            tempoLabel: tempoFormattato 
          }
        })

        elaborati.sort((a, b) => a.tempoMs - b.tempoMs)
        setClassifica(elaborati)
      }
      setLoading(false)
    }

    scaricaDati()
    const interval = setInterval(scaricaDati, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="min-h-screen bg-slate-900 text-white p-10 uppercase italic font-black">Caricamento...</div>

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black uppercase italic text-lime-400 mb-10 text-center">Classifica Live</h1>
        
        <div className="space-y-4">
          {classifica.map((atleta, index) => (
            <div key={atleta.id} className="flex items-center bg-slate-800 p-5 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 flex items-center justify-center bg-lime-400 text-black font-black rounded-lg mr-4 italic">
                {index + 1}
              </div>
              <div className="grow">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Pettorale #{atleta.pettorale}</p>
                <h2 className="text-lg font-black uppercase tracking-tight">{atleta.nome}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white font-mono leading-none">{atleta.tempoLabel}</p>
              </div>
            </div>
          ))}
          
          {classifica.length === 0 && (
            <p className="text-center text-slate-500 italic py-20">Nessun arrivato al momento.</p>
          )}
        </div>
      </div>
    </main>
  )
}