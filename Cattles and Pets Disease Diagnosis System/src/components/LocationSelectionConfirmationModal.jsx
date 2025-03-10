import { Typography } from "@mui/material";

/* eslint-disable react/prop-types */
function LocationSelectionModeConfirmationModal({ handleLocationChoice }) {
  return (
    <dialog
      open
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="font-bold text-xl text-gray-800 mb-2" >
          Location Selection Option
        </h3>
        <Typography variant="subtitle3" className="text-slate-500">
          <strong className="text-black font-bold">Note*:</strong>This location
          Points your diseased animal.
        </Typography>
        <p className="py-4 text-gray-600 text-center">
          Press{" "}
          <span className="font-semibold text-green-600">&quot;Yes&quot;</span>{" "}
          to select the location manually.
          <br />
          Press{" "}
          <span className="font-semibold text-red-600">&quot;No&quot;</span> to
          select automatically.
        </p>
        <div className="modal-action flex justify-center gap-4">
          <button
            className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition "
            onClick={() => handleLocationChoice(true)}
          >
            Yes
          </button>
          <button
            className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => handleLocationChoice(false)}
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default LocationSelectionModeConfirmationModal;
