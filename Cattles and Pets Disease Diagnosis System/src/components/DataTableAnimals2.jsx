/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getAnimalOwnerContacts, getNearbyAnimals } from "../services/api";
import { useEffect, useState } from "react";
import { Button, Divider, Tooltip } from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

function Row({ row, setAnimalID, setOpenSuggestionForm, setAnimalDetails }) {
  const [open, setOpen] = React.useState(false);

  const [ownerContactsDetails, setOwnerContactsDetails] = useState({});

  // const [loading, setLoading] = useState(false);

  const handleForm = (animalid, species, breed) => {
    setAnimalID(animalid);
    setAnimalDetails([species, breed]);
  };

  const handleAnimalOwnerContacts = async (animalid) => {
    try {
      const response = await getAnimalOwnerContacts(animalid);

      const { Name, contactNumber, contactEmail } = response.data.ownerContact;

      setOwnerContactsDetails({
        Name,
        contactNumber,
        contactEmail,
      });
    } catch (error) {
      console.log("Error fetching owner contacts:", error);
    }
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor:
            row.doctorSuggestions.suggestedBy !== "Unsolved"
              ? "lightgreen"
              : "#FF6961",
        }}
      >
        <TableCell>
          <Tooltip title="" arrow>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
                handleAnimalOwnerContacts(row._id);
              }}
            >
              {open ? <Tooltip title="close"><KeyboardArrowUpIcon /> </Tooltip>:<Tooltip title="open"><KeyboardArrowDownIcon /></Tooltip> }
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="center">{row.species}</TableCell>
        <TableCell align="center">{row.breed}</TableCell>
        <TableCell align="center">{row.gender || "N/A"}</TableCell>
        <TableCell align="center">
          <strong>
            {row.doctorSuggestions.suggestedBy !== "Unsolved" ? (
              <>
                Solved by <br />
                {row.doctorSuggestions.suggestedBy}{" "}
                <CheckCircleOutlineIcon color="success" />
              </>
            ) : (
              row.doctorSuggestions.suggestedBy || "N/A"
            )}
          </strong>
        </TableCell>
        <TableCell align="center">
          {row.animalOwnerViewedStatus ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </TableCell>
        <TableCell align="center">
          {row.curedStatus ? (
            <DoneOutlineIcon />
          ) : (
            <HelpOutlineIcon fontSize="medium" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
              }}
            >
              <>
                <Typography variant="h6" gutterBottom align="center" color="primary" fontWeight="bolder">
                  Additional Details
                </Typography>

                <Box
                  sx={{
                    margin: 2,
                    padding: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="div"
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Basice informations */}
                    <Box>
                      <Typography variant="body2" gutterBottom >
                        <strong>Basic informations (patient)</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">Name:</Typography>
                          <Typography variant="body2">
                            {row.name || "N/A"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            Age (if known):
                          </Typography>
                          <Typography variant="body2">
                            {row.age || "N/A"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            weight (if Known):
                          </Typography>
                          <Typography variant="body2">
                            {row.weight || "N/A"}
                          </Typography>
                        </Box>
                       
                      </Box>
                    </Box>

                    <Divider />

                    {/* Unique Identification Mark */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Unique Identification Mark:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {row.uniqueIdentificationMark || "N/A"}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Current Complaints */}
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Current Complaints</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">Symptoms:</Typography>
                          <Typography variant="body2">
                            {row.currentComplaint?.symptoms?.length > 0 ? (
                              <ul>
                                {row.currentComplaint.symptoms.map(
                                  (symptom, idx) => (
                                    <li key={idx}>{symptom}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              "None"
                            )}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">Severity:</Typography>
                          <Typography variant="body2">
                            {row.currentComplaint?.severity || "N/A"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            Behavior Changes:
                          </Typography>
                          <Typography variant="body2">
                            {row.currentComplaint?.behaviorChanges || "N/A"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            Dietary Changes:
                          </Typography>
                          <Typography variant="body2">
                            {row.currentComplaint?.dietaryChanges || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider />

                    {/* Vaccination Records */}
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Vaccination Records</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        {row.vaccinationRecords?.length > 0 ? (
                          row.vaccinationRecords.map((record, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1, // Reduced vertical spacing between rows
                              }}
                            >
                              <div className="flex mb-2 gap-x-4">
                                <div className="flex w-1/2 items-center space-x-2">
                                  <Typography variant="body2">Date:</Typography>
                                  <Typography variant="body2">
                                    {new Date(
                                      record.date
                                    ).toLocaleDateString() || "N/A"}
                                  </Typography>
                                </div>

                                <div className="flex w-1/2 items-center space-x-2">
                                  <Typography variant="body2">Type:</Typography>
                                  <Typography variant="body2">
                                    {record.type || "N/A"}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2">None</Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider />

                    {/* Previous Illnesses */}
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Previous Illnesses</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        {row.previousIllnesses?.length > 0 ? (
                          row.previousIllnesses.map((illness, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <div className="flex mb-2 gap-x-4">
                                <div className="flex w-1/2 items-center space-x-2">
                                  <Typography variant="body2">Name:</Typography>
                                  <Typography variant="body2">
                                    {illness.name || "N/A"}
                                  </Typography>
                                </div>

                                <div className="flex w-1/2 items-center space-x-2">
                                  <Typography variant="body2">
                                    Details:
                                  </Typography>
                                  <Typography variant="body2">
                                    {illness.details || "N/A"}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2">None</Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider />

                    {/* Medication History */}
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Medication History</strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        {row.medicationHistory?.length > 0 ? (
                          row.medicationHistory.map((medication, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="body2">Name:</Typography>
                              <Typography variant="body2">
                                {medication.name || "N/A"}
                              </Typography>
                              <Typography variant="body2">Duration:</Typography>
                              <Typography variant="body2">
                                {medication.duration || "N/A"}
                              </Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2">None</Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider />

                    {/* Allergies */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Allergies:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {row.allergies?.length > 0
                          ? row.allergies.join(", ")
                          : "None"}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Insurance and Ownership */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Insurance No.:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {row.insurance || "N/A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Ownership Document No.:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {row.ownerShipDocument || "N/A"}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Registration Date */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Animal Registered At:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {new Date(row.createdAt).toLocaleString() || "N/A"}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Owner Contact */}
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Owner Contacts: </strong>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          marginLeft: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">Name:</Typography>
                          <Typography variant="body2">
                            {ownerContactsDetails.Name || "N/A"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            Contact Number:
                          </Typography>
                          <Typography variant="body2">
                            {ownerContactsDetails.contactNumber || "N/A"}{" "}
                            <a
                              href={`tel:${ownerContactsDetails.contactNumber}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Tooltip title="Click here to Call">
                                <CallIcon color="success" fontSize="large" />
                              </Tooltip>
                            </a>
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">Email ID:</Typography>
                          <Typography variant="body2">
                            {ownerContactsDetails.contactEmail || "N/A"}
                            {"  "}
                            <a
                              href={`mailto:${ownerContactsDetails.contactEmail}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Tooltip title="Click here to mail">
                                <EmailIcon color="primary" fontSize="large" />
                              </Tooltip>
                            </a>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            </Box>
            {row.doctorSuggestions.suggestedBy == "Unsolved" ? (
              <div className="flex justify-center m-5">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleForm(row._id, row.species, row.breed);
                    setOpenSuggestionForm(true);
                  }}
                >
                  Consult
                </Button>
              </div>
            ) : (
              <div className="flex justify-center m-5">
                  <Button disabled variant="contained" color="primary">
                    Already Consulted ✅
                  </Button>
              </div>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    species: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.string,
    gender: PropTypes.string,
    weight: PropTypes.string,
    uniqueIdentificationMark: PropTypes.string,
    geolocation: PropTypes.shape({
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
    }),
    vaccinationRecords: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    previousIllnesses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        details: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default function AnimalDataTable({
  setAnimalID,
  setOpenSuggestionForm,
  setAnimalDetails,
}) {
  const [data, setData] = useState([]);
  const [reRender, setRerender] = useState(false);

  const handleAnimalDetails = async () => {
    try {
      const response = await getNearbyAnimals();
      setData(response.data.animals);
    } catch (error) {
      console.error("Error fetching animal details:", error);
    }
  };

  useEffect(() => {
    handleAnimalDetails();
  }, [reRender]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="bg-slate-500">
          <TableRow>
            <TableCell />
            <TableCell align="center">Species</TableCell>
            <TableCell align="center">Breed</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">
              Solved Status{" "}
              <FiberManualRecordIcon
                fontSize="small"
                className="text-green-500"
              />
            </TableCell>

            <TableCell align="center">
              Suggestions <br /> viewed Status
            </TableCell>
            <TableCell align="center">Cured Status</TableCell>
          </TableRow>
        </TableHead>
        {data.length == 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <div className="flex justify-center items-center ml-10 text-lg font-semibold text-gray-500 h-80 ">
                  No records found in your zone.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data.map((row, index) => (
              <Row
                key={index}
                row={row}
                setRerender={setRerender}
                setAnimalID={setAnimalID}
                setOpenSuggestionForm={setOpenSuggestionForm}
                setAnimalDetails={setAnimalDetails}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
