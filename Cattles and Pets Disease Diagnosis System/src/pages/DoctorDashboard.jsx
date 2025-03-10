/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { createTheme } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
// import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Logo from "../components/Logo";

import PinDropIcon from "@mui/icons-material/PinDrop";
import PetsIcon from "@mui/icons-material/Pets";
// import ComingSoon from "../components/ComingSoon";
import { DoctorMap } from "./DoctorMap";
import AnimalDataTable2 from "../components/DataTableAnimals2";
import DoctorDashboardHomePage from "../components/DoctorDashboardHomepage";
import { useEffect, useState } from "react";
import SuggestionForm from "../components/SuggestionForm";
import SpeakerPhoneIcon from "@mui/icons-material/SpeakerPhone";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import PreviewIcon from "@mui/icons-material/Preview";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import LogoutIcon from "@mui/icons-material/Logout";

import ComingSoon from "../components/ComingSoon";
import LogoutModelDoctor from "../components/LogoutModelDoctor";
import { isAuthenticated } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import LogoutImageDoctor from "../components/LogoutImageDoctor";
import UpdateProfile from "./UpdateProfile";
import DoctorAccountOverview from "./DoctorAccountOverview";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import DiseaseDetailsUpdateForm from "../components/DiseaseDetailsUpdateForm";

const NAVIGATION = [
  {
    segment: "diseasedAnimalsRecord",
    title: "Disease Records",
    icon: <PetsIcon />,
    children: [
      {
        segment: "patientsList",
        title: "Patients List",
        icon: <DescriptionIcon />,
      },
      {
        segment: "location",
        title: "Patients Location",
        icon: <PinDropIcon />,
      },
    ],
  },
  {
    segment: "detectiondevice",
    title: "Detection Device",
    icon: <SpeakerPhoneIcon />,
    children: [
      {
        segment: "detectionDeviceList",
        title: "Detection Device reports",
        icon: <DescriptionIcon />,
      },
      {
        segment: "deviceOwnersinfo",
        title: "Device Users Info",
        icon: <InfoIcon />,
      },
    ],
  },
  {
    segment: "updateAboutDiseases",
    title: "Update About Diseases",
    icon: <PlaylistAddCircleIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Live stocks",
  },
  {
    segment: "analytics",
    title: "Analytics",
    icon: <BarChartIcon />,

  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Account",
  },
  {
    segment: "account",
    title: "Account Info",
    icon: <PersonIcon />,
    children: [
      {
        segment: "viewAccount",
        title: "View Account",
        icon: <PreviewIcon />,
      },
      {
        segment: "updateAccount",
        title: "Update Account",
        icon: <UpgradeIcon />,
      },
    ],
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];


function DemoPageContent({ pathname, router }) {
  const [isOpenSuggestionForm, setOpenSuggestionForm] = useState(false);
  const [animalID, setAnimalID] = useState(null);
  const [animalDetails, setAnimalDetails] = useState([]);

  const handleNavigate = (route) => {
    router.navigate(route);
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

      {pathname === "/toolpad/core/introduction" && <DoctorDashboardHomePage />}

      {pathname === "/dashboard" && <DoctorDashboardHomePage />}

      {pathname === "/diseasedAnimalsRecord/location" && (
        <>
          <Typography
            variant="h4"
            color="primary"
            style={{ fontWeight: "bold" }}
          >
            Patients Locations
          </Typography>
          <br />
          <Typography variant="subtitle-3">
            <strong>Note*:</strong> The Patients Location in Map shown only the
            patients available in your nearby location/zone. <br />
            <strong className="text-red-500">Red</strong> marker indicates yours
            (Doctor&apos;s) current location and{" "}
            <strong className="text-blue-500">Blue </strong>
            marker indicates the patients available in your nearby location.
          </Typography>
          <br />
          <DoctorMap />
        </>
      )}

      {(pathname === "/diseasedAnimalsRecord" ||
        pathname === "/diseasedAnimalsRecord/patientsList") && (
        <>
          {isOpenSuggestionForm ? (
            <SuggestionForm
              animalID={animalID}
              setOpenSuggestionForm={setOpenSuggestionForm}
              animalDetails={animalDetails}
            />
          ) : (
            <>
              <Typography
                variant="h4"
                color="primary"
                style={{ fontWeight: "bold" }}
              >
                Patients List
              </Typography>
              <br />
              <Typography variant="subtitle-3">
                <strong>Note*:</strong> The Patients list shows only the
                patients available in your nearby location/zone. <br />
                <strong className="text-green-500">Green</strong> indicates the
                issue is solved and{" "}
                <strong className="text-red-500">Red </strong>
                indicates issue not solved.
              </Typography>
              <br />
              <AnimalDataTable2
                setOpenSuggestionForm={setOpenSuggestionForm}
                setAnimalID={setAnimalID}
                setAnimalDetails={setAnimalDetails}
              />
            </>
          )}
        </>
      )}

      {(pathname === "/detectiondevice" ||
        pathname === "/detectiondevice/detectionDeviceList") && <ComingSoon />}

      {pathname === "/detectiondevice/deviceOwnersinfo" && <ComingSoon />}

      {pathname === "/updateAboutDiseases" && (
        <DiseaseDetailsUpdateForm handleNavigate={handleNavigate} />
      )}

      {pathname === "/analytics" && <ComingSoon />}

      {pathname === "/account/viewAccount" ||
        (pathname === "/account" && (
          <>
            <Typography
              variant="h4"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              User information
            </Typography>
            <br />
            <DoctorAccountOverview />
          </>
        ))}

      {pathname === "/account/updateAccount" && (
        <>
          <Typography
            variant="h4"
            color="primary"
            style={{ fontWeight: "bold" }}
          >
            Update Profile
          </Typography>
          <br />
          <Typography variant="subtitle2" className="text-slate-500 px-3">
            <strong className="text-black">Note*:</strong>The Account update
            only made changes in the login credentials .It will not affect your
            contact mail and other user informations. If you want to made any
            changes in user informations please contact administrator.{" "}
          </Typography>
          <UpdateProfile />
        </>
      )}

      {pathname === "/logout" && (
        <>
          <LogoutImageDoctor />
          <LogoutModelDoctor handleNavigate={handleNavigate} />
        </>
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const navigate = useNavigate();

  const { window } = props;

  const router = useDemoRouter("/dashboard");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <div className="bg-white">
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        window={demoWindow}
        branding={{
          logo: <Logo />,
          title: " ",
          homeUrl: "/toolpad/core/introduction",
        }}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} router={router} />
        </DashboardLayout>
      </AppProvider>
    </div>

    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
