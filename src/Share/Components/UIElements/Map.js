import React, { useEffect } from 'react';
import './Map.css';

const Map = (props) => {
    const { center, zoom } = props;
    const mapRef = React.useRef()
  
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            zoom: zoom,
            center: center
        });
        new window.google.maps.Marker({
            position: center,
            map: map,
        }, [center, zoom]);
    })
    // const a = () =>{
    //     navigator.geolocation.getCurrentPosition((a)=>{
    //         console.log(a)
    //     })
    // }
    // a()

    return (
        <div ref={mapRef} className={`map ${props.classNames ? props.classNames : ''}`}>

        </div>
    );
};

export default Map;