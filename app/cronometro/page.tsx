'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Cronometro() {
  const [atleti, setAtleti] = useState<any[]>([])
  const [now, setNow] = useState(new Date())
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const PASSWORD_SEGRETA = "poeta2026"

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchAtleti = async () => {
    const { data } = await supabase.from('atleti').select('*').order('pettorale', { ascending: true })
    if (data) setAtleti(data)
  }

  useEffect(() => {
    fetchAtleti();
    const interval = setInterval(fetchAtleti, 5000)
    return () => clearInterval(interval)
  }, [])

  const registraTempo = async (pettorale: number, tipo: 'partenza' | 'arrivo') => {
    if (!isAdmin) return
    const ora = new Date().toISOString()
    await supabase.from('atleti').update({ [tipo]: ora }).eq('pettorale', pettorale)
    fetchAtleti()
  }

  const calcolaLive = (partenzaStr: string) => {
    const diff = now.getTime() - new Date(partenzaStr).getTime()
    const min = Math.floor(diff / 60000)
    const sec = Math.floor((diff % 60000) / 1000)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <h1 className="text-2xl font-black uppercase italic text-lime-400">Centrale operativa</h1>
          <input 
            type="password" placeholder="Password Admin" value={password}
            onChange={(e) => { setPassword(e.target.value); setIsAdmin(e.target.value === PASSWORD_SEGRETA) }}
            className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs outline-none focus:border-lime-400 w-40"
          />
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="p-4">Atleta / Squadra</th>
                <th className="p-4 text-center">Azioni</th>
                <th className="p-4 text-right">Tempo Live</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {atleti.map((atleta) => (
                <tr key={atleta.pettorale}>
                  <td className="p-4">
                    <p className="text-lime-400 font-black italic">#{atleta.pettorale}</p>
                    <p className="font-bold uppercase text-sm">{atleta.nome}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{atleta.squadra || 'Indipendente'}</p>
                  </td>
                  <td className="p-4 text-center">
                    {!atleta.partenza && (
                      <button disabled={!isAdmin} onClick={() => registraTempo(atleta.pettorale, 'partenza')} className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase ${isAdmin ? 'bg-blue-600' : 'bg-slate-700 opacity-20'}`}>Start</button>
                    )}
                    {atleta.partenza && !atleta.arrivo && (
                      <button disabled={!isAdmin} onClick={() => registraTempo(atleta.pettorale, 'arrivo')} className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase ${isAdmin ? 'bg-red-600 animate-pulse' : 'bg-slate-700 opacity-20'}`}>Arrivo</button>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {atleta.partenza && !atleta.arrivo ? (
                      <div className="flex flex-col">
                        <span className="text-[9px] text-orange-500 font-black uppercase">In Salita</span>
                        <span className="text-2xl font-mono font-black italic">da {calcolaLive(atleta.partenza)}</span>
                      </div>
                    ) : atleta.arrivo ? (
                      <span className="text-lime-400 font-bold uppercase text-xs">Arrivato</span>
                    ) : <span className="text-slate-600 uppercase text-[10px]">In attesa</span>}
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