'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  // Funzione per capire se il link è attivo e applicare il colore arancione
  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#002FA7] border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-black italic text-xl md:text-2xl tracking-tighter uppercase text-white group">
          Verti<span className="text-[#FF5F00] group-hover:text-white transition-colors duration-300">Poeta</span>
        </Link>
        
        {/* MENU DI NAVIGAZIONE */}
        <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em]">
          
          <Link 
            href="/percorso" 
            className={`transition-colors duration-300 ${isActive('/percorso') ? 'text-[#FF5F00]' : 'text-white/70 hover:text-white'}`}
          >
            Percorso
          </Link>

          <Link 
            href="/iscritti" 
            className={`transition-colors duration-300 ${isActive('/iscritti') ? 'text-[#FF5F00]' : 'text-white/70 hover:text-white'}`}
          >
            Iscritti
          </Link>

          <Link 
            href="/iscrizioni" 
            className={`transition-colors duration-300 ${isActive('/iscrizioni') ? 'text-[#FF5F00]' : 'text-white/70 hover:text-white'}`}
          >
            Iscriviti
          </Link>

          <Link 
            href="/classifica" 
            className={`transition-colors duration-300 ${isActive('/classifica') ? 'text-[#FF5F00]' : 'text-white/70 hover:text-white'}`}
          >
            Classifica
          </Link>
          
        </div>

      </div>
    </nav>
  )
}