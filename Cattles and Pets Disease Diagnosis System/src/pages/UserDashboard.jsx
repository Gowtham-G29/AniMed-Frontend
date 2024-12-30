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

      {pathname === "/YourAnimals/ViewLogs" && (
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
      )}

      {pathname === "/Account/updateAccount" && <UpdateProfile />}

      {pathname === "/Account/Logout" && (
        <>
          <LogoutImage />
          <LogoutModel handleNavigate={handleNavigate} />
        </>
      )}

      {pathname === "/Account/viewProfile" && (
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
  {
    segment: "Logout",
    title: "Logout",
    icon: <LogoutIcon />,
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
          kind: "divider",
        },

        {
          segment: "Account",
          title: "Account",
          icon: <Avatar />,
          children: ACCOUNT_NAVIGATION,
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
