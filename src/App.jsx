import Header from './components/Header'
import TrackingMap from './components/TrackingMap'

function App() {
  return (
    <div className="w-full h-screen bg-branco-algodao flex flex-col overflow-hidden">
      <Header />
      {/* Map fills remaining space below header */}
      <div className="flex-1 pt-[44px]">
        <TrackingMap />
      </div>
    </div>
  )
}

export default App
