/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import LoaderMini from "./LoaderMini";

// Custom icon for clicked location
const clickedLocationIcon = new L.Icon({
  iconUrl: "src/assets/pin2.png",
  iconSize: [50, 50],
  iconAnchor: [13, 50],
});

// Custom icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: "src/assets/currentLocation2.png",
  iconSize: [30, 50],
  iconAnchor: [17, 50],
});

const LocationPickerMap = ({ setManualCoords }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [pendingLocation, setPendingLocation] = useState(null);
  const [finalLocation, setFinalLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setFinalLocation(null);
        setPendingLocation(e.latlng);
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1000);
      },
    });
    return null;
  };

  const handleLocationConfirmation = (confirmed) => {
    setIsModalOpen(false);
    if (confirmed) {
      setFinalLocation(pendingLocation);
      setManualCoords(pendingLocation);
    }
    setPendingLocation(null);
  };

  if (!currentPosition) {
    return <LoaderMini/>;
  }

  console.log("final", finalLocation);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={() => handleLocationConfirmation(false)}
      >
        <DialogTitle>Confirm Location</DialogTitle>
        <DialogContent>Do you want to set this location?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleLocationConfirmation(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleLocationConfirmation(true)}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        <Marker position={currentPosition} icon={currentLocationIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {finalLocation && (
          <Marker position={finalLocation} icon={clickedLocationIcon}>
            <Popup>Manually Chosen Location</Popup>
          </Marker>
        )}

        {pendingLocation && (
          <Marker position={pendingLocation} icon={clickedLocationIcon}>
            <Popup>Manually Chosen Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default LocationPickerMap;
