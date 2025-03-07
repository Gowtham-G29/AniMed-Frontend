/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect, useRef } from "react";
import ApprovalConfirmModal from "./ApprovalConfirmModal";
import { Tooltip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

export default function ApprovalRequiredDetailsModal({
  modalOpen,
  setModalOpen,
  doctorDetails,
  setRefreshPanel,
}) {
  const modalRef = useRef(null);

  const [approveConfirmModalOpen, setApproveConfirmModalOpen] = useState(false);

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
              className="btn bg-red-600 text-slate-200"
              onClick={() => setModalOpen(false)}
            >
              Decline
            </button>
            <button
              className="btn bg-green-600 text-slate-200"
              onClick={() => setApproveConfirmModalOpen(true)}
            >
              Approve
            </button>
          </div>
        </div>
      </dialog>
      {approveConfirmModalOpen && (
        <ApprovalConfirmModal
          approveConfirmModalOpen={approveConfirmModalOpen}
          setApproveConfirmModalOpen={setApproveConfirmModalOpen}
          doctorDetails={doctorDetails}
          setRefreshPanel={setRefreshPanel}
        />
      )}
    </>
  );
}
