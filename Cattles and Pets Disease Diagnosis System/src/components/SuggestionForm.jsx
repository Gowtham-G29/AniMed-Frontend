/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Button, Box, Card, CardContent } from "@mui/material";
import { getDoctorDetails, updateDoctorSuggestions } from "../services/api";
import Loader from "./Loader";
import { useEffect } from "react";


const SuggestionForm = ({ animalID, setOpenSuggestionForm, animalDetails }) => {
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [doctorName, setDoctorName] = useState({ fullName: "", specialization: "" });
    const [formData, setFormData] = useState({
      animalID: animalID,
      medicine: "",
      preventionMethods: "",
      remarks: "",
      suggestedBy: "",
      doctorSuggestedStatus: true,
    });
  
    useEffect(() => {
      const fetchDoctorInfo = async () => {
        try {
          setLoading(true);
          const response = await getDoctorDetails();
          const { fullName, specialization } = response.data.doctor;
          setDoctorName({ fullName, specialization });
            setFormData((prev) => ({
            ...prev,
            suggestedBy: `Dr. ${fullName} (${specialization})`,
          }));
  
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching doctor details:", error);
        }
      };
  
      fetchDoctorInfo();
    }, []); 


  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleClose = () => {
      setOpenSuggestionForm(false);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await updateDoctorSuggestions(formData);
        console.log("Update Successful:", response);
        setLoading(false);
        handleClose();
      } catch (error) {
        setLoading(false);
        console.error("Update Failed:", error);
      }
    };

  return (
    <Box className="flex justify-center items-center h-screen w-screen">
      {loading ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20">
          <CardContent>
            <div className="text-slate-800 text-3xl font-bold mb-6">
              🩺📃Consult
            </div>
            <div className="text-sm mb-5 text-slate-500">
              <span className="mr-3">
                {" "}
                <strong>Species: </strong>
                {animalDetails[0]}
                {"  "}
              </span>
              <span>
                {" "}
                <strong>Breed: </strong>
                {animalDetails[1]}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                label="Medicine"
                name="medicine"
                value={formData.medicine}
                onChange={handleChange}
                className="rounded-lg bg-white/20 text-white placeholder-white"
                required
                fullWidth
              />
              <TextField
                label="Prevention Methods"
                name="preventionMethods"
                value={formData.preventionMethods}
                onChange={handleChange}
                className="rounded-lg bg-white/20 text-white placeholder-white"
                required
                fullWidth
              />
              <TextField
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="rounded-lg bg-white/20 text-white placeholder-white"
                required
                fullWidth
              />

              <div className="text-slate-500 text-md">
                <strong>Note*:</strong> Once give suggestion you cannot be
                modified.
              </div>

              <Button
                type="submit"
                variant="contained"
                className="bg-white/20 text-white hover:bg-green-400 rounded-lg py-3 transition-all font-semibold"
              >
                Submit
              </Button>

              <Button
                onClick={handleClose}
                color="error"
                variant="contained"
                className=" text-white hover:bg-red-400 rounded-lg py-3 transition-all font-semibold"
              >
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SuggestionForm;
