import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Logo from "../components/Logo";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import ApprovalRequestCard from "../components/ApprovalRequestCard";

const NAVIGATION = [
  {
    segment: "approvalRequest",
    title: "Approval Requests",
    icon: <HowToRegIcon />,
  },
  {
    segment: "approvedLocation",
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

function DemoPageContent({ pathname }) {
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
      {pathname==='/approvalRequest'&&<><><Typography variant="h4" fontWeight="bolder" >Approvals Requests</Typography>
      </><ApprovalRequestCard /></>}
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
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

ApprovePanel.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ApprovePanel;
