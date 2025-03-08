/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const DiseaseInfoChatBotSearchBar = ({ setDiseaseName }) => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const options = [
    { label: "Addison’s Disease", id: 98 },
    { label: "Anaplasmosis", id: 41 },
    { label: "Anthrax", id: 7 },
    { label: "Atopic Dermatitis", id: 53 },
    { label: "Babesiosis", id: 42 },
    { label: "Blackleg", id: 8 },
    { label: "Bladder Stones", id: 85 },
    { label: "Bloat (Gastric Dilatation-Volvulus)", id: 91 },
    { label: "Blue Tongue", id: 43 },
    { label: "Bovine Dermatophilosis", id: 2 },
    { label: "Bovine Papillomatosis", id: 5 },
    { label: "Bovine Respiratory Disease Complex", id: 9 },
    { label: "Bovine Spongiform Encephalopathy (BSE)", id: 44 },
    { label: "Bovine Viral Diarrhea", id: 10 },
    { label: "Brachycephalic Airway Syndrome", id: 89 },
    { label: "Brucellosis", id: 11 },
    { label: "Calf Scours", id: 12 },
    { label: "Campylobacteriosis", id: 45 },
    { label: "Canine Cognitive Dysfunction", id: 96 },
    { label: "Canine Distemper", id: 54 },
    { label: "Canine Influenza", id: 79 },
    { label: "Canine Parvovirus", id: 55 },
    { label: "Cherry Eye", id: 90 },
    { label: "Chlamydiosis", id: 46 },
    { label: "Chronic Kidney Disease (CKD)", id: 64 },
    { label: "Clostridial Diseases", id: 13 },
    { label: "Coccidiosis", id: 14 },
    { label: "Contagious Bovine Pleuropneumonia", id: 15 },
    { label: "Cryptosporidiosis", id: 16 },
    { label: "Cushing’s Syndrome", id: 99 },
    { label: "Demodectic Mange", id: 82 },
    { label: "Dermatophytosis", id: 17 },
    { label: "Diabetes Mellitus", id: 66 },
    { label: "Dilated Cardiomyopathy (DCM)", id: 94 },
    { label: "Digital Dermatitis", id: 18 },
    { label: "E. coli Mastitis", id: 19 },
    { label: "Ear Mites", id: 81 },
    { label: "Endometritis", id: 20 },
    { label: "Epilepsy", id: 70 },
    { label: "Feline Immunodeficiency Virus (FIV)", id: 61 },
    { label: "Feline Infectious Peritonitis (FIP)", id: 62 },
    { label: "Feline Leukemia Virus (FeLV)", id: 60 },
    { label: "Feline Upper Respiratory Infection", id: 63 },
    { label: "Flea Allergy Dermatitis", id: 48 },
    { label: "Foot-and-Mouth Disease", id: 4 },
    { label: "Gastroenteritis", id: 72 },
    { label: "Giardiasis", id: 80 },
    { label: "Glaucoma", id: 68 },
    { label: "Hardware Disease", id: 21 },
    { label: "Heartworm Disease", id: 58 },
    { label: "Hemorrhagic Gastroenteritis", id: 87 },
    { label: "Hemorrhagic Septicemia", id: 22 },
    { label: "Hip Dysplasia", id: 69 },
    { label: "Hookworms", id: 74 },
    { label: "Hot Spots", id: 49 },
    { label: "Hyperthyroidism", id: 65 },
    { label: "Hypertrophic Cardiomyopathy (HCM)", id: 93 },
    { label: "Hypoglycemia", id: 100 },
    { label: "Intestinal Parasites", id: 73 },
    { label: "Johne’s Disease", id: 23 },
    { label: "Kennel Cough", id: 56 },
    { label: "Ketosis", id: 24 },
    { label: "Leptospirosis", id: 25 },
    { label: "Liver Fluke", id: 26 },
    { label: "Lumpy Skin Disease", id: 1 },
    { label: "Lymphoma", id: 102 },
    { label: "Lyme Disease", id: 57 },
    { label: "Mange", id: 50 },
    { label: "Mast Cell Tumors", id: 101 },
    { label: "Mastitis", id: 27 },
    { label: "Megaesophagus", id: 92 },
    { label: "Metritis", id: 28 },
    { label: "Mycoplasmosis", id: 29 },
    { label: "Neosporosis", id: 30 },
    { label: "Obesity", id: 67 },
    { label: "Osteoarthritis", id: 71 },
    { label: "Pancreatitis", id: 59 },
    { label: "Paratuberculosis", id: 31 },
    { label: "Patent Ductus Arteriosus (PDA)", id: 95 },
    { label: "Periodontal Disease", id: 88 },
    { label: "Pinkeye", id: 32 },
    { label: "Pneumonia", id: 33 },
    { label: "Psoroptic Mange", id: 6 },
    { label: "Pyelonephritis", id: 84 },
    { label: "Pyoderma", id: 52 },
    { label: "Q Fever", id: 47 },
    { label: "Rabies", id: 34 },
    { label: "Redwater Disease", id: 35 },
    { label: "Ringworm", id: 3 },
    { label: "Roundworms", id: 75 },
    { label: "Salmonellosis", id: 36 },
    { label: "Sarcoptic Mange", id: 83 },
    { label: "Seborrhea", id: 51 },
    { label: "Tapeworms", id: 76 },
    { label: "Theileriosis", id: 37 },
    { label: "Toxoplasmosis", id: 78 },
    { label: "Tracheal Collapse", id: 97 },
    { label: "Tuberculosis", id: 38 },
    { label: "Udder Edema", id: 39 },
    { label: "Urinary Tract Infections (UTI)", id: 86 },
    { label: "Vesicular Stomatitis", id: 40 },
    { label: "Whipworms", id: 77 },
  ];

  const handleSelectionChange = (event, value) => {
    setSelectedDisease(value);
  };

  const handleSendClick = () => {
    if (selectedDisease) {
      setDiseaseName(selectedDisease.label);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      <div className="flex items-center space-x-2 max-w-lg mx-auto">
        <Autocomplete
          disablePortal
          fullWidth
          onChange={handleSelectionChange}
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Type to search..."
            />
          )}
        />
        <Button
          variant="contained"
          onClick={handleSendClick} // Only send when clicked
          endIcon={<SendIcon />}
          className="whitespace-nowrap"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default DiseaseInfoChatBotSearchBar;
