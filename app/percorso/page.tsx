export default function Percorso() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic text-lime-400 mb-6">Il Percorso</h1>
        
        {/* STATISTICHE RAPIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">Distanza</p>
            <p className="text-3xl font-black text-white">1.67 km</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">Dislivello</p>
            <p className="text-3xl font-black text-white">+319 m</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">Pendenza Media</p>
            <p className="text-3xl font-black text-white">19.1 %</p>
          </div>
        </div>

        {/* DESCRIZIONE E STRAVA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 text-slate-300">
            <p>
              La <span className="text-white font-bold italic">VertiPoeta</span> non è una gara per tutti. Si parte dal fondovalle e si sale dritti verso la dimora del poeta.
            </p>
            <p>
              Il sentiero è a tratti tecnico, con gradini di roccia e sezioni cementate. La gestione del fiato è fondamentale: se spingi troppo nei primi 500 metri, la {`"parete"`} finale non ti lascerà scampo.
            </p>
            <a 
              href="https://www.strava.com/segments/40284189" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#FC4C02] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm mt-4 hover:scale-105 transition-transform"
            >
              Vedi Segmento su Strava
            </a>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col items-center justify-center text-center">
             <div className="text-4xl mb-4">📉</div>
             <p className="text-slate-400 italic text-sm">
                Prossimamente: Mappa interattiva e profilo altimetrico dettagliato.
             </p>
          </div>
        </div>
      </div>
    </main>
  )
}