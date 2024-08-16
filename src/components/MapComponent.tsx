import Map, { NavigationControl, Marker, Popup } from "react-map-gl";
import { useState, useCallback, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { IconHome2, IconMapPin } from "@tabler/icons-react";

const MapComponent = () => {
  const MAPBOXTOKEN =
    "pk.eyJ1IjoiYW50aG9ueWJjMzI5IiwiYSI6ImNseWF6dGU5ZzFhOGsybG90c3IzZDJhMGYifQ.yMl1OMSH0OWjUB331UO2xQ";
  const [viewport, setViewport] = useState({
    latitude: 21.15107,
    longitude: -86.85149,
    zoom: 13,
    width: "100%",
    height: "100%",
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    googleLink: string;
  } | null>(null);

  const locations = [
    {
      id: 1,
      name: "Salón Diamante",
      googleLink: "https://maps.app.goo.gl/xV29K3Kww1jJFXYU6",
      latitude: 21.1627746,
      longitude: -86.8879106,
    },
    {
      id: 2,
      name: "Salon Los Pinos",
      googleLink: "https://maps.app.goo.gl/xiatJC4wTc83mWH3A",
      latitude: 21.165481,
      longitude: -86.8818169,
    },
    {
      id: 3,
      name: "Jardín De Eventor El Palmar",
      googleLink: "https://maps.app.goo.gl/otnGhWWFTcwtkrGF9",
      latitude: 21.1287053,
      longitude: -86.8563592,
    },
    {
      id: 4,
      name: "Jardín San Francisco",
      googleLink: "https://maps.app.goo.gl/PUfuV825icXTVCWLA",
      latitude: 21.1433345,
      longitude: -86.8957749,
    },
    {
      id: 5,
      name: "Jardín de Eventos Alborada",
      googleLink: "https://maps.app.goo.gl/3soipdvm9EcpHeXFA",
      latitude: 21.1285176,
      longitude: -86.8550734,
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMove = useCallback((evt: any) => {
    setViewport(evt.viewState);
  }, []);

  const handleLocationClick = (location: {
    id: number;
    name: string;
    googleLink: string;
    latitude: number;
    longitude: number;
  }) => {
    setViewport((prev) => ({
      ...prev,
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 13,
      transitionDuration: 500,
    }));
    setSelectedLocation(location);
  };

  return (
    <div className="w-full h-full" style={{ height: "600px" }}>
      <div className="relative flex h-full">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 bg-white border-r border-gray-300 overflow-hidden lg:w-64`}
        >
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Salones | Jardines</h2>
            </div>
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(location)}
                className={`flex items-center w-full text-sm border-2 border-gray-200 font-bold py-2 px-4 rounded mb-2 text-left ${
                  location.id === selectedLocation?.id
                    ? "bg-primary text-white"
                    : "text-black"
                }`}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center text-xl rounded-full mr-2 ${
                    location.id === selectedLocation?.id
                      ? "bg-white text-primary"
                      : "bg-primary text-white"
                  }`}
                >
                  {location.id}
                </span>
                <div className="font-normal text-base">{location.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <Map
            {...viewport}
            mapboxAccessToken={MAPBOXTOKEN}
            mapStyle="mapbox://styles/anthonybc329/clydlyd26013c01nz1v28dali"
            onMove={onMove}
            style={{ height: "100%" }}
          >
            <NavigationControl position="top-right" />
            {locations.map((location, index) => (
              <Marker
                key={index}
                latitude={location.latitude}
                longitude={location.longitude}
              >
                <div
                  className="bg-primary text-white p-1 rounded-full cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                >
                  <IconMapPin size={20} />
                </div>
              </Marker>
            ))}
            {selectedLocation && (
              <Popup
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                onClose={() => setSelectedLocation(null)}
                closeOnClick={false}
                className="custom-popup"
              >
                <div className="p-2">
                  <h3 className="text-lg font-semibold">
                    {selectedLocation.name}
                  </h3>
                  <a
                    href={selectedLocation.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2 inline-block"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </Popup>
            )}
          </Map>
          <button
            className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;