import  { useState } from "react";
import axios from "axios";

const DiseaseImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get selected file
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append file as "image"

    try {
      const response = await axios.post("https://animed-backend.onrender.com/api/v1/prediction/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">
        Upload & Predict
      </button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default DiseaseImageUpload;
