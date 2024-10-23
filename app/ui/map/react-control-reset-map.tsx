
import { useMemo } from "react"
import { useMap } from "react-leaflet"
import { FiRefreshCw } from 'react-icons/fi';

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}
  
export default function ResetMapControl({ position, center, zoom }) {
    const parentMap = useMap()

    const onClick = () => {
        console.log(center)
        parentMap.setView(center, zoom)
    }
  
    // Memoize the minimap so it's not affected by position changes
    const resetButton = useMemo(
      () => (
        <div
            className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-lg border-2 border-blue-500 text-blue-500"
            onClick={() => onClick()}
            >
            <FiRefreshCw size={20} />
        </div>
      ),
      [],
    )
  
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{resetButton}</div>
      </div>
    )
  }