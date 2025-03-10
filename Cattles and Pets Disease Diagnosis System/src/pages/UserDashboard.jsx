/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import { createTheme } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import CallIcon from "@mui/icons-material/Call";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Logo from "../components/Logo";

import AnimalTypeSelect from "../components/AnimalTypeSelect";
import { useState } from "react";
import AnimalImageListPet from "../components/AnimalImageListPet";
import AnimalImageListFarm from "../components/AnimalImageListFarm";
import AnimalDetailsRegister from "./AnimalDetailsRegister";
import AnimalRegisterSnackBar from "../components/AnimalRegisterSnackBar";
import { Typography } from "@mui/material";
import UserDashboardHomePage from "../components/UserDashboardHomePage";
import AnimalRegFailSnackBar from "../components/AnimalRegFailSnackBar";
import AnimalRegSuccesPage from "../components/AnimalRegSuccesPage";
import Avatar from "../components/Avatar";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import UserAccountOverview from "./UserDetails";
import LogoutModel from "../components/LogoutModel";
import { isAuthenticated } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LogoutImage from "../components/LogoutImage";
import UpdateProfile from "./UpdateProfile";
import AnimalDataTable from "../components/DataTableAnimal";
import SuggestionList from "../components/SuggestionList";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import InfoIcon from "@mui/icons-material/Info";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { UserMap } from "./UserMap";
import DoctorContacts from "../components/DoctorContacts";
import ComingSoon from "../components/ComingSoon";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DiseaseImageUpload from "../components/DiseasePrediction";
import DiseaseInfoChatPage from "../components/DiseaseInfoChatBotPage";
import DiseaseInfoChatBotSearchBar from "../components/DiseaseInfoChatBotSearchBar";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const DemoPageContent = ({ pathname, router }) => {
  const [animalRegStatus, setanimalRegStatus] = useState(false);
  const [animalType, setAnimalType] = useState("initial");
  const [animalSpecies, setAnimalSpecies] = useState("");
  const [animalRegFail, setanimalRegFail] = useState(false);

  const [diseaseName, setDiseaseName] = useState(null);

  console.log(diseaseName);

  const handleNavigate = (route) => {
    if (route === "/Home") {
      setAnimalType("initial");
      setAnimalSpecies("");
      setanimalRegFail(false);
    }

    if (pathname !== route) {
      router.navigate(route);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <Typography>{pathname}</Typography> */}
      {pathname === "/MedicalHelp/contactDoctors" ||
        (pathname === "/MedicalHelp" && (
          <>
            <Typography
              variant="h4"
              color="primary"
              marginBottom="50px"
              style={{ fontWeight: "bold" }}
            >
              Nearby Doctors Contacts
            </Typography>
            <DoctorContacts />
          </>
        ))}

      {pathname === "/MedicalHelp/nearbyLocations" && (
        <>
          <UserMap />
        </>
      )}

      {pathname === "/YourAnimals/doctorSuggesitions" && (
        <>
          <Typography
            variant="h4"
            color="primary"
            marginBottom="50px"
            style={{ fontWeight: "bold" }}
          >
            Doctors Suggestions
          </Typography>
          <SuggestionList />
        </>
      )}

      {pathname === "/YourAnimals/ViewLogs" ||
        (pathname === "/YourAnimals" && (
          <>
            <Typography
              variant="h4"
              color="primary"
              marginBottom="50px"
              style={{ fontWeight: "bold" }}
            >
              Registered Logs
            </Typography>
            <AnimalDataTable />
          </>
        ))}

      {pathname === "/Account/updateAccount" && (
        <>
          <Typography
            variant="h4"
            color="primary"
            style={{ fontWeight: "bold" }}
          >
            Update Profile
          </Typography>
          <br />
          <Typography variant="subtitle2" className="text-slate-500">
            <strong className="text-black">NOTE*:</strong>All the Profile
            updations makes you to <strong>Logout</strong> automatically. These
            changes update the login credentials only. You need to login again
            to experience the changes.
          </Typography>
          <UpdateProfile />
        </>
      )}

      {pathname === "/Logout" && (
        <>
          <LogoutImage />
          <LogoutModel handleNavigate={handleNavigate} />
        </>
      )}

      {(pathname === "/Account/viewProfile")||(pathname==="/Account") && (
        <>
          <Typography
            variant="h4"
            color="primary"
            marginBottom="50px"
            style={{ fontWeight: "bold" }}
          >
            User Info
          </Typography>
          <UserAccountOverview />
        </>
      )}

      {pathname === "/Home" && (
        <>
          {!animalRegStatus && (
            <UserDashboardHomePage
              setregPageNavigate={() => handleNavigate("/AnimalReg")}
            />
          )}
          {animalRegStatus && (
            <>
              <AnimalRegSuccesPage />
              <AnimalRegisterSnackBar setanimalRegStatus={setanimalRegStatus} />
            </>
          )}
        </>
      )}

      {pathname === "/AnimalReg" && (
        <>
          {animalSpecies ? (
            <>
              {animalRegFail && (
                <AnimalRegFailSnackBar setanimalRegFail={setanimalRegFail} />
              )}
              <AnimalDetailsRegister
                animalSpecies={animalSpecies}
                setanimalRegStatus={(status) => {
                  setanimalRegStatus(status);
                  handleNavigate("Home");
                }}
                setanimalRegFail={setanimalRegFail}
              />
            </>
          ) : (
            <>
              {animalType === "pets" && (
                <AnimalImageListPet setAnimalSpecies={setAnimalSpecies} />
              )}
              {animalType === "farm" && (
                <AnimalImageListFarm setAnimalSpecies={setAnimalSpecies} />
              )}
              {(animalType === "initial" || animalRegStatus) && (
                <>
                  <Typography
                    variant="h4"
                    color="primary"
                    marginBottom="50px"
                    style={{ fontWeight: "bold" }}
                  >
                    Choose Animal Type
                  </Typography>
                  <AnimalTypeSelect animalType={setAnimalType} />
                </>
              )}
            </>
          )}
        </>
      )}
      {pathname === "/knowAboutDisease" && (
        <>
          <DiseaseInfoChatPage diseaseName={diseaseName} />

          <div className="fixed bottom-0  w-full bg-white p-2">
            <DiseaseInfoChatBotSearchBar setDiseaseName={setDiseaseName} />
          </div>
        </>
      )}

      {pathname === "/Detectiondevice/doctorsuggestions" && <ComingSoon />}

      {(pathname === "/Detectiondevice/PredictionLogs")||(pathname==="/Detectiondevice") && <ComingSoon />}

      {pathname === "/Detectiondevice/yourDeviceInfo" && <ComingSoon />}

      {pathname === "/prediction" && <DiseaseImageUpload />}
    </Box>
  );
};

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const ACCOUNT_NAVIGATION = [
  {
    segment: "viewProfile",
    title: "View Profile",
    icon: <PersonIcon />,
  },
  {
    segment: "updateAccount",
    title: "Update Account",
    icon: <UpgradeIcon />,
  },
];

