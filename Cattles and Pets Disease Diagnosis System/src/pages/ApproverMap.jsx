/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "../components/Loader";
import FloatingNavigationButton from "../components/FloatingNavigationButton";
import { approveDoctors } from "../services/api";
import currentLocationMarker from "../assets/currentlocation.png"
import doctorlocation from "../assets/doctor-marker.png"

const CenterMap = ({ currentLocation }) => {
  const map = useMap();


  

  useEffect(() => {
    if (currentLocation) {
      map.setView(currentLocation, 13);
    }
  }, [currentLocation, map]);

  return null;
};

export const ApproverMap = () => {
  const [navigateCurrent, setNavigateCurrent] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const [doctorDetails,setDoctorDetails]=useState([]);
  const [doctorStatus,setDoctorStatus]=useState([]);

   useEffect(() => {
      const getDoctorDetails = async () => {
        try {
          const response = await approveDoctors();
          setDoctorDetails(response.data.doctorDetails);
          setDoctorStatus(response.data.doctors);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        } 
      };
  
      getDoctorDetails();
    }, []);
  
    //  Filtering doctors based on status
    const approvedDoctors = doctorDetails.filter((doctor) =>
      doctorStatus.some(
        (status) => status._id === doctor.userID && status.activate === true
      )
    );
  


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
    iconUrl: doctorlocation,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
  });

  const customIcon2 = new L.Icon({
    iconUrl: currentLocationMarker,
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
          {approvedDoctors.map((doctor, index) => {
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
