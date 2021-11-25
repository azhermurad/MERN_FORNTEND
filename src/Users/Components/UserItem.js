import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../Share/Components/Avatar/Avatar';
import './UserItem.css';


const UserItem = (props) => {
    const history = useHistory();
    console.log(props);

    return (
        <li className="user-item" onClick={() => {
            history.push(`${props.user.id}/places`)
        }}>
            <div className="avatar_container" >
                <Avatar 
                    src={`${process.env.REACT_APP_BACKEND_URL}/`+ props.user.image}
                    alt={props.user.name}
                    />
            </div>
         
            <div className="user-content">
                <h5>{props.user.name}</h5>
                <p>{props.user.places.length !==0 && props.user.places.length}</p>
            </div>
            <div>
                Icon
            </div>
        </li>
    );
};

export default UserItem;


