import React, { useState } from "react";
import Card from "../components/card";
import DropWrapper from "./../components/dropWrapper";
import Col from "./../components/col";
import { data, buckets } from "../data";
import { BiEdit } from "react-icons/bi";
import BucketForm from "./../components/bucketForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "../components/header";

const Home = () => {
  const [cards, setCards] = useState(data);
  const [Buckets,setBuckets] = useState(buckets);
  const [deleteMultiple, setDeleteMultiple] = useState(null);
  const [bucketFormShow, setBucketFormShow] = useState(0);
  const onBucketFormClose = () => setBucketFormShow(0);
  const onBucketFormOpen = (i) => setBucketFormShow(i+1);
  const [selectedMultipleBucket, setSelectedMultipleBucket] = useState(null);
  const [selectedMultipleCards, setSelectedMultipleCards] = useState([]);

  const createCard = (newCard)=>{
    const newCards= [...cards];
    alert(JSON.stringify(newCard))
    newCards.push(newCard);
    setCards(newCards);
  }

  const editCard = (id,newCardInfo)=>{
    const newCards = cards.filter(obj=>obj.id!=id);
    newCards.push({id:id,...newCardInfo.cardInfo})
    setCards(newCards);
  }

  const deleteCard = (id)=>{
    const newCards = cards.filter(obj=>obj.id!=id);
    setCards(newCards);
  }

  const editBucket = (idx, newBucketInfo)=>{
    const newBuckets =[...Buckets];
    newBuckets.splice(idx,1,newBucketInfo)
    setBuckets(newBuckets);
  }

  const deleteMultipleCard = (idArray)=>{
    const newCards = cards.filter(obj=>!idArray.includes(obj.id));
    setCards(newCards);
  }

  const onDrop = (card, monitor, bucket) => {
    const mapping = buckets.find((si) => si.bucketName === bucket);
    setCards((prevState) => {
      const newcards = prevState
        .filter((i) => {
          if (!i) return false;
          return i.id !== card.id;
        })
        .concat({ ...card, bucketName: bucket, icon: mapping.icon });
      return [...newcards];
    });
  };

  const movecard = (dragIndex, hoverIndex) => {
    const card = cards[dragIndex];
    setCards((prevState) => {
      const newcards = prevState.filter((i, idx) => {
        if (!i) return false;
        return idx !== dragIndex;
      });
      newcards.splice(hoverIndex, 0, card);
      return [...newcards];
    });
  };

  const onSelect = (idx) => {
    if (selectedMultipleCards.includes(idx)) {
      const myArray = [...selectedMultipleCards];
      const index = myArray.indexOf(2);
      myArray.splice(index, 1);
      setSelectedMultipleCards(myArray);
    } else setSelectedMultipleCards([...selectedMultipleCards, idx]);
    alert(idx);
  };

  return (
    <><Header createCard={createCard}/>
        <div className={"row"} style={{ overflowX: "scroll", minHeight: "88vh" }}>
      <div
        style={{
          position: "absolute",
          display: !selectedMultipleBucket ? "none" : "",
          width: "100%",
          top: "0px",
          left: "0px",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "5",
        }}
      ></div>
      {Buckets.map((s,index) => {
        if (!s) {
          return null;
        }
        return (
          <div
            key={s.bucketName}
            className={"col-wrapper"}
            style={{ zIndex: selectedMultipleBucket === s.bucketName ? 7 : "" }}
          >
            <div style={{ padding: "0.5em" }}>
              <BiEdit
                className="float-right"
                style={{ float: "right" }}
                onClick={()=>onBucketFormOpen(index)}
              />
              <span
                className={"col-header"}
                onClick={() => setSelectedMultipleBucket(s.bucketName)}
              >
                {s.bucketName.toUpperCase()}
              </span>
              
              {selectedMultipleBucket === s.bucketName ? (
                <>
                  <button className="cancel-button" onClick={()=>deleteMultipleCard(selectedMultipleCards)}>
                    <RiDeleteBin6Line /> Delete
                  </button>
                  <button
                    style={{ color: "rgb(247, 82, 82)" }}
                    onClick={() => setSelectedMultipleBucket(null)}
                  >
                    X Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSelectedMultipleBucket(s.bucketName)}
                  className="cancel-button"
                  style={{ width: "150px" }}
                >
                  <RiDeleteBin6Line /> Delete Multiple
                </button>
              )}
            </div>
            <DropWrapper onDrop={onDrop} bucket={s.bucketName}>
              <Col>
                {cards
                  .filter((i) => {
                    if (!i) return false;
                    return i.bucketName === s.bucketName;
                  })
                  .map((i, idx) => {
                    if (!i) return null;
                    return (
                      <Card
                        key={i.id}
                        card={i}
                        index={idx}
                        movecard={movecard}
                        bucket={s}
                        onDelete={deleteCard}
                        editCard={editCard}
                        selected={
                          selectedMultipleCards.includes(i.id) ? true : false
                        }
                        onClick={
                          selectedMultipleBucket === i.bucketName
                            ? () => onSelect(i.id)
                            : null
                        }
                      />
                    );
                  })}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
      <BucketForm
                onClose={onBucketFormClose}
                bucket={(bucketFormShow)?Buckets[bucketFormShow-1]:0}
                action="EDIT"
                index={(bucketFormShow)?bucketFormShow-1:0}
                editBucket={editBucket}
                show={bucketFormShow}
            />
    </div></>
  );
};

export default Home;
