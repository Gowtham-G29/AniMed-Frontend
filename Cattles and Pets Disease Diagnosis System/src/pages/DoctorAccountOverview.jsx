/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";
import { getVetDoctorDetails } from "../services/api";

const DoctorAccountOverview = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getVetDoctorDetails();
        console.log("Hello", userData.data.doctorInformations);
        setUserData(userData.data.doctorInformations);
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

  const items = userData
    ? [
        {
          label: "User ID",
          value: "vet" + userData.userID.substring(1, 9) || "N/A",
        },
        { label: "Name", value: userData.fullName },
        {
          label: "Specialization",
          value: userData.specialization || "N/A",
        },
        {
          label: "Licence No",
          value: userData.licenseNumber || "N/A",
        },
        {
          label: "Email",
          value: userData.email || "N/A",
        },
        {
          label: "Phone",
          value: userData.phoneNumber || "N/A",
        },

        {
          label: "Clinic Name",
          value: userData.clinicName || "N/A",
        },
        { label: "Clinic Address", value: userData.clinicAddress || "N/A" },
        {
          label: "District",
          value: userData.district || "N/A",
        },
        { label: "State", value: userData.state || "N/A" },
        { label: "Country", value: userData.country || "N/A" },
      ]
    : [];

  return (
    <>
      <Typography variant="subtitle2" className="text-slate-500">
        <strong className="text-black">Note*:</strong>You cannot able to change
        this details once after registeration. If you want to made changes in
        this belowed informations please contact the administrator.
        <br />
        The belowed mentioned email id is not your login credentials.This email
        and phone number are used only for patients contact purpose.
      </Typography>
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
              src="https://i.pinimg.com/236x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
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
              {index < items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
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

export default DoctorAccountOverview;
