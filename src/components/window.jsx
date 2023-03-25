import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Window = ({ show, onClose, card }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal-fullscreen"}
      overlayClassName={"overlay"}
      
    >
      <iframe width="900" height="600" src={card.videoLink+"?autoplay=1"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </Modal>
  );
};

export default Window;
