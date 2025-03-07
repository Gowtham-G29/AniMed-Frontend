/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { activateDoctor } from "../services/api";
import LoaderMini from "./LoaderMini";

export default function ApprovalConfirmModal({
  approveConfirmModalOpen,
  setApproveConfirmModalOpen,
  doctorDetails,
  setRefreshPanel,
}) {
  const modalRef = useRef(null);
  const [input, setInput] = useState({ confirmationString: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (approveConfirmModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [approveConfirmModalOpen]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && event.target === modalRef.current) {
      setApproveConfirmModalOpen(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.confirmationString.toUpperCase() !== "APPROVE") {
      alert("Please type 'APPROVE' correctly to confirm.");
      return;
    }

    try {
      setLoading(true);
      await activateDoctor(doctorDetails.userID);

      setLoading(false);
      setRefreshPanel(true);
      setApproveConfirmModalOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <dialog ref={modalRef} className="modal" onClick={handleOutsideClick}>
      <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50">
        <div className="modal-box w-[60vw] h-[60vh] max-w-lg overflow-auto rounded-lg p-6 bg-white flex flex-col justify-between ">
          <h3 className="font-bold text-2xl text-center text-blue-600">
            Are you sure you want to approve?
          </h3>

          {/* Instructions */}
          <div className="flex flex-col gap-6">
            <Typography variant="subtitle2" className="text-slate-400">
              Note: Kindly verify the required documents for confirmation.
            </Typography>
            <p>Type &quot;APPROVE&quot; to confirm your approval.</p>
            <p>Press ESC to Go Back.</p>
          </div>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Required"
              variant="outlined"
              fullWidth
              name="confirmationString"
              value={input.confirmationString || ""}
              onChange={handleInput}
              required
            />

            {/* Buttons */}
            <div className="modal-action flex justify-center mt-auto">
              {loading ? (
                <LoaderMini />
              ) : (
                <button
                  type="submit"
                  className="w-24 h-10 bg-purple-600 text-white rounded-md text-md font-bold"
                >
                  Approve
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
