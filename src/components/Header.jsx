export default function Header({ icon: Icon, badge, title, subtitle, badges = [] }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 text-white px-8 py-7 rounded-b-2xl shadow-md">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="bg-white/15 p-3 rounded-xl">
              <Icon size={28} />
            </div>
          )}
          <div>
            {badge && (
              <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium mb-2">
                {badge}
              </span>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-white/80 mt-1 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
        {badges.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {badges.map((b, i) => (
              <div key={i} className="bg-white/15 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium">
                {b}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
