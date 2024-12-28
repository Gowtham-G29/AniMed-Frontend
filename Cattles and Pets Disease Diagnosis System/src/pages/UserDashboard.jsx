/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
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
import ErrorPage from "../components/ErrorPage";
import { useEffect } from "react";
import LogoutImage from "../components/LogoutImage";

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
      // Reset states when navigating to /Intro
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
      <Typography>{pathname}</Typography>

      {pathname === "/Account/Logout" && (
        <>
          <LogoutImage />
          <LogoutModel handleNavigate={handleNavigate} />
        </>
      )}

      {pathname === "/Account/viewProfile" && <UserAccountOverview />}

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
                <AnimalTypeSelect animalType={setAnimalType} />
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

const CALLS_NAVIGATION = [
  {
    segment: "made",
    title: "Made",
    icon: <CallMadeIcon />,
    action: <Chip label={12} color="success" size="small" />,
  },
  {
    segment: "received",
    title: "Received",
    icon: <CallReceivedIcon />,
    action: <Chip label={4} color="error" size="small" />,
  },
];

function DashboardLayoutNavigationActions() {
  const navigate = useNavigate();

  const router = useDemoRouter("Home");
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const isPopoverOpen = Boolean(popoverAnchorEl);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handlePopoverButtonClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const popoverMenuAction = (
    <>
      <IconButton aria-haspopup="true" onClick={handlePopoverButtonClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={handlePopoverClose}>New call</MenuItem>
        <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem>
      </Menu>
    </>
  );

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
