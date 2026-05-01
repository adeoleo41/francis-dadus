const stats = [
  { value: '+15',  label: 'Años de Experiencia',      sub: 'en ventas y liderazgo' },
  { value: '+500', label: 'Profesionales Impactados',  sub: 'en RD y el Caribe' },
  { value: '+50',  label: 'Talleres Impartidos',       sub: 'en empresas e instituciones' },
  { value: '100%', label: 'Enfoque en Resultados',     sub: 'estrategias que funcionan' },
]

export default function Stats() {
  return (
    <section className="bg-gold-500 py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <p className="font-serif text-4xl sm:text-5xl font-bold mb-1">{stat.value}</p>
              <p className="font-semibold text-sm sm:text-base mb-1">{stat.label}</p>
              <p className="text-white/70 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
