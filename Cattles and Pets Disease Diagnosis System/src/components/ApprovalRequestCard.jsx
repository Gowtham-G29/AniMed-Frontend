/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { approveDoctors } from "../services/api";
import Loader from "./Loader";
import { Typography } from "@mui/material";
import ApprovalRequiredDetailsModal from "./ApprovalRequiredDetailsModal";
import ReportIcon from '@mui/icons-material/Report';

function ApprovalRequestCard({ setDoctorDetailsLength,setRefreshPanel }) {
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
      (status) => status._id === doctor.userID && status.activate === false
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
                  className="card w-96 shadow-sm bg-slate-300 m-6"
                >
                  <div className="card-body">
                    <span className="badge badge-xs badge-warning">
                      {doctor.experience} years Experience <ReportIcon color="error"/>
                    </span>
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">{doctor.fullName}</h2>
                      <span className="text-lg text-slate-500">
                        {doctor.specialization}
                      </span>
                    </div>
                    <div className="mt-6">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => {
                          setSelectedDoctor(doctor); // Set selected doctor
                          setModalOpen(true);
                        }}
                      >
                        Verify & Approve
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
              No Requests Found for Approvals
            </Typography>
          )}
        </>
      )}

      {/*  Show the modal with selected doctor details */}
      {modalOpen && selectedDoctor && (
        <ApprovalRequiredDetailsModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          doctorDetails={selectedDoctor} //  Pass only selected doctor
          setRefreshPanel={setRefreshPanel}
        />
      )}
    </div>
  );
}

export default ApprovalRequestCard;
