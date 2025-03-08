/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getDiseaseInfo } from "../services/api";
import chatBotImage from "../assets/chatBot-Image.png"; // Adjust the path based on your project structure


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
            text: `
                Disease Overview
                --------------------
                Name: ${response.data.diseaseInfo.diseaseName}
                Scientific Name: ${response.data.diseaseInfo.scientificName || "N/A"}
        
                Key Information
                --------------------
                Species Affected: ${response.data.diseaseInfo.speciesAffected || "N/A"}
                Zoonotic Potential: ${response.data.diseaseInfo.zoonoticPotential}
                Caused By: ${response.data.diseaseInfo.causativeAgent || "N/A"}
                Approximate Duration: ${response.data.diseaseInfo.duration || "N/A"}
        
                Clinical Presentation
                --------------------------
                Symptoms: ${response.data.diseaseInfo.symptoms || "N/A"}
                Behavioral Changes: ${response.data.diseaseInfo.behaviourChanges || "N/A"}
        
                Transmission & Diagnosis
                -----------------------------
                Mode of Transmission: ${response.data.diseaseInfo.transmission || "N/A"}
                Diagnosis Methods: ${response.data.diseaseInfo.diagnosisMethods || "N/A"}
        
                Treatment & Management
                ---------------------------
                Medications: ${response.data.diseaseInfo.medications || "N/A"}
                First Aid Measures: ${response.data.diseaseInfo.firstAid || "N/A"}
                Monitoring Guidelines: ${response.data.diseaseInfo.monitoring || "N/A"}
        
                Prevention & Risk Factors
                ------------------------------
                Prevention Strategies: ${response.data.diseaseInfo.preventionStrategies || "N/A"}
                Pre-Disposing Factors: ${response.data.diseaseInfo.predisposingFactors || "N/A"}
            `.trim(),
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

          <div className="chat-bubble whitespace-pre-line bg-slate-600 text-slate-300">
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
