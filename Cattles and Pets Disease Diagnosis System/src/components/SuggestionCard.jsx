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

  if (suggestion.species == "Cow") {
    suggestion.image =
      "https://i.pinimg.com/236x/68/14/6b/68146b60b638f9739e444d2687ab423b.jpg";
  } else if (suggestion.species === "Goat") {
    suggestion.image =
      "https://i.pinimg.com/236x/8e/a2/05/8ea20586cc0ec2aa88ca6f1c0f92f662.jpg";
  } else if (suggestion.species === "Dog") {
    suggestion.image =
      "https://i.pinimg.com/236x/ca/bf/af/cabfaf0b01dad79d3e435200e0483d07.jpg";
  } else if (suggestion.species === "Cat") {
    suggestion.image =
      "https://i.pinimg.com/236x/46/b0/cb/46b0cbd434a32ed8e692e4f9d025839a.jpg";
  }else if(suggestion.species==="Fish"){
    suggestion.image="https://i.pinimg.com/736x/e8/19/89/e81989c31d0c603f4ddf12d15675a67e.jpg"
  }else if(suggestion.species==="Pig"){
    suggestion.image="https://i.pinimg.com/236x/ae/5e/28/ae5e280294540f865eed4d68a74e918b.jpg"
  }else if(suggestion.species==="Hamsters"){
    suggestion.image="https://i.pinimg.com/236x/24/79/c6/2479c69be85a5183b3484e896000283e.jpg"
  }
  else if(suggestion.species==="Bird"){
    suggestion.image="https://i.pinimg.com/236x/5a/50/2a/5a502a371a463febe4292f9409667f06.jpg"
  }else if(suggestion.species==="Reptiles"){
    suggestion.image="https://i.pinimg.com/236x/3b/8a/28/3b8a281168ba4e84da39382614db9526.jpg"
  }else if(suggestion.species==="Snakes"){
    suggestion.image="https://i.pinimg.com/236x/75/fe/70/75fe70508089102507aaa58d6c331449.jpg"
  }else if(suggestion.species==="Sheep"){
    suggestion.image="https://i.pinimg.com/236x/2a/3d/df/2a3ddf38a978093cb1b3dad6887ec0db.jpg"
  }else if(suggestion.species==="Horse"){
    suggestion.image="https://i.pinimg.com/236x/b4/d1/99/b4d199a563fa2f320e7331420ea91ff4.jpg"
  }else if(suggestion.species==="Donkey"){
    suggestion.name="https://i.pinimg.com/736x/a6/78/56/a6785646afde043e7e63727052ddfc51.jpg"
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={
              suggestion.image ||
              "https://i.pinimg.com/236x/30/03/a9/3003a9ebfde83b792987afa56eec2380.jpg"
            }
            alt={suggestion.name || "Animal Image"}
            sx={{ width: 200,height:200, objectFit:"fill" }}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {suggestion.name || "Animal Name"}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {suggestion.species || "Animal Species"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Breed: {suggestion.breed || "Animal Breed."}
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
