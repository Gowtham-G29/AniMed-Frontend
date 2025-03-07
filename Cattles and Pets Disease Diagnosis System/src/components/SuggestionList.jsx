import { useState, useEffect } from "react";
import { getAnimalDetails } from "../services/api";
import SuggestionCard from "./SuggestionCard";

export default function SuggestionList() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await getAnimalDetails();
        setSuggestions(response.data.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {suggestions.map((suggestion, index) => {
        
        if (suggestion.doctorSuggestedStatus) {
          return <SuggestionCard key={index} suggestion={suggestion} />;
        }
        return null;
      })}
    </div>
  );
}
