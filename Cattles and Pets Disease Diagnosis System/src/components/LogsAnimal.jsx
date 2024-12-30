import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { getAnimalDetails } from "../services/api";
import AnimalDataTable from "./DataTableAnimal";
import { useState } from "react";

export default function LogsAnimal() {

//   const sampleData = [
//     {
//       name: "Bella",
//       species: "Dog",
//       breed: "Labrador Retriever",
//       age: "5 years",
//       gender: "Female",
//       weight: "25 kg",
//       uniqueIdentificationMark: "White patch on tail",
//       geolocation: { latitude: "12.9716", longitude: "77.5946" },
//       vaccinationRecords: [
//         { date: "2023-01-15", type: "Rabies" },
//         { date: "2023-05-20", type: "Parvovirus" },
//       ],
//       previousIllnesses: [
//         { name: "Skin Infection", details: "Treated with antibiotics" },
//       ],
//     },
//     {
//       name: "Max",
//       species: "Cattle",
//       breed: "Holstein Friesian",
//       age: "3 years",
//       gender: "Male",
//       weight: "450 kg",
//       uniqueIdentificationMark: "Black spot on forehead",
//       geolocation: { latitude: "13.0827", longitude: "80.2707" },
//       vaccinationRecords: [
//         { date: "2022-09-12", type: "Foot and Mouth Disease" },
//       ],
//       previousIllnesses: [
//         { name: "Fever", details: "Treated with antipyretics" },
//       ],
//     },
//     {
//       name: "Kitty",
//       species: "Cat",
//       breed: "Siamese",
//       age: "2 years",
//       gender: "Female",
//       weight: "4 kg",
//       uniqueIdentificationMark: "Blue eyes",
//       geolocation: { latitude: "19.0760", longitude: "72.8777" },
//       vaccinationRecords: [
//         { date: "2023-06-10", type: "Feline Leukemia" },
//       ],
//       previousIllnesses: [],
//     },
//   ];
  

 

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Accordion Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AnimalDataTable data={data}/>
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
