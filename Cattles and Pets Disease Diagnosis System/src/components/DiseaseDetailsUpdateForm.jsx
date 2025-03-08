/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import DiseaseDropDownSearchBox from "./DiseaseDropdownSearchBox";
import { updateDiseaseInformation } from "../services/api";
import LoaderMini from "./LoaderMini";
import DiseaseInfoUpdateFailSnackBar from "./DiseaseInfoUpdateFailSnackBar";
import DiseaseInfoUpdateSuccessSnackBar from "./DiseaseInfoUpdateSuccessSnackBar";

const DiseaseDetailsUpdateForm = ({ handleNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [updateFail, setUpdateFail] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    diseaseName: "",
    scientificName: "",
    speciesAffected: "",
    zoonoticPotential: "",
    causativeAgent: "",
    transmission: "",
    predisposingFactors: "",
    symptoms: "",
    behaviorChanges: "",
    duration: "",
    diagnosisMethods: "",
    preventionStrategies: "",
    firstAid: "",
    medications: "",
    monitoring: "",
  });

  //method to enable the button when all the fields are fillled completely
  const isFormComplete = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateDiseaseInformation(formData);
      console.log("hello",response)

      if (response.status === 201) {
        setUpdateSuccess(true);
        setLoading(false);
        setUpdateFail(false);

        setTimeout(() => {
          handleNavigate("/dashboard");
        }, 3000);

        return;
      }

      if (response.response.data.message === "Try for another disease") {
        setLoading(false);
        setUpdateFail(true);
        setOpenSnackbar(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg">
      <Typography variant="subtitle2" className="text-slate-400 my-3">
        <strong className="text-black">Note*:</strong>This details will be
        consumed by users. So kindly give the correct informations about
        diseases.
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        className="text-center mb-10 font-semibold text-blue-500"
      >
        Disease Information Updation Form
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}

        <Typography variant="h6" fontWeight="bold">
          General Information
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DiseaseDropDownSearchBox
            label="Disease Name"
            name="diseaseName"
            formData={formData}
            setFormData={setFormData}
          />
          <TextField
            label="Scientific Name"
            name="scientificName"
            fullWidth
            required
            onChange={handleChange}
          />

          <TextField
            label="Species Affected"
            name="speciesAffected"
            fullWidth
            required
            onChange={handleChange}
          ></TextField>

          <TextField
            select
            required
            label="Zoonotic Potential"
            name="zoonoticPotential"
            fullWidth
            onChange={handleChange}
          >
            {["Yes", "No"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Causes & Risk Factors */}
        <Typography variant="h6" fontWeight="bold">
          Causes & Risk Factors
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Causative Agent"
            name="causativeAgent"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Mode of Transmission"
            name="transmission"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Predisposing Factors"
            name="predisposingFactors"
            fullWidth
            required
            onChange={handleChange}
          />
        </div>

        {/* Symptoms & Early Signs */}
        <Typography variant="h6" fontWeight="bold">
          Symptoms & Early Signs
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Symptoms & Early Signs"
            name="symptoms"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Behavioral Changes"
            name="behaviorChanges"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Duration of Symptoms"
            name="duration"
            fullWidth
            required
            onChange={handleChange}
          />
        </div>

        {/* Diagnosis Methods */}
        <Typography variant="h6" fontWeight="bold">
          Diagnosis Methods
        </Typography>
        <TextField
          label="Diagnosis Methods"
          name="diagnosisMethods"
          fullWidth
          required
          onChange={handleChange}
        />

        {/* Prevention Strategies */}
        <Typography variant="h6" fontWeight="bold">
          Prevention Strategies
        </Typography>
        <TextField
          label="Prevention Strategies"
          name="preventionStrategies"
          fullWidth
          required
          onChange={handleChange}
        />

        {/* Initial First Aid & Emergency Care */}
        <Typography variant="h6" fontWeight="bold">
          Initial First Aid & Emergency Care
        </Typography>
        <TextField
          label="First Aid Measures"
          name="firstAid"
          fullWidth
          required
          onChange={handleChange}
        />

        {/* Medications & Treatment Options */}
        <Typography variant="h6" fontWeight="bold">
          Medications & Treatment Options
        </Typography>
        <TextField
          label="Medications & Treatment"
          name="medications"
          fullWidth
          required
          onChange={handleChange}
        />

        {/* Monitoring & Recovery */}
        <Typography variant="h6" fontWeight="bold">
          Monitoring & Recovery
        </Typography>
        <TextField
          label="Monitoring & Recovery"
          name="monitoring"
          fullWidth
          required
          onChange={handleChange}
        />

        {loading ? (
          <LoaderMini />
        ) : (
          <div className="flex flex-col gap-3">
            <Typography variant="subtitle3" color="error">All the fields are mandatory.</Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full md:w-auto"
              disabled={!isFormComplete || loading}
            >
              Update Information
            </Button>
          </div>
        )}
      </form>
      {updateFail && (
        <DiseaseInfoUpdateFailSnackBar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        />
      )}
      {updateSuccess && (
        <DiseaseInfoUpdateSuccessSnackBar
          open={updateSuccess}
          onClose={() => setUpdateSuccess(false)}
        />
      )}
    </div>
  );
};

export default DiseaseDetailsUpdateForm;
