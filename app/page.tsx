'use client' // Questo serve per dire a Next.js che la pagina è interattiva

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Iscrizioni() {
  const [nome, setNome] = useState('')
  const [pettorale, setPettorale] = useState('')
  const [messaggio, setMessaggio] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Inseriamo i dati nella tabella 'atleti' che hai creato su Supabase
    const { error } = await supabase
      .from('atleti')
      .insert([{ nome: nome, pettorale: parseInt(pettorale) }])

    if (error) {
      setMessaggio("Errore: " + error.message)
    } else {
      setMessaggio("Iscrizione avvenuta con successo!")
      setNome('')
      setPettorale('')
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-black mb-8 italic uppercase text-lime-400">Iscrizione VertiPoeta</h1>
      
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nome e Cognome</label>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none"
            placeholder="Esempio: Luca Ponzini"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Numero Pettorale</label>
          <input 
            type="number" 
            value={pettorale}
            onChange={(e) => setPettorale(e.target.value)}
            className="w-full p-3 rounded bg-slate-900 border border-slate-700 focus:border-lime-400 outline-none"
            placeholder="Scegli un numero"
            required
          />
        </div>

        <button type="submit" className="w-full bg-lime-400 text-black font-black py-4 rounded-xl hover:bg-lime-300 transition-colors uppercase">
          Conferma Iscrizione
        </button>

        {messaggio && <p className="mt-4 text-center text-lime-400 font-bold">{messaggio}</p>}
      </form>
    </main>
  )
}