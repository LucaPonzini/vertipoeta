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
  const [messaggio, setMessaggio] = useState('')
  const [pettoraleAssegnato, setPettoraleAssegnato] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accettaDelega) {
      setMessaggio("Devi accettare la delega per procedere.")
      return
    }
    setLoading(true)
    setMessaggio('')

    try {
      // 1. Cerchiamo il pettorale più alto attualmente nel DB
      const { data: ultimiAtleti, error: fetchError } = await supabase
        .from('atleti')
        .select('pettorale')
        .order('pettorale', { ascending: false })
        .limit(1)

      if (fetchError) throw fetchError

      // Se la tabella è vuota, ultimiAtleti sarà un array vuoto [], quindi partiamo da 1
      const nuovoPettorale = ultimiAtleti && ultimiAtleti.length > 0 
        ? (Number(ultimiAtleti[0].pettorale) + 1) 
        : 1

      // 2. Inseriamo il nuovo atleta con il pettorale calcolato
      const { error: insertError } = await supabase
        .from('atleti')
        .insert([{ 
          nome, 
          squadra, 
          pettorale: nuovoPettorale,
          partenza: null,
          arrivo: null 
        }])

      if (insertError) throw insertError

      // Se tutto va bene, aggiorniamo l'interfaccia
      setPettoraleAssegnato(nuovoPettorale)
      setIsSuccess(true)
    } catch (err: any) {
      setMessaggio("Errore: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center relative">
      <Link href="/" className="absolute top-8 right-8 text-slate-400 hover:text-white p-2 bg-slate-800 rounded-full transition-all shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="w-full max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
        {!isSuccess ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-black mb-2 uppercase italic text-lime-400 leading-none">Iscrizione</h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Il numero sarà assegnato in ordine di arrivo</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Atleta</label>
                <input 
                  type="text" placeholder="Nome e Cognome" value={nome} onChange={(e) => setNome(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none font-bold" required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Squadra / Nickname</label>
                <input 
                  type="text" placeholder="Es: Vertical Team" value={squadra} onChange={(e) => setSquadra(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none font-bold"
                />
              </div>

              <div className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700 mt-2">
                <input type="checkbox" id="delega" checked={accettaDelega} onChange={(e) => setAccettaDelega(e.target.checked)} className="mt-1 h-4 w-4 accent-lime-400" />
                <label htmlFor="delega" className="text-[10px] text-slate-400 uppercase font-bold leading-tight cursor-pointer">
                  Confermo di aver letto il regolamento e di consegnare la delega firmata alla partenza.
                </label>
              </div>

              {messaggio && <p className="text-red-400 text-[10px] font-bold text-center uppercase animate-bounce">{messaggio}</p>}

              <button type="submit" disabled={loading} className="w-full bg-lime-400 text-black font-black py-4 rounded-xl hover:bg-lime-300 transition-all uppercase shadow-lg shadow-lime-400/10">
                {loading ? 'Generazione...' : 'Ottieni il mio Pettorale'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 animate-in zoom-in duration-300">
            <p className="text-lime-400 text-sm font-bold uppercase tracking-widest mb-2">Sei ufficialmente in gara</p>
            <div className="text-8xl mb-4 font-black italic text-white drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">#{pettoraleAssegnato}</div>
            <h2 className="text-2xl font-black uppercase mb-8">Pettorale Assegnato!</h2>
            <Link href="/" className="inline-block bg-white text-black font-black px-10 py-4 rounded-xl uppercase text-xs hover:bg-lime-400 transition-colors">
              Torna alla Home
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}