/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";

const DeleteLogButton = ({ row, handleDeleteAnimal }) => {
  const [isDeletable, setIsDeletable] = useState(false);

  useEffect(() => {
    const logTime = new Date(row.createdAt); 
    const currentTime = new Date();
    const diffMinutes = (currentTime - logTime) / (1000 * 60);

    setIsDeletable(diffMinutes <= 10);
  }, [row.createdAt]);

  return (
    <div className="flex flex-col justify-center items-center m-5 gap-3 ">
      <Typography variant="subtitle2" className="mb-2 text-slate-500">
        <strong className="text-black font-bold">Note*:</strong> You can only delete your logs within 10 mins.
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteAnimal(row._id)}
        disabled={!isDeletable} 
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteLogButton;
