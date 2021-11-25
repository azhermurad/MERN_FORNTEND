import React, { useContext, useState } from 'react';
import Card from '../../Share/Components/UIElements/Card';
import Button from '../../Share/Components/UIElements/Button';
import Model from '../../Share/Components/UIElements/Model/Model';
import Map from '../../Share/Components/UIElements/Map';
import { Cotext } from '../../Context/auth';
import useHttp from '../../CustomsHooks/httpHook';
import './PlaceItem.css';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import Loader from '../../Share/Components/UIElements/Loader';



const PlaceItem = (props) => {
    console.log("placeItem props to check the user id and the post id ", props)
    const [fetchApi, isLoading, isError] = useHttp()
    const {image,title, description,location,_id,creator} = props.items;
    const auth = useContext(Cotext);
    const [modelShow, setModelShow] = useState(false);
    const [showEditModel, setEditModle] = useState(false);

    const modelShowHandler = () => {
        setModelShow(true)
    };
    const modelCancelHandler = () => {
        setModelShow(false)
    };
    const showEditModleHandler = () => {
        setEditModle(true)
    };
    const closeEditModleHandler = ( ) => {
        setEditModle(false)
    }
    const deletePlaceHandler = async ( ) => {
        const deletePlace = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/places/${_id}`,'DELETE',null,
        {
            "Authorization": `Bearer ${auth.token}`
        });
        setEditModle(false);
        if(deletePlace){
            props.deletePlace(_id)
        }
        
    } 
    return (
        <> 
            {isLoading && <Loader/>}
            {isError && <ErrorShower error={isError} />}
            <Model
                show={modelShow}
                header="address"
                modelclose={modelCancelHandler}
            >
                <Map center={{ lat: location.lat, lng: location.lng }} zoom={16} />
            </Model>
            <Model
                show={showEditModel}
                modelclose={closeEditModleHandler}
                header="Are you want to Delete?"
                footer={<Button danger onClick={deletePlaceHandler}>Confirm</Button>}
            >
                <p>Are you sure to delete this place? To procide click okay!</p>
            </Model>
            <li>
                <Card>
                    <div className="userplace_item--image">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/`+ image} alt="alt" />
                    </div>
                    <div className="userplace_details userplace__item--center">
                        <h2 className="userplace__item--title">{title}</h2>
                        <h3 className="userplace__item--address">{description}</h3>
                        <hr />
                        <Button inverse onClick={modelShowHandler}>View On Map</Button>
                        {auth?.user?.id === creator.id && 
                        <>
                            <Button to={`/places/${_id}`} >Edit</Button>
                            <Button onClick={showEditModleHandler}>Delete</Button>
                        </>
                        }
                    </div>


                </Card>
            </li>

        </>

    );
};

export default PlaceItem;
