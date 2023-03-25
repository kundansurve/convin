import React, { useState } from "react";
import Card from "../components/card";
import DropWrapper from "./../components/dropWrapper";
import Col from "./../components/col";
import { data, buckets } from "../data";
import { BiEdit } from "react-icons/bi";
import BucketForm from "./../components/bucketForm";
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = () => {
  const [cards, setCards] = useState(data);
  const [deleteMultiple, setDeleteMultiple] = useState(null);
  const [bucketFormShow, setBucketFormShow] = useState(false);
  const onBucketFormClose = () => setBucketFormShow(false);
  const onBucketFormOpen = () => setBucketFormShow(true);
  const [selectedMultipleBucket, setSelectedMultipleBucket] = useState(null);
  const [selectedMultipleCards, setSelectedMultipleCards] = useState([]);

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
      {buckets.map((s) => {
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
                onClick={onBucketFormOpen}
              />
              <span
                className={"col-header"}
                onClick={() => setSelectedMultipleBucket(s.bucketName)}
              >
                {s.bucketName.toUpperCase()}
              </span>
              <BucketForm
                onClose={onBucketFormClose}
                action="EDIT"
                show={bucketFormShow}
              />
              {selectedMultipleBucket === s.bucketName ? (
                <>
                  <button className="cancel-button">
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
    </div>
  );
};

export default Home;
