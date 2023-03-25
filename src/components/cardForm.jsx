import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CardForm = ({ show, onClose, card , action}) => {
    
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <h1 style={{ flex: "1 90%" }}>Title</h1>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div>
                <h2>Description</h2>
                <p>content</p>
                <h2>Status</h2>
                <p>icon +status</p>
            </div>
        </Modal>
    );
};

export default CardForm;