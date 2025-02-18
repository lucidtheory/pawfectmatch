import { FC } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { Dog } from "store/services/types/dogs";
import styles from "./DogModal.styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  matchedDog?: Dog;
  isLoading?: boolean;
}

const DogModal: FC<ModalProps> = ({ open, onClose, matchedDog, isLoading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={styles.closeIcon}
        >
          <FaTimes size={24} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {matchedDog ? (
          <div>
            <h2>You matched with {matchedDog.name}!</h2>
            <img
              src={matchedDog.img}
              alt={matchedDog.name}
              style={styles.image}
            />
            <p>Breed: {matchedDog.breed}</p>
            <p>Age: {matchedDog.age}</p>
          </div>
        ) : isLoading ? (
          <p>Getting your match...</p>
        ) : (
          <p>No matched dog found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DogModal;
