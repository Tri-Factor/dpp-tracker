import { TreePine, Shield } from 'lucide-react'

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-sm border-b border-black/5 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <TreePine className="w-5 h-5 text-verde-sustentavel" />
            <Shield className="w-3 h-3 text-rosa-etico absolute -top-0.5 -right-1" />
          </div>
          <span className="font-display text-lg font-bold text-rosa-etico">
            Looma
          </span>
        </div>

        {/* Subtitle */}
        <span className="text-[11px] font-medium text-verde-sustentavel tracking-wide uppercase">
          Rastreio de Produto
        </span>
      </div>
    </header>
  )
}

export default Header
