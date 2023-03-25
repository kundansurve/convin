import React, { useState } from "react";
import Card from "../components/card";
import DropWrapper from "./../components/dropWrapper";
import Col from "./../components/col";
import { data, buckets } from "../data";

const Home = () => {
    const [cards, setcards] = useState(data);

    const onDrop = (card, monitor, status) => {
        const mapping = buckets.find(si => si.status === status);
        console.log(buckets,cards);
        setcards(prevState => {
            const newcards = prevState
                .filter(i =>{if(!i)return false; return i.id !== card.id})
                .concat({ ...card, status, icon: mapping.icon });
            return [ ...newcards ];
        });
    };

    const movecard = (dragIndex, hoverIndex) => {
        const card = cards[dragIndex];
        setcards(prevState => {
            const newcards = prevState.filter((i, idx) => {
                if(!i)return false;
                return idx !== dragIndex});
            newcards.splice(hoverIndex, 0, card);
            return  [ ...newcards ];
        });
    };

    return (
        <div className={"row"} style={{overflowX: "scroll", minHeight:"88vh",}}>
            {buckets.map(s => {
                if(!s){
                    return null;
                }
                return (
                    <div key={s.status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {cards
                                    .filter(i => {if(!i)return false;
                                        return i.status === s.status})
                                    .map((i, idx) => {if(!i)return null;
                                     return <Card key={i.id} card={i} index={idx} movecard={movecard} status={s} />})
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;