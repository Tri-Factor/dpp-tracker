import { useRef, useEffect } from 'react'
import { supplyChainSteps } from '../data/mockData'

// Bigger buttons: active 44px, inactive 36px, gap 8px
// Show 3 items: approx 3 * 40 + 2 * 8 = 136px visible area
const VISIBLE_HEIGHT = 148

const StepCarousel = ({ selectedStep, onSelect }) => {
  const scrollRef = useRef(null)
  const itemRefs = useRef({})

  // Scroll so the selected item is centered in the visible area
  useEffect(() => {
    const container = scrollRef.current
    const item = selectedStep && itemRefs.current[selectedStep.id]
    if (!container || !item) return

    const itemTop = item.offsetTop - container.offsetTop
    const itemHeight = item.offsetHeight
    const scrollTo = itemTop - VISIBLE_HEIGHT / 2 + itemHeight / 2

    container.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    })
  }, [selectedStep])

  return (
    <div className="absolute right-3 top-[40%] -translate-y-1/2 z-[900] flex flex-col items-center">
      <div
        className="relative overflow-hidden"
        style={{
          height: `${VISIBLE_HEIGHT}px`,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          style={{ height: `${VISIBLE_HEIGHT}px` }}
          className="overflow-y-auto overscroll-contain py-5 px-2 flex flex-col items-center gap-2 scrollbar-hide relative"
        >
          {/* Vertical connecting line behind the dots */}
          <div className="absolute top-5 bottom-5 w-[2px] bg-rosa-etico/25 rounded-full pointer-events-none" />

          {supplyChainSteps.map((step) => {
            const isActive = selectedStep?.id === step.id
            return (
              <button
                key={step.id}
                ref={(el) => (itemRefs.current[step.id] = el)}
                onClick={() => onSelect(step)}
                className={`
                  relative z-10 flex-shrink-0 flex items-center justify-center rounded-full
                  font-display font-bold transition-all duration-200
                  ${isActive
                    ? 'w-11 h-11 text-sm bg-rosa-etico text-white shadow-lg shadow-rosa-etico/30 scale-110'
                    : 'w-9 h-9 text-xs bg-white text-preto-looma/70 shadow-md border border-black/10 hover:border-rosa-etico/40 hover:text-rosa-etico'
                  }
                `}
              >
                {step.id}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StepCarousel
