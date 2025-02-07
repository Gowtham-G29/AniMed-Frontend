/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "../components/Loader";
import FloatingNavigationButton from "../components/FloatingNavigationButton";
import { getAnimalOwnerDetails, getNearByDoctors } from "../services/api";

const CenterMap = ({ currentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView(currentLocation, 13);
    }
  }, [currentLocation, map]);

  return null;
};

export const UserMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [animalOwnerID, setAnimalOwnerID] = useState(null);
  const [navigateCurrent, setNavigateCurrent] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const handleAnimalOwnerDetails = async () => {
    try {
      const response = await getAnimalOwnerDetails();
      setAnimalOwnerID(response.data.AnimalOwner.userID);
    } catch (error) {
      console.error("Error fetching animal owner details:", error);
    }
  };

  const handleDoctorsLocation = async (animalOwnerID) => {
    try {
      const response = await getNearByDoctors(animalOwnerID);
      setDoctors(response.data.data);
      console.log("Nearby doctors:", response.data.data);
    } catch (err) {
      console.error("Error fetching nearby doctors:", err);
    }
  };

  useEffect(() => {
    handleAnimalOwnerDetails();
  }, []);

  useEffect(() => {
    if (animalOwnerID) {
      handleDoctorsLocation(animalOwnerID);
    }
  }, [animalOwnerID]);

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

  const customIcon1 = new L.Icon({
    iconUrl: "/src/assets/doctor-marker.png",
    iconSize: [30, 50],
    iconAnchor: [15, 50],
  });

  const customIcon2 = new L.Icon({
    iconUrl: "/src/assets/currentlocation.png",
    iconSize: [40, 60],
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
          <Marker position={currentLocation} icon={customIcon2}>
            <Popup>
              You are here <br />
            </Popup>
          </Marker>
          {doctors.map((doctor, index) => {
            const { latitude, longitude } = doctor.geolocation;
            return (
              <Marker
                key={index}
                position={[latitude, longitude]}
                icon={customIcon1}
              >
                <Popup>
                  <strong>Dr: {doctor.fullName}</strong> <br />
                  {doctor.specialization}
                  <br />
                  {doctor.clinicName} <br />
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
