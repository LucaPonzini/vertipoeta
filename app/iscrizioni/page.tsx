'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Iscrizioni() {
  const [nome, setNome] = useState('')
  const [pettorale, setPettorale] = useState('')
  const [loading, setLoading] = useState(false)
  const [messaggio, setMessaggio] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase
      .from('atleti')
      .insert([{ nome: nome, pettorale: parseInt(pettorale) }])

    if (error) {
      setMessaggio("Errore: " + error.message)
      setIsSuccess(false)
    } else {
      setMessaggio("Iscrizione avvenuta! Ci vediamo in vetta 🚀")
      setIsSuccess(true)
      setNome('')
      setPettorale('')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center relative">
      
      {/* TASTO X PER USCIRE - Sempre visibile in alto a destra */}
      <Link 
        href="/" 
        className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 bg-slate-800 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="w-full max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        
        {!isSuccess ? (
          <>
            <h1 className="text-3xl font-black mb-2 uppercase italic text-lime-400">Unisciti alla sfida</h1>
            <p className="text-slate-400 mb-8 text-sm">Inserisci i tuoi dati per riservare il pettorale di VertiPoeta.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none transition-all"
                  placeholder="Es: Luca Ponzini"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Numero Pettorale</label>
                <input 
                  type="number" 
                  value={pettorale}
                  onChange={(e) => setPettorale(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none transition-all"
                  placeholder="Es: 42"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-lime-400 text-black font-black py-4 rounded-xl hover:bg-lime-300 transition-all uppercase tracking-tighter disabled:opacity-50"
              >
                {loading ? 'Invio in corso...' : 'Conferma Iscrizione'}
              </button>
            </form>
          </>
        ) : (
          /* SCHERMATA DI SUCCESSO */
          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-black uppercase mb-4 text-lime-400">Grande!</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              La tua iscrizione è stata registrata.<br/>Preparati, la pendenza non perdona.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-white text-black font-black px-10 py-4 rounded-xl hover:bg-lime-400 transition-all uppercase text-sm"
            >
              Torna alla Home
            </Link>
          </div>
        )}

        {messaggio && !isSuccess && (
          <div className="mt-4 p-4 rounded-lg text-center font-bold bg-red-500/10 text-red-500 border border-red-500/20">
            {messaggio}
          </div>
        )}
      </div>
    </main>
  )
}