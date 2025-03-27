import { useState, useRef } from "react";
import { getPrediction } from "../services/api";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Skeleton,
} from "@mui/material";
import { CloudUpload, CameraAlt } from "@mui/icons-material";
import CameraIcon from "@mui/icons-material/Camera";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PredictionResultModal from "./PredictionResultBox";
import LoaderMini from "./LoaderMini";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [open, setOpen] = useState(false);
  const [predictionError, setPredictionError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle camera capture
  const startCamera = () => {
    setOpen(true);
  
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Camera access error:", error);
        navigator.mediaDevices
          .getUserMedia({ video: true }) // Fallback in case of error
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => console.error("Fallback camera access error:", err));
      });
  };
  

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 300, 200);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setOpen(false);

      // Convert base64 to file
      fetch(dataURL)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured_image.png", {
            type: "image/png",
          });
          setFile(file);
          setImage(dataURL);
        });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload or capture an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await getPrediction(formData);
      setPrediction(response.data.prediction);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error predicting:", error);
      setPredictionError("Something went wrong. Try again !");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="max-w-full h-screen"
      >
        <div className="flex flex-col justify-center items-center">
          {" "}
          <Typography variant="subtitle3" className="text-slate-600 p-3">
            Capture the image at good lighting conditions !
          </Typography>
          <DialogContent>
            <video
              ref={videoRef}
              autoPlay
              className="w-screen max-h-full block rounded-lg shadow-md "
            ></video>
            <canvas
              ref={canvasRef}
              className="hidden"
              width="300"
              height="200"
            ></canvas>
          </DialogContent>
          <DialogActions className="mb-4 ">
            <Button
              variant="contained"
              color="secondary"
              onClick={captureImage}
              startIcon={<CameraIcon />}
            >
              Capture
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            className="mt-4"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <Typography variant="h6" fontSize="small">
            OR
          </Typography>

          <Button
            variant="contained"
            startIcon={<CameraAlt />}
            onClick={startCamera}
          >
            Open Camera
          </Button>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="w-64 mt-4 rounded-lg shadow-md"
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width={300}
              height={300}
              className="mt-4"
            />
          )}
          {loading ? (
            <LoaderMini />
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleUpload}
            >
              Upload & Predict
            </Button>
          )}

          {prediction && (
            <PredictionResultModal
              prediction={prediction}
              predictionError={predictionError}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