const YOURANIMAL_NAVIGATION = [
  {
    segment: "ViewLogs",
    title: "Animal Logs",
    icon: <FormatListNumberedIcon />,
  },
  {
    segment: "doctorSuggesitions",
    title: "Suggestions",
    icon: <MedicationIcon />,
  },
];

const MEDICALHELP_NAVIGATION = [
  {
    segment: "nearbyLocations",
    title: "Nearby Veternary Hospitals",
    icon: <AddLocationAltIcon />,
  },
  {
    segment: "contactDoctors",
    title: "Contact Doctors",
    icon: <CallIcon />,
  },
];

const DETECTION_DEVICE = [
  {
    segment: "PredictionLogs",
    title: "Prediction Logs",
    icon: <FormatListNumberedRtlIcon />,
  },
  {
    segment: "doctorsuggestions",
    title: "Doctor suggestions",
    icon: <MedicationIcon />,
  },
  {
    segment: "yourDeviceInfo",
    title: "Your Device Info",
    icon: <InfoIcon />,
  },
];

function DashboardLayoutNavigationActions() {
  const navigate = useNavigate();

  const router = useDemoRouter("Home");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AppProvider
      navigation={[
        {
          segment: "Home",
          title: "Home",
          icon: <HomeIcon />,
        },
        {
          segment: "AnimalReg",
          title: "Animal Register",
          icon: <EditNoteIcon />,
        },
        {
          segment: "YourAnimals",
          title: "Your Animals",
          icon: <PetsIcon />,
          children: YOURANIMAL_NAVIGATION,
        },
        {
          segment: "MedicalHelp",
          title: "Medical Help",
          icon: <MedicalInformationIcon />,
          children: MEDICALHELP_NAVIGATION,
        },
        {
          segment: "knowAboutDisease",
          title: "Know About Disease (Chat bot)",
          icon: <SmartToyIcon />,
        },
        {
          segment: "Detectiondevice",
          title: "Detection Device",
          icon: <SettingsRemoteIcon />,
          children: DETECTION_DEVICE,
        },
        {
          segment: "prediction",
          title: "Disease Prediction",
          icon: <TipsAndUpdatesIcon />,
        },
        {
          kind: "divider",
        },

        {
          segment: "Account",
          title: "Account",
          icon: <Avatar />,
          children: ACCOUNT_NAVIGATION,
        },
        {
          segment: "Logout",
          title: "Logout",
          icon: <LogoutIcon />,
        },
      ]}
      branding={{
        logo: <Logo />,
        title: "User Dashboard",
        homeUrl: "Home",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent
          pathname={router.pathname}
          router={router}
        ></DemoPageContent>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutNavigationActions;
