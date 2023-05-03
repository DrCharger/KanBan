import React from "react";
import Modal from "react-bootstrap/Modal";

type ModalProps = {
  error: string;
  handleClose: () => void;
};

const ErrorModale: React.FC<ModalProps> = ({ error, handleClose }) => {
  return (
    <Modal show={error !== ""} onHide={handleClose}>
      <Modal.Header
        style={{ background: "#DC3545", color: "#fff" }}
        closeButton
      >
        <Modal.Title>Error!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Fix: </b>Wrong User or Repo
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "flex-start" }}>
        <b>Error: </b>
        {error}
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModale;
