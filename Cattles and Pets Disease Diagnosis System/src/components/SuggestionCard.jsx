/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useState } from "react";
import SuggestionModel from "./SuggestionModel";

export default function SuggestionCard({ suggestion }) {
  const [openSuggestion, setOpenSuggestion] = useState(false);

  const handleModelOpen = () => {
    setOpenSuggestion(true);
  };

  const handleModelClose = () => {
    setOpenSuggestion(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="80"
            image={suggestion.image || "https://i.pinimg.com/236x/30/03/a9/3003a9ebfde83b792987afa56eec2380.jpg"}
            alt={suggestion.name || "Animal Image"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {suggestion.name || "Animal Name"}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {suggestion.species || "Animal Species"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
             Breed: {suggestion.breed ||
                "Animal Breed."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleModelOpen}>
            View Suggestions
          </Button>
        </CardActions>
      </Card>

      {openSuggestion && (
        <SuggestionModel
          suggestion={suggestion}
          setOpenSuggestion={handleModelClose}
        />
      )}
    </>
  );
}
