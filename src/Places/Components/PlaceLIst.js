import React from 'react';
import Card from '../../Share/Components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

// const a = require("download.jpeg")
const PlaceList = (props) => {
    let place;
    if (props.places.length === 0) {
        place = (
            <Card>
                <h4>Could not find places for the given user id.</h4>
            </Card>
        )
    } else {
        let GetPlace = props.places.map((place,index) => (
            <ul className="userplace__list" key={index}>
                <PlaceItem items={place} deletePlace={props.deletePlace} />
            </ul>
        ));
        place = GetPlace;
    };
    return (
        <>
            {place}
        </>
    );
};

export default PlaceList;




