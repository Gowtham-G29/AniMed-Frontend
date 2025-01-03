import { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

import DeactivateModel from "../components/DeactivateModel";
import {
  logout,
  updateCurrentUserPassword,
  updateProfile,
} from "../services/api";
import LoaderMini from "../components/LoaderMini";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) setPhoto(file);
  };

  const handleLogout = async () => {
    try {
      setloading(true);
      await logout();
      localStorage.removeItem("jwt");
      navigate("/");
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error during logout:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      setloading(true);
      const response = await updateProfile(formData);
      await handleLogout();
      setloading(false);

      console.log(response);
    } catch (error) {
      setloading(false);
      console.error("Error updating profile", error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      setloading(true);
      await updateCurrentUserPassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      await handleLogout();
      setloading(false);
    } catch (error) {
      setloading(false);
      return error;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      {loading ? (
        <LoaderMini />
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "8px",
          }}
        >
          
          <Box
            sx={{
              width: "100%",
              lg: "50%",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", mb: 3 }}>
              <img
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : "/src/assets/default-profile.jpeg"
                }
                alt="User photo"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "100%", mt: 3, fontWeight: "bold" }}
              onClick={() => setDeactivateModalOpen(true)}
            >
              Deactivate Or Delete Account
            </Button>
          </Box>

          <Box sx={{ width: "100%", lg: "50%", p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
              Update Profile
            </Typography>
            <form onSubmit={handleUpdateProfile}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
                size="small"
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
                size="small"
              />
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Uploaded Preview"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <>
                      <span>Click to upload photo</span>
                      <span>JPEG only</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mb: 6, fontWeight: "bold" }}
              >
                Save Profile
              </Button>
            </form>
          </Box>

          <Box sx={{ width: "100%", lg: "50%", p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordUpdate}>
              <TextField
                label="Current password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                required
                placeholder="••••••••"
                sx={{ mb: 3 }}
                size="small"
              />
              <TextField
                label="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                required
                placeholder="••••••••"
                sx={{ mb: 3 }}
                size="small"
              />
              <TextField
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
                placeholder="••••••••"
                sx={{ mb: 3 }}
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mb: 6, fontWeight: "bold" }}
              >
                Save Password
              </Button>
            </form>
          </Box>
        </Paper>
      )}

      {isDeactivateModalOpen && (
        <DeactivateModel setDeactivateModalOpen={setDeactivateModalOpen} />
      )}
    </Box>
  );
}

export default UpdateProfile;
