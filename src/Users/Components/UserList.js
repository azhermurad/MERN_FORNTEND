import React from 'react';
import UserItem from './UserItem';
import Card from '../../Share/Components/UIElements/Card';
import './UserList.css';


const UserList = (props) => {
    console.log(props)
    let userlist = null;
    if (props.item.length === 0) {
        userlist = (
            <div className="">
                <Card>
                    <h2>No User Found in the database</h2>
                </Card>
            </div>
        );
        return userlist;
    };
    return (
        <ul className='user-list'>
            {props.item.map((user) =>
                <UserItem
                    key={user.id}
                    user={user} />
            )}
        </ul>
    );
};

export default UserList;