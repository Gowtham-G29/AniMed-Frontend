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
import { deleteAnimal, getAnimalDetails } from "../services/api";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import Loader from "./Loader";

function Row({ row, setRerender }) {
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const handleDeleteAnimal = async (animalID) => {
    try {
      setLoading(true);
      const response = await deleteAnimal(animalID);
      setLoading(false);
      setRerender(true);

      return response;
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Tooltip title="Additional De" arrow>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name || "N/A"}
        </TableCell>
        <TableCell align="center">{row.species}</TableCell>
        <TableCell align="center">{row.breed}</TableCell>
        <TableCell align="center">{row.age || "N/A"}</TableCell>
        <TableCell align="center">{row.gender || "N/A"}</TableCell>
        <TableCell align="center">{row.weight || "N/A"}</TableCell>
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
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Typography variant="h6" gutterBottom align="center">
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
                                    <Typography variant="body2">
                                      Date:
                                    </Typography>
                                    <Typography variant="body2">
                                      {new Date(
                                        record.date
                                      ).toLocaleDateString() || "N/A"}
                                    </Typography>
                                  </div>

                                  <div className="flex w-1/2 items-center space-x-2">
                                    <Typography variant="body2">
                                      Type:
                                    </Typography>
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
                                    <Typography variant="body2">
                                      Name:
                                    </Typography>
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
                                <Typography variant="body2">
                                  Duration:
                                </Typography>
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
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            <div className="flex justify-center m-5">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteAnimal(row._id)}
              >
                Delete
              </Button>
            </div>
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

export default function AnimalDataTable() {
  const [data, setData] = useState([]);
  const [reRender, setRerender] = useState(false);

  const handleAnimalDetails = async () => {
    try {
      const response = await getAnimalDetails();
      setData(response.data.data);
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
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="center">Species</TableCell>
            <TableCell align="center">Breed</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <Row key={index} row={row} setRerender={setRerender} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
