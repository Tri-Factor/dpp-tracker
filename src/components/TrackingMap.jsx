import { useState, useMemo, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { supplyChainSteps } from '../data/mockData'
import InfoPanel from './InfoPanel'
import StepCarousel from './StepCarousel'

// Create custom numbered marker icons
const createMarkerIcon = (step, isSelected) => {
  const size = isSelected ? 36 : 30

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `<div class="custom-marker ${isSelected ? 'marker-selected' : ''}" style="width:${size}px;height:${size}px;">${step.id}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Component to fit map bounds to all markers
const FitBounds = ({ steps }) => {
  const map = useMap()

  useEffect(() => {
    if (steps.length > 0) {
      const bounds = L.latLngBounds(steps.map((s) => s.coordenadas))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 7 })
    }
  }, [map, steps])

  return null
}

// Component to fly to a specific step
const FlyToStep = ({ step }) => {
  const map = useMap()

  useEffect(() => {
    if (step) {
      map.flyTo(step.coordenadas, Math.max(map.getZoom(), 6), {
        duration: 0.8,
      })
    }
  }, [map, step])

  return null
}

const TrackingMap = () => {
  const [selectedStep, setSelectedStep] = useState(supplyChainSteps[0])
  const mapRef = useRef(null)

  // Single polyline through all points
  const allCoords = useMemo(() => {
    return supplyChainSteps.map((s) => s.coordenadas)
  }, [])

  const handleSelectStep = (step) => {
    setSelectedStep(step)
  }

  // Center of Brazil for initial view
  const defaultCenter = [-14.5, -40.0]

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds steps={supplyChainSteps} />
        <FlyToStep step={selectedStep} />

        {/* Zoom control on the right */}
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <ZoomControl />
          </div>
        </div>

        {/* Full path connecting all 7 points */}
        {allCoords.length > 1 && (
          <Polyline
            positions={allCoords}
            pathOptions={{
              color: '#E96E8C',
              weight: 3,
              opacity: 0.7,
            }}
          />
        )}

        {/* Markers */}
        {supplyChainSteps.map((step) => (
          <Marker
            key={step.id}
            position={step.coordenadas}
            icon={createMarkerIcon(step, selectedStep?.id === step.id)}
            eventHandlers={{
              click: () => handleSelectStep(step),
              mouseover: () => {
                if (window.innerWidth > 768) {
                  handleSelectStep(step)
                }
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Vertical step carousel on the right */}
      <StepCarousel selectedStep={selectedStep} onSelect={handleSelectStep} />

      {/* Always-visible bottom info panel */}
      <InfoPanel step={selectedStep} />
    </div>
  )
}

// Custom zoom control rendered inside the map
const ZoomControl = () => {
  const map = useMap()

  return (
    <>
      <a
        className="leaflet-control-zoom-in"
        href="#"
        title="Mais zoom"
        role="button"
        aria-label="Mais zoom"
        onClick={(e) => { e.preventDefault(); map.zoomIn() }}
      >
        +
      </a>
      <a
        className="leaflet-control-zoom-out"
        href="#"
        title="Menos zoom"
        role="button"
        aria-label="Menos zoom"
        onClick={(e) => { e.preventDefault(); map.zoomOut() }}
      >
        −
      </a>
    </>
  )
}

export default TrackingMap
