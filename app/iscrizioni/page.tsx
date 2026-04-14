'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Iscrizioni() {
  const [nome, setNome] = useState('')
  const [pettorale, setPettorale] = useState('')
  const [loading, setLoading] = useState(false)
  const [messaggio, setMessaggio] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase
      .from('atleti')
      .insert([{ nome: nome, fettorale: parseInt(pettorale) }]) // Assicurati che su Supabase la colonna sia 'pettorale' o 'fettorale' (controlla lo spelling!)

    if (error) {
      setMessaggio("Errore: " + error.message)
    } else {
      setMessaggio("Iscrizione avvenuta! Ci vediamo in vetta 🚀")
      setNome('')
      setPettorale('')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-black mb-2 uppercase italic text-lime-400">Unisciti alla sfida</h1>
        <p className="text-slate-400 mb-8 text-sm">Inserisci i tuoi dati per riservare il pettorale di VertiPoeta.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nome Completo</label>
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
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Numero Pettorale preferito</label>
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

          {messaggio && (
            <div className={`mt-4 p-4 rounded-lg text-center font-bold ${messaggio.includes('Errore') ? 'bg-red-500/10 text-red-500' : 'bg-lime-400/10 text-lime-400'}`}>
              {messaggio}
            </div>
          )}
        </form>
      </div>
    </main>
  )
}