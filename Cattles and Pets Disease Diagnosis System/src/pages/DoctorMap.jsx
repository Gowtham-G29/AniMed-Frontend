/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "../components/Loader";
import FloatingNavigationButton from "../components/FloatingNavigationButton";
import { getNearbyAnimals } from "../services/api";

import doctorMarker from "../assets/doctor-marker.png";
import currentLocationMarker from "../assets/animal-marker.png";

const CenterMap = ({ currentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView(currentLocation, 13);
    }
  }, [currentLocation, map]);

  return null;
};

export const DoctorMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [navigateCurrent, setNavigateCurrent] = useState(false);
  const [animals, setAnimals] = useState([]);

  const handleNearbyAnimalLocations = async () => {
    try {
      const response = await getNearbyAnimals();

      setAnimals(response.data.animals);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    handleNearbyAnimalLocations();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location", error);
          setCurrentLocation([0, 0]);
        }
      );
    } else {
      setCurrentLocation([0, 0]);
    }
  }, [navigateCurrent]);

  const doctorIcon = new L.Icon({
    iconUrl: doctorMarker,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
  });

  const locationIcon = new L.Icon({
    iconUrl: currentLocationMarker,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
  });

  return (
    <div style={{ height: "82vh", width: "100%" }}>
      {currentLocation ? (
        <MapContainer
          center={currentLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={currentLocation} icon={doctorIcon}>
            <Popup>
              <span className="font-bold text-lg text-blue-400">
                You are here
              </span>
              <br />
            </Popup>
          </Marker>
          {animals.map((animal, index) => {
            const { latitude, longitude } = animal.geolocation;
            return (
              <Marker
                key={index}
                position={[latitude, longitude]}
                icon={locationIcon}
              >
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    <span></span>
                    <strong className="text-lg">
                      {index + 1}. {animal.species}
                    </strong>
                    <br />
                    <span>Breed: {animal.breed}</span>
                    <br />
                    <span>Gender: {animal.gender}</span>
                    <br />
                    <span>
                      Status:{" "}
                      <strong>
                        {animal.doctorSuggestions.suggestedBy !== "Unsolved"
                          ? "Solved"
                          : "Unsolved"}
                      </strong>
                    </span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          <CenterMap currentLocation={currentLocation} />
          <FloatingNavigationButton setNavigateCurrent={setNavigateCurrent} />
        </MapContainer>
      ) : (
        <Loader />
      )}
    </div>
  );
};
