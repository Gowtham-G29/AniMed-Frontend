/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { approveDoctors } from "../services/api";
import Loader from "./Loader";
import { Typography } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ApprovedDoctorsDetailsModal from "./ApprovedDoctorsDetailsModal";

function ApprovedRequestsCard({ setDoctorDetailsLength}) {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [doctorStatus, setDoctorStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); //  Store selected doctor

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        setLoading(true);
        const response = await approveDoctors();
        setDoctorDetails(response.data.doctorDetails);
        setDoctorStatus(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    getDoctorDetails();
  }, []);

  //  Filtering doctors based on status
  const filteredDoctors = doctorDetails.filter((doctor) =>
    doctorStatus.some(
      (status) => status._id === doctor.userID && status.activate === true
    )
  );

  //  Update the doctor count
  useEffect(() => {
    setDoctorDetailsLength(filteredDoctors.length);
  }, [filteredDoctors, setDoctorDetailsLength]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredDoctors.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="card w-96 shadow-sm bg-slate-100 m-6"
                >
                  <div className="card-body">
                    <span className="badge badge-xs badge-warning">
                      {doctor.experience} years Experience <VerifiedUserIcon color="success"/>
                    </span>
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">{doctor.fullName}</h2>
                      <span className="text-lg text-slate-500">
                        {doctor.specialization}
                      </span>
                    </div>
                    <div className="mt-6">
                      <button
                        className="btn bg-green-400 btn-block"
                        onClick={() => {
                          setSelectedDoctor(doctor); // Set selected doctor
                          setModalOpen(true);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Typography
              variant="subtitle2"
              className="text-center text-gray-500 p-6"
            >
              No Verified doctors Found !.
            </Typography>
          )}
        </>
      )}

      {/*  Show the modal with selected doctor details */}
      {modalOpen && selectedDoctor && (
        <ApprovedDoctorsDetailsModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          doctorDetails={selectedDoctor} //  Pass only selected doctor
        />
      )}
    </div>
  );
}

export default ApprovedRequestsCard;
