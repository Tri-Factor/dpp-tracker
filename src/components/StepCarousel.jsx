import { useRef, useEffect } from 'react'
import { supplyChainSteps } from '../data/mockData'

// Show 3 items: approx 3 * 34 + 2 * 6 = 114px visible area
const VISIBLE_HEIGHT = 114

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
    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[900] flex flex-col items-center">
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
          className="overflow-y-auto overscroll-contain py-4 px-1.5 flex flex-col items-center gap-1.5 scrollbar-hide relative"
        >
          {/* Vertical connecting line behind the dots */}
          <div className="absolute top-4 bottom-4 w-[2px] bg-rosa-etico/25 rounded-full pointer-events-none" />

          {supplyChainSteps.map((step) => {
            const isActive = selectedStep?.id === step.id
            return (
              <button
                key={step.id}
                ref={(el) => (itemRefs.current[step.id] = el)}
                onClick={() => onSelect(step)}
                className={`
                  relative z-10 flex-shrink-0 flex items-center justify-center rounded-full
                  font-display font-bold text-[10px] transition-all duration-200
                  ${isActive
                    ? 'w-9 h-9 bg-rosa-etico text-white shadow-lg shadow-rosa-etico/30 scale-110'
                    : 'w-7 h-7 bg-white text-preto-looma/70 shadow-md border border-black/10 hover:border-rosa-etico/40 hover:text-rosa-etico'
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
