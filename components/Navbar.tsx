'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  // Se siamo nella Home, non mostriamo il tasto Home, se siamo altrove sì
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-black italic text-xl tracking-tighter uppercase">
          Verti<span className="text-lime-400">Poeta</span>
        </Link>
        
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
          {pathname !== '/' && (
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
          )}
          <Link href="/percorso" className="text-slate-400 hover:text-white transition-colors">Percorso</Link>
          <Link href="/iscrizioni" className="text-slate-400 hover:text-white transition-colors">Iscriviti</Link>
          <Link href="/classifica" className="text-lime-400 hover:text-lime-300 transition-colors">Classifica</Link>
        </div>
      </div>
    </nav>
  )
}