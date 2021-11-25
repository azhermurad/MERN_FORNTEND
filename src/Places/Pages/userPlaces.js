import React, { useState, useEffect } from 'react';
import PlaceList from '../Components/PlaceLIst';
import Container from '../../Share/Components/UIElements/Container';
import useHttp from '../../CustomsHooks/httpHook';
import Loader from '../../Share/Components/UIElements/Loader';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import { useParams } from 'react-router';


const UserPlaces = () => {
    const [fetchApi, isLoading, isError] = useHttp();
    const userId = useParams().userId;
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        const request  = async () => {
            const data = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
            if(data){
                setPlaces(data.place)
            }
        };
        request();
    }, [fetchApi,userId])
    // if(place.length !== 0) {
        
    // }
    const deletePlaces = (placeId) => {
      const deletePlaceById = places.filter((items) => items._id !== placeId);
      setPlaces(deletePlaceById);
    }
    return (
        <Container>
             {isLoading && <Loader/>} 
                {isError ? <ErrorShower error={isError} />:
                !isLoading && places && <PlaceList places={places} deletePlace={deletePlaces} />}
        </Container>
    );
};

export default UserPlaces;