/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getDiseaseInfo } from "../services/api";
import chatBotImage from "../assets/chatBot-Image.png";

function DiseaseInfoChatBotPage({ diseaseName }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (diseaseName) {
      const fetchDiseaseInfo = async () => {
        try {
          setLoading(true);
          const response = await getDiseaseInfo(diseaseName);
          setLoading(false);

          console.log("Disease Info:", response.data.diseaseInfo);

          const newMessage = {
            sender: "AniMed",
            time: new Date().toLocaleTimeString(),
            text: (
              <div className="font-sans max-w-lg bg-slate-300  p-6 rounded-xl ">
                <h2 className="text-xl font-bold text-gray-800">🩺 Disease Overview</h2>
                <hr className="border-gray-600 my-3" />
          
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.diseaseName}</span>
                  <span className="font-semibold text-gray-700">Scientific Name:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.scientificName || "N/A"}</span>
                </div>
          
                <h2 className="text-lg font-bold text-gray-800 mt-5">📖 Key Information</h2>
                <hr className="border-gray-600 my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700"> Species Affected:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.speciesAffected || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Spreadable:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.zoonoticPotential}</span>
                  <span className="font-semibold text-gray-700">Caused By:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.causativeAgent || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.duration || "N/A"}</span>
                </div>
          
                <h2 className="text-lg font-bold text-gray-800 mt-5">🩹 Clinical Presentation</h2>
                <hr className="border-gray-600 my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700">Symptoms:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.symptoms || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Behavioral Changes:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.behaviorChanges || "N/A"}</span>
                </div>
          
                <h2 className="text-lg font-bold text-gray-800 mt-5">🧪 Transmission & Diagnosis</h2>
                <hr className="border-gray-600 my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700">Transmission:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.transmission || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Diagnosis Methods:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.diagnosisMethods || "N/A"}</span>
                </div>
          
                <h2 className="text-lg font-bold text-gray-800 mt-5">💊 Treatment & Management</h2>
                <hr className="border-gray-600 my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700">Medications:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.medications || "N/A"}</span>
                  <span className="font-semibold text-gray-700">First Aid:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.firstAid || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Monitoring:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.monitoring || "N/A"}</span>
                </div>
          
                <h2 className="text-lg font-bold text-gray-800 mt-5">🛡️ Prevention & Risk Factors</h2>
                <hr className="border-gray-300 my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-gray-700">Prevention:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.preventionStrategies || "N/A"}</span>
                  <span className="font-semibold text-gray-700">Risk Factors:</span>
                  <span className="text-gray-900">{response.data.diseaseInfo.predisposingFactors || "N/A"}</span>
                </div>
              </div>
            ),
          };
          
          

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching disease info:", error);

          const errorMessage = {
            sender: "AniMed",
            time: new Date().toLocaleTimeString(),
            text: "Something went wrong. Please try again later.",
          };

          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      };

      const userMessage = {
        sender: "You",
        time: new Date().toLocaleTimeString(),
        text: diseaseName,
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      fetchDiseaseInfo();
    }
  }, [diseaseName]);

  return (
    <div
      className="w-full max-w-screen-lg mx-auto p-4 pb-20 min-h-screen"
      style={{
        backgroundImage: `url(${chatBotImage})`,
        backgroundSize: "50% 70%", // Adjusts both width and height
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${message.sender === "You" ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Chat Avatar"
                src={
                  message.sender === "You"
                    ? "https://i.pinimg.com/736x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"
                    : "https://i.pinimg.com/736x/43/7e/c1/437ec1c5d8eb4c09b6335a81ba8f8f0f.jpg"
                }
              />
            </div>
          </div>

          <div className="chat-header">
            {message.sender}
            <time className="text-xs "> {message.time}</time>
          </div>

          <div className="chat-bubble whitespace-pre-line bg-slate-300 text-slate-900">
            {message.text}
          </div>

          <div className="chat-footer ">
            {message.sender === "You" ? `Seen at ${message.time}` : "Delivered"}
          </div>
        </div>
      ))}

      {loading && <span className="loading loading-bars loading-lg"></span>}
    </div>
  );
}

export default DiseaseInfoChatBotPage;
