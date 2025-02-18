export default {
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "16px",
  },
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "cover",
    borderRadius: "8px",
  },
} as const;
