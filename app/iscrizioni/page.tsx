'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Iscrizioni() {
  const [nome, setNome] = useState('')
  const [squadra, setSquadra] = useState('')
  const [accettaDelega, setAccettaDelega] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pettoraleAssegnato, setPettoraleAssegnato] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accettaDelega) return
    setLoading(true)

    try {
      const { data: ultimiAtleti } = await supabase.from('atleti').select('pettorale').order('pettorale', { ascending: false }).limit(1)
      const nuovoPettorale = ultimiAtleti && ultimiAtleti.length > 0 ? (Number(ultimiAtleti[0].pettorale) + 1) : 1

      const { error } = await supabase.from('atleti').insert([{ nome, squadra, pettorale: nuovoPettorale }])
      if (error) throw error

      setPettoraleAssegnato(nuovoPettorale)
      setIsSuccess(true)
    } catch (err) {
      alert("Errore durante l'iscrizione")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#002FA7] text-white flex items-center justify-center p-6 pt-24">
      {/* Box Invertito: Sfondo Bianco */}
      <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative rounded-none">
        {!isSuccess ? (
          <>
            <h1 className="text-5xl font-black uppercase italic text-[#FF5F00] mb-8 leading-none">Iscrizione</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#002FA7]/60 block mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  className="w-full bg-[#002FA7]/5 border-2 border-[#002FA7]/10 p-4 font-bold text-[#002FA7] outline-none focus:border-[#FF5F00] transition-colors" 
                  placeholder="ES: MARIO ROSSI"
                  required 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#002FA7]/60 block mb-2">Squadra / Club</label>
                <input 
                  type="text" 
                  value={squadra} 
                  onChange={(e) => setSquadra(e.target.value)} 
                  className="w-full bg-[#002FA7]/5 border-2 border-[#002FA7]/10 p-4 font-bold text-[#002FA7] outline-none focus:border-[#FF5F00] transition-colors" 
                  placeholder="ES: VERTICAL TEAM"
                />
              </div>

              <div className="flex items-start gap-3 bg-[#002FA7]/5 p-4 border border-[#002FA7]/10">
                <input 
                  type="checkbox" 
                  checked={accettaDelega} 
                  onChange={(e) => setAccettaDelega(e.target.checked)} 
                  className="mt-1 accent-[#FF5F00] h-4 w-4" 
                  required 
                />
                <label className="text-[9px] uppercase font-bold text-[#002FA7]/80 leading-tight">
                  Accetto il regolamento della VertiPoeta e mi assumo la piena responsabilità per la prova fisica.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-[#FF5F00] text-white font-black py-5 uppercase italic hover:bg-[#002FA7] transition-all shadow-lg active:scale-95"
              >
                {loading ? 'Generazione...' : 'Ottieni il tuo Numero'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-[#FF5F00] text-xs font-black uppercase tracking-widest mb-4">Pettorale Confermato</p>
            <div className="text-9xl font-black italic mb-6 text-[#002FA7]">#{pettoraleAssegnato}</div>
            <Link 
              href="/" 
              className="inline-block bg-[#002FA7] text-white px-10 py-4 font-black uppercase italic text-xs hover:bg-[#FF5F00] transition-all shadow-md"
            >
              Torna alla Home
            </Link>
          </div>
        )}
      </div>

      {/* Dettaglio estetico laterale */}
      <div className="absolute right-6 bottom-10 hidden md:block">
        <p className="rotate-90 origin-right text-[10px] font-black uppercase tracking-[0.5em] text-white/20 whitespace-nowrap">
          REGISTRATION FORM // VERTIPOETA 2026
        </p>
      </div>
    </main>
  )
}