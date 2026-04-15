'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-black italic text-xl tracking-tighter uppercase group">
          Verti<span className="text-lime-400 group-hover:text-white transition-colors">Poeta</span>
        </Link>
        
        <div className="flex gap-4 md:gap-8 text-[10px] font-black uppercase tracking-widest">
          {pathname !== '/' && (
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
          )}
          <Link href="/iscritti" className={`transition-colors ${pathname === '/iscritti' ? 'text-lime-400' : 'text-slate-400 hover:text-white'}`}>Iscritti</Link>
          <Link href="/iscrizioni" className={`transition-colors ${pathname === '/iscrizioni' ? 'text-lime-400' : 'text-slate-400 hover:text-white'}`}>Iscriviti</Link>
          <Link href="/classifica" className={`transition-colors ${pathname === '/classifica' ? 'text-lime-400' : 'text-slate-400 hover:text-white'}`}>Classifica</Link>
        </div>
      </div>
    </nav>
  )
}