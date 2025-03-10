/* eslint-disable react/prop-types */
import LocationPickerMap from "./LocationPickerMap";

function ManualSelectMapModal({
  setManualCoords,
  setOpenManualSelectLocation,
}) {
  return (
      <dialog
        open
        className="modal inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-7"
      >
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
          <h3 className="font-bold text-xl text-blue-500">Select Location</h3>
          <h5 className="font-bold text-md text-gray-800">Click the Map to select the Location 📍 and &quot;Confirm&quot; </h5>

          <LocationPickerMap setManualCoords={setManualCoords} />

          <button
            className="btn bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition mt-4"
            onClick={() => setOpenManualSelectLocation(false)}
          >
            Close
          </button>
        </div>
      </dialog>
  );
}

export default ManualSelectMapModal;
