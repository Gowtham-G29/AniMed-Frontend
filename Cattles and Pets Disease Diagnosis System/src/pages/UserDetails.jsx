import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";
import { getAnimalOwnerDetails } from "../services/api";

const UserAccountOverview = () => {
  const [userData, setUserData] = useState(""); // Store user data
  const [loading, setLoading] = useState(true); // Track loading status
  const [error, setError] = useState(null); // Store errors if any

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getAnimalOwnerDetails();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
        <Loader/>
    )
  }
  if (error) {
    return (
        <ErrorPage/>
    )
  }

  // Assuming userData is structured like: { data: { AnimalOwner: { Name, LastName, ... } } }
  const items = userData?.data?.AnimalOwner ? [
    { label: "User ID", value: userData.data.AnimalOwner.userID || "N/A" },
    { label: "Name", value: userData.data.AnimalOwner.Name },
    { label: "Email", value: userData.data.AnimalOwner.contactEmail || "N/A" },
    { label: "Phone", value: userData.data.AnimalOwner.contactNumber || "N/A" },
    { label: "Telephone", value: userData.data.AnimalOwner.telephoneNumber || "N/A" },
    { label: "Address", value: userData.data.AnimalOwner.Address || "N/A" },
    { label: "Account Holder Status", value: userData.data.AnimalOwner.role || "N/A" },

    
  ] : [];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      overflow="hidden"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="90vw" // Full width with some margin
        height="90vh" // Full height with some margin
        maxWidth="1200px" // Max width for larger screens
        maxHeight="800px" // Max height for larger screens
        overflow="hidden"
        bgcolor="white" // Card background color
        p={3}
      >
        {/* Profile Image */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile Picture"
            sx={{
              width: 150, // Larger avatar size
              height: 150,
              border: "3px solid #e0e0e0",
            }}
          />
        </Box>

        {/* User Details */}
        {items.map((item, index) => (
          <React.Fragment key={item.value}>
            <DataListItem label={item.label} value={item.value} />
            {index < items.length - 1 && <Divider />} {/* Horizontal divider */}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

// Component to display label and value pairs
const DataListItem = ({ label, value }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between" // Align label and value on opposite ends
      alignItems="center"
      p={2}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
};

export default UserAccountOverview;
