import React, { useState,useEffect,useContext } from 'react';
import UserList from '../Components/UserList';
import Container from '../../Share/Components/UIElements/Container';
import useHttp from '../../CustomsHooks/httpHook';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import Loader from '../../Share/Components/UIElements/Loader';
import { Cotext} from '../../Context/auth';

const Users = () => {
    const auth = useContext(Cotext);
    const [getUsers, setGetUsers] = useState();
    const [fetchApi, isLoading, isError,] = useHttp()
    // we have to focus on the user login 
    
    useEffect(()=>{
            const requestUser = async ( ) => {
                const res = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/users`);
                if(res){
                    setGetUsers(res.user)
                }
            }
            requestUser()
    },[fetchApi,auth.token])

    return (
        <section className="User_section">
            {isLoading ? <Loader/>:<Container >
                {isError && <ErrorShower error={isError} />}
                { getUsers && <UserList item={getUsers} />}
            </Container>}
        </section>
    )

};
export default Users;




// the custom hook are the most important part 