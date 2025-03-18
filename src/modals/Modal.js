import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Cat Modal"
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
        >
            <button className="close-btn" onClick={onClose}>✖</button>
            {children}
        </Modal>
    );
};

export default CustomModal;