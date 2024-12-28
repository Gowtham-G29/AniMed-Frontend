/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { logout } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function LogoutModel({ handleNavigate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(true);
    return () => setIsModalOpen(false);
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      localStorage.removeItem("jwt");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during logout:", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleNavigate("/Home");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="flex justify-center items-center" // Tailwind for centering
      >
        <Box
          sx={{
            width: "400px",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="text-gray-800 dark:text-white"
          >
            Confirmation
          </Typography>
          <Typography
            id="modal-description"
            variant="body1"
            className="mt-2 text-gray-600 dark:text-neutral-400"
          >
            <Divider />
            Are you sure want to Logout?
          </Typography>

          <div className="flex gap-x-2 mt-4">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              className="text-gray-800 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              className=" text-white hover:bg-red-300"
            >
              Logout
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default LogoutModel;
