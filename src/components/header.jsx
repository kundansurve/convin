import React, { useState } from "react";
import CardForm from "./cardForm";
import BucketForm from "./bucketForm";

const Header = () => {
  const [cardFormShow, setCardFormShow] = useState(false);
  const [bucketFormShow, setBucketFormShow] = useState(false);

  const onCardFormClose = () => setCardFormShow(false);
  const onCardFormOpen = () => setCardFormShow(true);

  const onBucketFormClose = () => setBucketFormShow(false);
  const onBucketFormOpen = () => setBucketFormShow(true);

  return (
    <div className="page-header">
      <p className="title">Convin Assignment</p>
      <div className="buttons">
        
        <button onClick={onCardFormOpen} className="button">
          Create Card
        </button>
        <button  onClick={onBucketFormOpen} className="button">Create Bucket</button>
      </div>
      <CardForm onClose={onCardFormClose} action="CREATE" show={cardFormShow} />
      <BucketForm onClose={onBucketFormClose} action="CREATE" show={bucketFormShow}/>
    </div>
  );
};

export default Header;
