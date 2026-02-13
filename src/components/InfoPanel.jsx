import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Package } from 'lucide-react'

const InfoPanel = ({ step }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1001] px-3 pb-4 pt-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        >
          <div className="bg-white/90 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto">
            {/* Step number & name */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-white bg-rosa-etico flex-shrink-0">
                  {step.id}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-preto-looma">
                    {step.etapa}
                  </h3>
                  <p className="text-xs text-preto-looma/50">{step.local}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {/* Fabric/Material */}
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-rosa-etico flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-preto-looma/40 uppercase tracking-wider">Tecido / Material</p>
                    <p className="text-sm text-preto-looma font-medium truncate">{step.tecido}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-verde-sustentavel flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-preto-looma/40 uppercase tracking-wider">Localização</p>
                    <p className="text-sm text-preto-looma font-medium truncate">{step.local}, {step.cidade}</p>
                  </div>
                </div>

                {/* Date */}
                {step.data && (
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-preto-looma/40 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-preto-looma/40 uppercase tracking-wider">Data de registro</p>
                      <p className="text-sm text-preto-looma font-medium">
                        {new Date(step.data).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                        {step.hora && ` às ${step.hora}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default InfoPanel
