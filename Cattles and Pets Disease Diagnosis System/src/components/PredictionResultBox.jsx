/* eslint-disable react/prop-types */
import { Box, Typography, Modal, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

export default function PredictionResultModal({
  prediction,
  predictionError,
  loading,
  confidenceScore,
}) {
  const [Open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [prediction, predictionError, loading]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={Open} aria-labelledby="prediction-modal" onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: 320,
          textAlign: "center",
        }}
      >
        <div className="flex flex-col gap-5">
          <Typography variant="h6" className="font-bold text-slate-600">
            Predicted Disease
            <CoronavirusIcon color="secondary" />
          </Typography>
          <div>
            {loading ? (
              <span className="loading loading-bars loading-xl"></span>
            ) : (
              <>
                {predictionError ? (
                  <Typography
                    variant="subtitle1"
                    color="error"
                    fontWeight="bold"
                  >
                    {predictionError}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    color="success.main"
                    fontWeight="bold"
                  >
                    <div className="flex flex-col gap-2">
                      <div>{prediction ? `${prediction}` : "Result ?"}</div>
                      <div>{Number(confidenceScore * 100).toFixed(2)} %</div>
                    </div>
                  </Typography>
                )}
              </>
            )}
          </div>

          <Button variant="contained" color="secondary" onClick={handleClose}>
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
