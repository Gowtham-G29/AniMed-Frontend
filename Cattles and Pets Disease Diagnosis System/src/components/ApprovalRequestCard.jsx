import { useEffect, useState } from "react";
import { approveDoctors } from "../services/api";
import Loader from "./Loader";
import { Typography } from "@mui/material";

function ApprovalRequestCard() {
  const [doctorDetails, setDoctorDetails] = useState([]); // Should be an array, not an object
  const [doctorStatus, setDoctorStatus] = useState([]); // Should be an array, not an object
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        setLoading(true);
        const response = await approveDoctors();
        setDoctorDetails(response.data.doctorDetails);
        setDoctorStatus(response.data.doctors);
        setLoading(false);
        console.log(response);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {doctorDetails.length === 0 ? ( // ✅ Case 1: No doctor details at all
            <Typography
              variant="subtitle2"
              className="text-center text-gray-500 p-6"
            >
              No Requests Found for Approvals
            </Typography>
          ) : (
            (() => {
              const filteredDoctors = doctorDetails.filter((doctor) =>
                doctorStatus.some(
                  (status) =>
                    status._id === doctor.userID && status.activate === false
                )
              );

              return filteredDoctors.length > 0 ? ( // ✅ Case 2: Filtered list is not empty
                <div className="flex flex-wrap justify-center">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="card w-96 bg-base-100 shadow-sm bg-slate-300 m-6"
                    >
                      <div className="card-body">
                        <span className="badge badge-xs badge-warning">
                          {doctor.experience} years Experience
                        </span>
                        <div className="flex justify-between">
                          <h2 className="text-xl font-bold">
                            {doctor.fullName}
                          </h2>
                          <span className="text-lg text-slate-500">
                            {doctor.specialization}
                          </span>
                        </div>
                        <div className="mt-6">
                          <button className="btn btn-primary btn-block">
                            Verify & Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // ✅ Case 3: No doctors with `status.activate === false`
                <Typography
                  variant="subtitle2"
                  className="text-center text-gray-500 p-6"
                >
                  No Requests Found for Approvals
                </Typography>
              );
            })()
          )}
        </>
      )}
    </div>
  );
}

export default ApprovalRequestCard;
