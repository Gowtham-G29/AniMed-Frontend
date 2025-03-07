/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Logo from "../components/Logo";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import ApprovalRequestCard from "../components/ApprovalRequestCard";
import LogoutModel from "../components/LogoutModel";
import { useEffect } from "react";
import { isAuthenticated } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import ApprovalRequestBadge from "../components/ApprovalRequestBadge";
import { useState } from "react";
import ApprovalAdminHomePage from "../components/ApprovalPanelHomePage";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ApprovedRequestsCard from "../components/ApprovedRequestsCard";
import { ApproverMap } from "./ApproverMap";

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

function DemoPageContent({ pathname, setDoctorDetailsLength, router }) {
  const [refreshpanel, setRefreshPanel] = useState(false);

  useEffect(() => {
    if (refreshpanel) {
      router.navigate("/Home");
      setRefreshPanel(false);
    }
  }, [refreshpanel, router]);

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
      {/* <Typography>Dashboard content for {pathname}</Typography> */}

      {pathname === "/Home" && <ApprovalAdminHomePage />}

      {pathname === "/approvalRequest" && (
        <>
          <>
            <Typography variant="h4" fontWeight="bolder">
              Approval Requests
            </Typography>
          </>
          <ApprovalRequestCard
            setDoctorDetailsLength={setDoctorDetailsLength}
            setRefreshPanel={setRefreshPanel}
          />
        </>
      )}

      {pathname === "/approvedDoctors" && (
        <>
          <Typography variant="h4" fontWeight="bolder">
            Approved Doctors
          </Typography>
          <ApprovedRequestsCard
            setDoctorDetailsLength={setDoctorDetailsLength}
            setRefreshPanel={setRefreshPanel}
          />
        </>
      )}

      {pathname === "/approvedDoctorsLocation" && (
        <>
          <Typography variant="subtitle3" className="text-slate-400">
            <strong className="text-black">Note*:</strong>
            <strong className="text-blue-500"> Blue</strong> marker indicates
            yours current location and{" "}
            <strong className="text-red-500">Red </strong>
            marker indicates the verified Doctors location.
          </Typography>{" "}
          <ApproverMap />
        </>
      )}

      {pathname === "/logout" && <LogoutModel />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ApprovePanel(props) {
  const { window } = props;

  const router = useDemoRouter("/Home");

  const demoWindow = window !== undefined ? window() : undefined;

  const navigate = useNavigate();

  const [doctorDetailsLength, setDoctorDetailsLength] = useState();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const NAVIGATION = [
    {
      segment: "approvalRequest",
      title: "Approval Requests",
      icon: <ApprovalRequestBadge count={doctorDetailsLength} />,
    },
    {
      segment: "approvedDoctors",
      title: "Approved Doctors ",
      icon: <TaskAltIcon />,
    },
    {
      segment: "approvedDoctorsLocation",
      title: "Approved Doctors Location",
      icon: <WhereToVoteIcon />,
    },
    {
      kind: "divider",
    },
    {
      segment: "logout",
      title: "Logout",
      icon: <LogoutIcon />,
    },
  ];

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Logo />,
        title: "Approve Panel",
        homeUrl: "/Home",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent
          pathname={router.pathname}
          setDoctorDetailsLength={setDoctorDetailsLength}
          router={router}
        />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

ApprovePanel.propTypes = {
  window: PropTypes.func,
};

export default ApprovePanel;
