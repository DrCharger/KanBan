import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type ModalProps = {
  show: boolean;
  reqName: string;
  handleClose: () => void;
  setAnswer: (v: boolean) => void;
};

const CustomModal: React.FC<ModalProps> = ({
  show,
  reqName,
  handleClose,
  setAnswer,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ background: "lightyellow" }} closeButton>
        <Modal.Title>Warning!!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        You've already has unsaved table{" "}
        <span style={{ color: "red" }}>{reqName}</span> in your history. Choose
        what I need to do? Pick info from a history or load a new one and delete
        the previous?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setAnswer(true);
            handleClose();
          }}
        >
          Load from history
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setAnswer(false);
            handleClose();
          }}
        >
          Load new table
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
