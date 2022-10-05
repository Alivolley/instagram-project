import React from "react";
import "./AlertModal.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "bootstrap";

export default function AlertModal({ show, handleClose, text }) {
   return (
      <Modal show={show} onHide={handleClose} centered>
         <Modal.Header closeButton>
            <Modal.Title>Request result</Modal.Title>
         </Modal.Header>
         <Modal.Body className="modal-body">{text}</Modal.Body>
      </Modal>
   );
}
