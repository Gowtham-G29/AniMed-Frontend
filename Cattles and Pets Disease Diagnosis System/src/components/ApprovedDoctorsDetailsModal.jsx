/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { Tooltip } from "@mui/material";

export default function ApprovedDoctorsDetailsModal({
  modalOpen,
  setModalOpen,
  doctorDetails,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalOpen]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && event.target === modalRef.current) {
      setModalOpen(false);
    }
  };

  return (
    <>
      {" "}
      <dialog ref={modalRef} className="modal" onClick={handleOutsideClick}>
        <div className="modal-box w-11/12 max-w-5xl overflow-auto ">
          <h3 className="font-bold text-2xl mb-4 text-center text-blue-600">
            Details
          </h3>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <p className="py-2">
              <strong>Name:</strong>
            </p>
            <p className="py-2">{doctorDetails.fullName}</p>

            <p className="py-2">
              <strong>Specialization:</strong>
            </p>
            <p className="py-2">{doctorDetails.specialization}</p>

            <p className="py-2">
              <strong>License No:</strong>
            </p>
            <p className="py-2">{doctorDetails.licenseNumber}</p>

            <p className="py-2">
              <strong>Mobile No:</strong>
            </p>
            <p className="py-2">
              {doctorDetails.phoneNumber}{" "}
              <a
                href={`tel:${doctorDetails.phoneNumber}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Tooltip title="Click here to Call">
                  <CallIcon color="success" fontSize="large" />
                </Tooltip>
              </a>
            </p>

            <p className="py-2">
              <strong>Email:</strong>
            </p>
            <p className="py-2">
              {doctorDetails.email}
              {"  "}
              <a
                href={`mailto:${doctorDetails.email}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Tooltip title="Click here to mail">
                  <EmailIcon color="primary" fontSize="large" />
                </Tooltip>
              </a>
            </p>

            <p className="py-2">
              <strong>Clinic Name:</strong>
            </p>
            <p className="py-2">{doctorDetails.clinicName}</p>

            <p className="py-2">
              <strong>Clinic Address:</strong>
            </p>
            <p className="py-2">{doctorDetails.clinicAddress}</p>

            <p className="py-2">
              <strong>Residential Address:</strong>
            </p>
            <p className="py-2">
              {doctorDetails.district}, {doctorDetails.state},{" "}
              {doctorDetails.country} - {doctorDetails.pincode}
            </p>

            <p className="py-2">
              <strong>Application Reg Date:</strong>
            </p>
            <p className="py-2">
              {new Date(doctorDetails.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="modal-action flex justify-center mt-4">
            <button
              className="btn bg-blue-500 text-slate-200"
              onClick={() => setModalOpen(false)}
            >
              <ArrowBackIcon /> Go Back
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
