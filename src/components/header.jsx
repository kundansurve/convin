import React, { useState } from "react";
import CardForm from "./cardForm";
import BucketForm from "./bucketForm";
import { Link } from "react-router-dom";

const Header = ({createCard}) => {
  const [cardFormShow, setCardFormShow] = useState(false);

  const onCardFormClose = () => setCardFormShow(false);
  const onCardFormOpen = () => setCardFormShow(true);


  return (
    <div className="page-header">
      <p className="title">Convin Assignment</p>
      <div className="buttons">
        
        <button onClick={onCardFormOpen} className="button">
          Create Card
        </button>
        <a href="/history"><button>History</button></a>
        
      </div>
      <CardForm onClose={onCardFormClose} createCard={createCard} action="CREATE" show={cardFormShow} />
    </div>
  );
};

export default Header;
