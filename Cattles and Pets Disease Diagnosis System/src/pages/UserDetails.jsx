/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";
import { getAnimalOwnerDetails } from "../services/api";

const UserAccountOverview = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <Loader />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const items = userData?.data?.AnimalOwner
    ? [
        { label: "User ID", value: userData.data.AnimalOwner.userID || "N/A" },
        { label: "Name", value: userData.data.AnimalOwner.Name },
        {
          label: "Email",
          value: userData.data.AnimalOwner.contactEmail || "N/A",
        },
        {
          label: "Phone",
          value: userData.data.AnimalOwner.contactNumber || "N/A",
        },
        {
          label: "Telephone",
          value: userData.data.AnimalOwner.telephoneNumber || "N/A",
        },
        { label: "Address", value: userData.data.AnimalOwner.Address || "N/A" },
        {
          label: "District",
          value: userData.data.AnimalOwner.district || "N/A",
        },
        { label: "State", value: userData.data.AnimalOwner.state || "N/A" },
        { label: "Country", value: userData.data.AnimalOwner.country || "N/A" },
      ]
    : [];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="90vw"
        height="90vh"
        maxWidth="1200px"
        maxHeight="800px"
        bgcolor="white"
        p={3}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile Picture"
            sx={{
              width: 150,
              height: 150,
              border: "3px solid #e0e0e0",
            }}
          />
        </Box>

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

const DataListItem = ({ label, value }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
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
