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

  const fetchIscritti = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('atleti')
        .select('nome, squadra, pettorale')
        .order('pettorale', { ascending: true })

      if (error) console.error('Errore:', error.message)
      else if (data) setIscritti(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIscritti()
    const interval = setInterval(fetchIscritti, 30000)
    return () => clearInterval(interval)
  }, [fetchIscritti])

  if (loading) return (
    <div className="min-h-screen bg-[#002FA7] text-white flex items-center justify-center uppercase font-black italic text-2xl animate-pulse">
      Caricamento iscritti...
    </div>
  )

  return (
    <main className="min-h-screen bg-[#002FA7] text-white p-6 pt-24 md:p-12 md:pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic text-[#FF5F00] mb-2 leading-none">Starting List</h1>
          <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px]">
            {iscritti.length} Atleti pronti alla sfida
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {iscritti.map((atleta) => (
            <div key={atleta.pettorale} className="flex items-center bg-white/5 border border-white/10 p-5 rounded-none hover:border-[#FF5F00]/50 transition-all group">
              <div className="text-4xl font-black italic text-[#FF5F00] mr-5 w-14 shrink-0">
                #{atleta.pettorale}
              </div>
              <div className="overflow-hidden">
                <h2 className="text-lg font-black uppercase leading-tight truncate">{atleta.nome}</h2>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate">
                  {atleta.squadra || 'Atleta Indipendente'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}