import { FC, useState, useEffect, useCallback } from "react";
import { Dog } from "store/services/types/dogs";
import { addFavorite, isDogFavorite, removeFavorite } from "utils/favorites";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

interface DogListItemProps {
  dog: Dog;
}

const DogListItem: FC<DogListItemProps> = ({ dog }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the dog is in sessionStorage when the component mounts
  useEffect(() => {
    setIsFavorite(isDogFavorite(dog.id));
  }, [dog.id]);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }

    setIsFavorite(!isFavorite);
  }, [dog, isFavorite]);

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        image={dog.img}
        alt={dog.name}
        sx={{ width: 150, maxHeight: 150, objectFit: "stretch" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{dog.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {dog.breed} - {dog.age} years old
        </Typography>
        <Button
          onClick={toggleFavorite}
          variant="contained"
          color={isFavorite ? "warning" : "primary"}
          sx={{ mt: 2 }}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DogListItem;
