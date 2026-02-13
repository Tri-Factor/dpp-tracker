import Header from './components/Header'
import TrackingMap from './components/TrackingMap'

function App() {
  return (
    <div className="w-full bg-gray-100 flex justify-center" style={{ height: '100dvh' }}>
      <div className="w-full max-w-[430px] h-full bg-branco-algodao flex flex-col overflow-hidden relative shadow-2xl">
        <Header />
        {/* Map fills remaining space below header */}
        <div className="flex-1 pt-[44px]">
          <TrackingMap />
        </div>
      </div>
    </div>
  )
}

export default App
