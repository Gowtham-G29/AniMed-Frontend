/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { updateAnimal } from "../services/api";
import LoaderMini from "./LoaderMini";

function SuggestionModel({ setOpenSuggestion, suggestion }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenSuggestion(false);
    setOpen(false);
  };

  const handleAccept = async () => {
    const updatedStatus = {
      _id: suggestion._id,
      animalOwnerViewedStatus: true,
    };

    await handleViewStatus(updatedStatus);
    handleClose();
  };

  useEffect(() => {
    handleOpen();
  }, []);

  const handleViewStatus = async (inputs) => {
    try {
      setLoading(true);
      await updateAnimal(inputs);
      setLoading(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-gray-100 text-gray-900">
          {suggestion.name}: ({suggestion.species} - {suggestion.breed})
        </DialogTitle>

        {loading ? (
          <LoaderMini />
        ) : (
          <DialogContent className="space-y-4 bg-white">
            <p className="text-gray-700">
              <strong>Medicine:</strong> {suggestion.doctorSuggestions.medicine}
            </p>
            <p className="text-gray-700">
              <strong>Precautions:</strong>{" "}
              {suggestion.doctorSuggestions.preventionMethods}
            </p>
            <p className="text-gray-700">
              <strong>Remarks:</strong> {suggestion.doctorSuggestions.remarks}
            </p>
            <p className="text-gray-700">
              <strong>Suggested By:</strong>{" "}
              {suggestion.doctorSuggestions.suggestedBy}
            </p>
          </DialogContent>
        )}

        <DialogActions className="bg-gray-100">
          <Button
            variant="contained"
            color="info"
            onClick={handleAccept}
            className=" text-slate-50 hover:bg-blue-400 px-5 py-2 rounded"
          >
            Accept & Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuggestionModel;
