import { Backdrop, CircularProgress } from "@mui/material";

const BackDrop = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: () => void;
}) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isOpen}
      onClick={onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;