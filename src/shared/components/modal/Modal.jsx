import React from "react";
import { Box, Modal as ModalComponent } from "@mui/material";
import { Close } from "@mui/icons-material";
export const Modal = ({ children, open, handleClose }) => {
  return (
    <ModalComponent open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            overflowY: "scroll",
          }}
        >
          <Close onClick={handleClose} sx={{ alignSelf: "flex-end", cursor: "pointer" }} />
          {children}
        </Box>
      </Box>
    </ModalComponent>
  );
};
