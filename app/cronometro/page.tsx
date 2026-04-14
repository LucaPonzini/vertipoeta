'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Cronometro() {
  const [atleti, setAtleti] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Carica gli atleti dal database
  const fetchAtleti = async () => {
    const { data, error } = await supabase
      .from('atleti')
      .select('*')
      .order('pettorale', { ascending: true })
    if (data) setAtleti(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAtleti()
  }, [])

  // Funzione per registrare la PARTENZA usando il pettorale
  const registraPartenza = async (numeroPettorale: number) => {
    console.log("Tentativo partenza per pettorale:", numeroPettorale)
    const ora = new Date().toISOString()
    
    const { error } = await supabase
      .from('atleti')
      .update({ partenza: ora })
      .eq('pettorale', numeroPettorale)

    if (error) {
      console.error("Errore partenza:", error.message)
      alert("Errore: " + error.message)
    } else {
      fetchAtleti()
    }
  }

  // Funzione per registrare l'ARRIVO usando il pettorale
  const registraArrivo = async (numeroPettorale: number) => {
    console.log("Tentativo arrivo per pettorale:", numeroPettorale)
    const ora = new Date().toISOString()
    
    const { error } = await supabase
      .from('atleti')
      .update({ arrivo: ora })
      .eq('pettorale', numeroPettorale)

    if (error) {
      console.error("Errore arrivo:", error.message)
      alert("Errore: " + error.message)
    } else {
      fetchAtleti()
    }
  }

  if (loading) return <div className="p-10 text-white">Caricamento atleti...</div>

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-10 font-sans">
      <h1 className="text-3xl font-black mb-8 uppercase text-lime-400 italic">
        Stazione Crono <span className="text-white">VertiPoeta</span>
      </h1>
      
      <div className="overflow-x-auto shadow-2xl rounded-2xl">
        <table className="w-full border-collapse bg-slate-800">
          <thead>
            <tr className="bg-slate-700 text-left">
              <th className="p-4 uppercase text-xs tracking-widest text-slate-400">Pett.</th>
              <th className="p-4 uppercase text-xs tracking-widest text-slate-400">Atleta</th>
              <th className="p-4 uppercase text-xs tracking-widest text-slate-400">Azioni</th>
              <th className="p-4 uppercase text-xs tracking-widest text-slate-400">Stato Gara</th>
            </tr>
          </thead>
          <tbody>
            {atleti.map((atleta) => (
              <tr key={atleta.pettorale} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                <td className="p-4 font-black text-lime-400 text-xl">#{atleta.pettorale}</td>
                <td className="p-4 uppercase font-bold text-sm tracking-tight">{atleta.nome}</td>
                <td className="p-4 space-x-2">
                  {!atleta.partenza && (
                    <button 
                      onClick={() => registraPartenza(atleta.pettorale)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-black text-xs uppercase shadow-lg active:scale-95 transition-all"
                    >
                      🚀 Start
                    </button>
                  )}
                  {atleta.partenza && !atleta.arrivo && (
                    <button 
                      onClick={() => registraArrivo(atleta.pettorale)}
                      className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-black text-xs uppercase shadow-lg animate-pulse active:scale-95 transition-all"
                    >
                      🏁 Stop Arrivo
                    </button>
                  )}
                </td>
                <td className="p-4">
                  {atleta.arrivo ? (
                    <span className="bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full text-xs font-bold border border-lime-400/20">FINITO</span>
                  ) : atleta.partenza ? (
                    <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/20">IN SALITA...</span>
                  ) : (
                    <span className="text-slate-500 text-xs italic tracking-widest">A BOXES</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}