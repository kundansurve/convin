import React from "react";
import Modal from "react-modal";
import { data } from "../data";

Modal.setAppElement("#root");

const BucketForm = ({ show, onClose, bucket, action }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}>{action} BUCKET</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <form action="">
        <label onSubmit={() => {}} for="name">
          Bucket Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Bucket Name..."
        />

        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Add description..."
        />
        
        <div className="submit-button-wrapper">
          <input
            className="button"
            type="submit"
            value={action === "EDIT" ? "Save" : "Create"}
          />
          <input className="cancel-button" type="button" value="Cancel" onClick={onClose}/>
        </div>
      </form>
    </Modal>
  );
};

export default BucketForm;
