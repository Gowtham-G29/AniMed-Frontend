import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAnimalOwnerDetails, getNearByDoctors } from "../services/api";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider, IconButton, Tooltip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

export default function DoctorContacts() {
  const [expanded, setExpanded] = React.useState(false);
  const [animalOwnerID, setAnimalOwnerID] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {doctors.map((doctor, index) => (
        <Accordion
          key={doctor.id || index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={
              <Tooltip title="More">
                <IconButton>
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="span"
              sx={{ flex: "0 1 auto", textAlign: "start" }}
            >
              <strong>Dr. {doctor.fullName}</strong>
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 1 auto",
                textAlign: "center",
              }}
            >
              <Typography component="span" sx={{ color: "text.secondary" }}>
                <strong>Specialization: {doctor.specialization}</strong>
              </Typography>
              <Typography component="span" sx={{ color: "text.secondary" }}>
                <strong>{doctor.clinicName}</strong>
              </Typography>
            </Box>

            <Tooltip title="Call doctor">
              <Button
                color="success"
                sx={{
                  flex: "0 1 auto",
                  ml: 2,
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  window.location.href = `tel:${doctor.phoneNumber}`;
                }}
              >
                <CallIcon fontSize="large" />
              </Button>
              
            </Tooltip>
          </AccordionSummary>

          <AccordionDetails>
            <Typography component="div">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between", 
                    alignItems: "center",
                    gap: 2, 
                  }}
                >
                  <span>
                    <strong>Contact:</strong>
                  </span>
                  <span>{doctor.phoneNumber || "N/A"}</span>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <span>
                    <strong>Email:</strong>
                  </span>
                  <span>{doctor.email || "N/A"}</span>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <span>
                    <strong>Hospital Address:</strong>
                  </span>
                  <span>
                    {doctor.clinicAddress || "N/A"} - {doctor.pincode}
                  </span>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <span>
                    <strong>Experience:</strong>
                  </span>
                  <span>{doctor.experience} year</span>
                </Box>
                <Divider />
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
