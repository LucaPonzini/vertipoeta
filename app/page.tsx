import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter text-lime-400">
            Verti<span className="text-white font-light">Poeta</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto italic">
            "Tra un respiro affannato e un verso rubato, la vetta ti attende."
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/iscrizioni" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase hover:bg-lime-400 transition-all">
              Iscriviti Ora
            </Link>
            <Link href="/classifica" className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-full font-bold uppercase hover:bg-slate-700 transition-all">
              Classifica Live
            </Link>
          </div>
        </div>
      </section>

      {/* SEZIONE PAGINE (NAVIGAZIONE RAPIDA) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black uppercase mb-12 border-l-4 border-lime-400 pl-4">Menu Gara</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavCard title="Iscrizioni" desc="Riserva il tuo pettorale per la prossima scalata." link="/iscrizioni" emoji="✍️" />
          <NavCard title="Percorso" desc="1.5km con 300m D+. Analizza ogni singolo metro." link="#" emoji="⛰️" />
          <NavCard title="Cronometro" desc="Area riservata per la gestione dei tempi." link="/cronometro" emoji="⏱️" />
          <NavCard title="Classifica" desc="Guarda i tempi in tempo reale dal traguardo." link="/classifica" emoji="🏆" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-slate-800 text-slate-500 text-sm">
        © 2026 VertiPoeta - Organizzato da Luca Ponzini
      </footer>
    </main>
  )
}

function NavCard({ title, desc, link, emoji }: { title: string, desc: string, link: string, emoji: string }) {
  return (
    <Link href={link} className="group p-8 bg-slate-800/50 border border-slate-700 rounded-3xl hover:border-lime-400 transition-all">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-lime-400">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </Link>
  )
}