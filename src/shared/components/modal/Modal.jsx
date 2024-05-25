import React from "react";
import { Modal as ModalComponent } from "@mui/material";
export const Modal = ({ children, open, handleClose }) => {
  return (
    <ModalComponent open={open} onClose={handleClose}>
      {children}
    </ModalComponent>
  );
};
