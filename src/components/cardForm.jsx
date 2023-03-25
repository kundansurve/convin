import React from "react";
import Modal from "react-modal";
import { buckets } from "../data";

Modal.setAppElement("#root");

const CardForm = ({ show, onClose, card, action }) => {
    const onSubmit = () =>{
        if(action==="CREATE"){
            alert(action+"ed")
        }else if(action==="EDIT"){
            alert(action+"ed")
        }
    }
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}>{action} CARD</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <form action="">
        <label onSubmit={() => {}} for="name">
          Card Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
        />

        <label for="videoformat">Video format option</label>
        <select id="bucket" name="bucket">
            <option value={"link"}>Link</option>
            <option value={"upload-video"}>Upload Video</option>
        </select>
        <label for="video">Upload Video:</label>
        <input type="file" id="video" name="video" accept="video/*" />
        <label for="bucket">Bucket</label>
        <select id="bucket" name="bucket">
          {buckets.map((bucket, index) => {
            return (
              <option value={bucket.bucketName}>{bucket.bucketName}</option>
            );
          })}
        </select>
        <div className="submit-button-wrapper">
        <input className="button" type="submit" value={(action==="EDIT")?"Save":"Create"} />
        <input className="cancel-button" type="button" value="Cancel" onClick={onClose}/>
        </div>
        
      </form>
    </Modal>
  );
};

export default CardForm;
