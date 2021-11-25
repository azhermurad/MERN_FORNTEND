import React, { useState, useContext } from 'react';
import Container from '../../Share/Components/UIElements/Container';
import Button from '../../Share/Components/UIElements/Button';
import Input from '../../Share/Components/formControl/input';
import useForm from '../../CustomsHooks/formHook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../Share/util/Validators';
import { Cotext } from '../../Context/auth';
import './Auth.css';
import Loader from '../../Share/Components/UIElements/Loader';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import useHttp from '../../CustomsHooks/httpHook';
import ImageUpload from '../../Share/Components/Uploadimage';



const Auth = () => {
    const auth = useContext(Cotext);
    const [isLogin, setLogin] = useState(true);
    const [fetchApi, isLoading, isError, setError] = useHttp()
    const [data, changeHandler, setData] = useForm({
        input: {
            email: {
                title: "",
                isValid: false
            },
            password: {
                title: "",
                isValid: false
            }
        },
        isValid: false,
        isReset: false
    })

    const resetForm = () => {
        setData({
            input: {
                email: {
                    title: "",
                    isValid: false
                },
                password: {
                    title: "",
                    isValid: false
                },

            },
            isValid: false,
            isReset: true
        })
        setError(null)
        setLogin((pre) => !pre)
    }
    console.log(data)

    const authFormhHandler = async (event) => {
        event.preventDefault();
        if (data.isValid) {
            if (isLogin) {
                const res = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/users/login`, "POST",
                    JSON.stringify({
                        email: data.input.email.title,
                        password: data.input.password.title,
                    }),
                    {
                        "Content-Type": "application/json"
                    }

                )
                if (res) {
                    auth.login(res.user, res.token)
                }

            } else {
                const formData = new FormData();
                formData.append("name",data.input.name.title)
                formData.append("email",data.input.email.title)
                formData.append("password",data.input.password.title)
                formData.append("image",data.input.image.title)
                const res = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/users`, "POST",
                    formData
                )
                if (res) {
                    auth.login(res.user, res.token)
                }
            }
        }
    };
    return (
        <>
            <Container>
                {isLoading && <Loader />}
                <form className="user_auth card" onSubmit={authFormhHandler}>
                    <div>
                        <h2 className="form_auth--title">
                            {isLogin ? "Login" : "SignUp"}
                        </h2>
                    </div>
                    {isError && <ErrorShower error={isError} />}
                    {!isLogin &&
                        <>
                            <Input
                                elementType="input"
                                id="name"
                                label="Name"
                                type="text"
                                error="please provide valid name (minimum seven characters)"
                                validators={[VALIDATOR_MINLENGTH(5)]}
                                onPress={changeHandler}
                                reset={data.isReset}
                            />
                            <ImageUpload id="image" onPress={changeHandler}/>
                        </>
                    }
                    <Input
                        elementType="input"
                        id="email"
                        label="Email"
                        type="email"
                        error="please provide valid email"
                        validators={[VALIDATOR_EMAIL()]}
                        onPress={changeHandler}
                        reset={data.isReset}
                    />

                    <Input
                        elementType="input"
                        id="password"
                        label="Password"
                        type="password"
                        error="please provide valid password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onPress={changeHandler}
                        reset={data.isReset}
                    />

                    <Button type="submit" disabled={!data.isValid}>{!isLogin ? "SignUp" : "Login"}</Button>
                    <div className="form__auth--switchbtn" >
                        <strong>Switch to: </strong>
                        {isLogin ? <span onClick={resetForm}>signUp</span> :
                            <span onClick={resetForm}>Login</span>}</div>
                </form>
            </Container>
        </>
    );
};

export default Auth;


// The status is false when the status is 500 server error, 400 bad requst, 404 not found etc
// only true when the status is 201, 200 

