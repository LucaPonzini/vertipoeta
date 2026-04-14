'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Cronometro() {
  const [atleti, setAtleti] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // STATO PER LA SICUREZZA
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const PASSWORD_SEGRETA = "poeta2026" // Scegli la tua password qui

  const fetchAtleti = async () => {
    const { data } = await supabase
      .from('atleti')
      .select('*')
      .order('pettorale', { ascending: true })
    if (data) setAtleti(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAtleti()
    const interval = setInterval(fetchAtleti, 5000) // Aggiorna ogni 5 secondi per il pubblico
    return () => clearInterval(interval)
  }, [])

  const registraPartenza = async (fettorale: number) => {
    if (!isAdmin) return // Protezione extra
    const ora = new Date().toISOString()
    await supabase.from('atleti').update({ partenza: ora }).eq('pettorale', fettorale)
    fetchAtleti()
  }

  const registraArrivo = async (fettorale: number) => {
    if (!isAdmin) return // Protezione extra
    const ora = new Date().toISOString()
    await supabase.from('atleti').update({ arrivo: ora }).eq('pettorale', fettorale)
    fetchAtleti()
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-black uppercase italic text-lime-400">Controllo Gara</h1>
          
          {/* BOX PASSWORD SEGRETO */}
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 flex items-center gap-2">
            <input 
              type="password" 
              placeholder="Codice Admin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if(e.target.value === PASSWORD_SEGRETA) setIsAdmin(true)
                else setIsAdmin(false)
              }}
              className="bg-slate-900 border-none text-xs p-2 rounded outline-none w-32 focus:ring-1 focus:ring-lime-400"
            />
            {isAdmin ? (
              <span className="text-[10px] font-bold text-lime-400 animate-pulse">● LIVE EDIT</span>
            ) : (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">● Solo Lettura</span>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/50 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                <th className="p-4">Pett.</th>
                <th className="p-4">Atleta</th>
                <th className="p-4">Comandi</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {atleti.map((atleta) => (
                <tr key={atleta.pettorale} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-black text-lime-400 text-lg">#{atleta.pettorale}</td>
                  <td className="p-4 font-bold uppercase text-sm">{atleta.nome}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {!atleta.partenza && (
                        <button 
                          disabled={!isAdmin}
                          onClick={() => registraPartenza(atleta.pettorale)}
                          className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all ${isAdmin ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 opacity-30 cursor-not-allowed'}`}
                        >
                          Start
                        </button>
                      )}
                      {atleta.partenza && !atleta.arrivo && (
                        <button 
                          disabled={!isAdmin}
                          onClick={() => registraArrivo(atleta.pettorale)}
                          className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all ${isAdmin ? 'bg-red-600 hover:bg-red-500 animate-pulse' : 'bg-slate-700 opacity-30 cursor-not-allowed'}`}
                        >
                          Arrivo
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    {atleta.arrivo ? (
                      <span className="text-[10px] font-bold bg-lime-400/10 text-lime-400 border border-lime-400/20 px-2 py-1 rounded">FINITO</span>
                    ) : atleta.partenza ? (
                      <span className="text-[10px] font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-1 rounded animate-pulse">IN SALITA</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 uppercase">In Attesa</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}