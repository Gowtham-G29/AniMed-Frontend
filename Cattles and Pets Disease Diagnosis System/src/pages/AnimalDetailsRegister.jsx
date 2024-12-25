import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import Home from "../assets/Home.webp";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  CircularProgress
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { animalDetailsRegister } from "../services/api";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Sample breed data based on species
const speciesBreeds = {
  Dog: ["Labrador", "Bulldog", "Beagle"],
  Cat: ["Persian", "Siamese", "Maine Coon"],
  // Add other species and breeds here
};

function AnimalDetailsRegister() {
  const navigate = useNavigate();
  const steps = [
    "Basic Details",
    "Medical History",
    "Current Complaints",
    "Other Details",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    weight: "",
    uniqueIdentificationMark: "",
    vaccinationRecords: [{ date: "", type: "" }],
    previousIllnesses: [{ name: "", details: "" }],
    surgicalHistory: [{ name: "", date: "" }],
    allergies: [""],
    currentComplaint: {
      symptoms: "",
      onsetDate: "",
      severity: "",
      behaviorChanges: "",
      dietaryChanges: "",
    },
    insurance: "",
    ownerShipDocument: "",
  });

  const [errors, setErrors] = useState({
    name: { required: false },
    species: { required: false },
    breed: { required: false },
    gender: { required: false },
    custom_error: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAddRecord = (field) => {
    setInputs({
      ...inputs,
      [field]: [
        ...inputs[field],
        field === "allergies" ? "" : { name: "", details: "" },
      ],
    });
  };

  const handleRemoveRecord = (field, index) => {
    const updatedArray = [...inputs[field]];
    updatedArray.splice(index, 1);
    setInputs({ ...inputs, [field]: updatedArray });
  };

  const handleNext = () => {
    // Skip validation and directly move to the next step
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await animalDetailsRegister(inputs);
      if (response.data.token) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar2 />
      <div
        className="bg-slate-500"
        style={{
          backgroundImage: `url(${Home})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="flex justify-center items-center min-h-screen">
          <div className="container flex justify-center items-center py-28 px-2">
            <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
              <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
                Register Animal Details
              </h2>
              <form onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <div className="mt-8">
                  {activeStep === 0 && (
                    <div>
                      <TextField
                        label="Animal Name"
                        name="name"
                        onChange={handleInput}
                        value={inputs.name}
                        fullWidth
                        variant="outlined"
                        error={errors.name.required}
                        helperText={errors.name.required && "Name is required."}
                        margin="normal"
                      />

                      <TextField
                        label="Species"
                        name="species"
                        onChange={handleInput}
                        value={inputs.species}
                        fullWidth
                        variant="outlined"
                        error={errors.species.required}
                        helperText={
                          errors.species.required && "Species is required."
                        }
                        margin="normal"
                      />

                      <TextField
                        select
                        
                        name="breed"
                        onChange={handleInput}
                        value={inputs.breed}
                        fullWidth
                        variant="outlined"
                        error={errors.breed.required}
                        helperText={
                          errors.breed.required && "Breed is required."
                        }
                        margin="normal"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="">Select Breed</option>
                        {speciesBreeds[inputs.species]?.map((breed, index) => (
                          <option key={index} value={breed}>
                            {breed}
                          </option>
                        ))}
                      </TextField>

                      <TextField
                        label="Gender"
                        name="gender"
                        onChange={handleInput}
                        value={inputs.gender}
                        fullWidth
                        variant="outlined"
                        error={errors.gender.required}
                        helperText={
                          errors.gender.required && "Gender is required."
                        }
                        margin="normal"
                      />

                      <TextField
                        label="Weight (Optional)"
                        name="weight"
                        onChange={handleInput}
                        value={inputs.weight}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />

                      <TextField
                        label="Unique Identification Mark"
                        name="uniqueIdentificationMark"
                        onChange={handleInput}
                        value={inputs.uniqueIdentificationMark}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Medical History
                      </h2>
                      <div>
                        <label className="block text-gray-700 font-semibold">
                          Vaccination Records (If any)
                        </label>
                        {inputs.vaccinationRecords.map((record, index) => (
                          <div key={index} className="flex gap-4 mb-4">
                            <TextField
                              type="date"
                              name={`vaccinationRecords.${index}.date`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedRecords = [
                                  ...inputs.vaccinationRecords,
                                ];
                                updatedRecords[index].date = value;
                                setInputs({
                                  ...inputs,
                                  vaccinationRecords: updatedRecords,
                                });
                              }}
                              value={record.date}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            />
                            <TextField
                              type="text"
                              name={`vaccinationRecords.${index}.type`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedRecords = [
                                  ...inputs.vaccinationRecords,
                                ];
                                updatedRecords[index].type = value;
                                setInputs({
                                  ...inputs,
                                  vaccinationRecords: updatedRecords,
                                });
                              }}
                              value={record.type}
                              fullWidth
                              variant="outlined"
                              placeholder="Vaccination Type"
                              margin="normal"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                handleRemoveRecord("vaccinationRecords", index)
                              }
                              color="error"
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddRecord("vaccinationRecords")}
                          color="primary"
                        >
                          Add <AddCircleOutlineIcon color="primary"/>
                          </Button>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold">
                          Previous Illnesses (If any)
                        </label>
                        {inputs.previousIllnesses.map((illness, index) => (
                          <div key={index} className="flex gap-4 mb-4">
                            <TextField
                              name={`previousIllnesses.${index}.name`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedIllnesses = [
                                  ...inputs.previousIllnesses,
                                ];
                                updatedIllnesses[index].name = value;
                                setInputs({
                                  ...inputs,
                                  previousIllnesses: updatedIllnesses,
                                });
                              }}
                              value={illness.name}
                              fullWidth
                              variant="outlined"
                              placeholder="Illness Name"
                              margin="normal"
                            />
                            <TextField
                              name={`previousIllnesses.${index}.details`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedIllnesses = [
                                  ...inputs.previousIllnesses,
                                ];
                                updatedIllnesses[index].details = value;
                                setInputs({
                                  ...inputs,
                                  previousIllnesses: updatedIllnesses,
                                });
                              }}
                              value={illness.details}
                              fullWidth
                              variant="outlined"
                              placeholder="Details"
                              margin="normal"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                handleRemoveRecord("previousIllnesses", index)
                              }
                              color="error"
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddRecord("previousIllnesses")}
                          color="primary"
                        >
                          Add <AddCircleOutlineIcon color="primary"/>
                          </Button>
                      </div>

                      {/* Surgical History */}
                      <div>
                        <label className="block text-gray-700 font-semibold">
                          Surgical History (If any)
                        </label>
                        {inputs.surgicalHistory.map((surgery, index) => (
                          <div key={index} className="flex gap-4 mb-4">
                            <TextField
                              name={`surgicalHistory.${index}.name`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedSurgeries = [
                                  ...inputs.surgicalHistory,
                                ];
                                updatedSurgeries[index].name = value;
                                setInputs({
                                  ...inputs,
                                  surgicalHistory: updatedSurgeries,
                                });
                              }}
                              value={surgery.name}
                              fullWidth
                              variant="outlined"
                              placeholder="Surgery Name"
                              margin="normal"
                            />
                            <TextField
                              name={`surgicalHistory.${index}.date`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedSurgeries = [
                                  ...inputs.surgicalHistory,
                                ];
                                updatedSurgeries[index].date = value;
                                setInputs({
                                  ...inputs,
                                  surgicalHistory: updatedSurgeries,
                                });
                              }}
                              value={surgery.date}
                              type="date"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                handleRemoveRecord("surgicalHistory", index)
                              }
                              color="error"
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddRecord("surgicalHistory")}
                          color="primary"
                        >
                          Add  <AddCircleOutlineIcon color="primary"/>
                          </Button>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold">
                          Allergies (If any)
                        </label>
                        {inputs.allergies.map((allergy, index) => (
                          <div key={index} className="flex gap-4 mb-4">
                            <TextField
                              name={`allergies.${index}`}
                              onChange={(event) => {
                                const { value } = event.target;
                                const updatedAllergies = [...inputs.allergies];
                                updatedAllergies[index] = value;
                                setInputs({
                                  ...inputs,
                                  allergies: updatedAllergies,
                                });
                              }}
                              value={allergy}
                              fullWidth
                              variant="outlined"
                              placeholder="Allergy (e.g., peanuts, medications)"
                              margin="normal"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                handleRemoveRecord("allergies", index)
                              }
                              color="error"
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => handleAddRecord("allergies")}
                          color="primary"
                        >
                          Add <AddCircleOutlineIcon color="primary"/>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Current Complaints Section */}
                  {activeStep === 2 && (
                    <div className="step-content">
                      <h2 className="text-xl font-semibold mb-4">
                        Current Complaints
                      </h2>
                      <TextField
                        type="text"
                        label="Symptoms"
                        name="currentComplaint.symptoms"
                        value={inputs.currentComplaint.symptoms}
                        onChange={(event) => {
                          const { value } = event.target;
                          setInputs({
                            ...inputs,
                            currentComplaint: {
                              ...inputs.currentComplaint,
                              symptoms: value,
                            },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        type="date"
                        name="currentComplaint.onsetDate"
                        value={inputs.currentComplaint.onsetDate}
                        onChange={(event) => {
                          const { value } = event.target;
                          setInputs({
                            ...inputs,
                            currentComplaint: {
                              ...inputs.currentComplaint,
                              onsetDate: value,
                            },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        label="Severity"
                        name="currentComplaint.severity"
                        value={inputs.currentComplaint.severity}
                        onChange={(event) => {
                          const { value } = event.target;
                          setInputs({
                            ...inputs,
                            currentComplaint: {
                              ...inputs.currentComplaint,
                              severity: value,
                            },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        label="Behavior Changes"
                        name="currentComplaint.behaviorChanges"
                        value={inputs.currentComplaint.behaviorChanges}
                        onChange={(event) => {
                          const { value } = event.target;
                          setInputs({
                            ...inputs,
                            currentComplaint: {
                              ...inputs.currentComplaint,
                              behaviorChanges: value,
                            },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        label="Dietary Changes"
                        name="currentComplaint.dietaryChanges"
                        value={inputs.currentComplaint.dietaryChanges}
                        onChange={(event) => {
                          const { value } = event.target;
                          setInputs({
                            ...inputs,
                            currentComplaint: {
                              ...inputs.currentComplaint,
                              dietaryChanges: value,
                            },
                          });
                        }}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  )}

                  {/* Other Details Section */}
                  {activeStep === 3 && (
                    <div className="step-content">
                      <TextField
                        label="Insurance (Optional)"
                        name="insurance"
                        value={inputs.insurance}
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                      <TextField
                        label="Owner Ship Document (Optional)"
                        name="ownerShipDocument"
                        value={inputs.ownerShipDocument}
                        onChange={handleInput}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1} // "Next" button is disabled at the last step
                  >
                    Next
                  </Button>

                  {activeStep === steps.length - 1 && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit} // A separate handler for submission
                    >
                      Submit
                    </Button>
                  )}
                </div>

                {loading && (
                  <div className="flex justify-center mt-8">
                    <CircularProgress/>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AnimalDetailsRegister;