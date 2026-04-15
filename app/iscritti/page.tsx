'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Atleta {
  nome: string;
  squadra: string;
  pettorale: number;
}

export default function ElencoIscritti() {
  const [iscritti, setIscritti] = useState<Atleta[]>([])
  const [loading, setLoading] = useState(true)

  // Usiamo useCallback per evitare render a cascata e l'errore di VS Code
  const fetchIscritti = useCallback(async () => {
    try {
      // Selezioniamo solo le colonne esistenti, escludendo 'id' se causa errore
      const { data, error } = await supabase
        .from('atleti')
        .select('nome, squadra, pettorale')
        .order('pettorale', { ascending: true })

      if (error) {
        console.error('Errore Supabase:', error.message)
      } else if (data) {
        setIscritti(data)
      }
    } catch (err) {
      console.error('Errore generico:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIscritti()
    
    // Aggiornamento ogni 30 secondi
    const interval = setInterval(() => {
      fetchIscritti()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchIscritti])

  if (loading) return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center uppercase font-black italic tracking-tighter text-2xl animate-pulse">
      Caricamento iscritti...
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black uppercase italic text-lime-400 mb-2 leading-none">Starting List</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            {iscritti.length} Atleti pronti alla sfida
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {iscritti.map((atleta) => (
            <div 
              key={atleta.pettorale} // Usiamo il pettorale come chiave univoca
              className="flex items-center bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 hover:border-lime-400/30 transition-all group shadow-lg"
            >
              <div className="text-4xl font-black italic text-lime-400 mr-5 w-14 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                #{atleta.pettorale}
              </div>
              <div className="overflow-hidden">
                <h2 className="text-lg font-black uppercase leading-tight truncate">{atleta.nome}</h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">
                  {atleta.squadra || 'Atleta Indipendente'}
                </p>
              </div>
            </div>
          ))}

          {iscritti.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
              <p className="text-slate-500 italic uppercase font-bold text-sm">Ancora nessun iscritto. Sii il primo!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}