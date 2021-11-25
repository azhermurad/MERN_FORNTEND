import React, { useContext, useEffect, useState } from 'react';
import Input from '../../Share/Components/formControl/input';
import Container from '../../Share/Components/UIElements/Container';
import { VALIDATOR_REQUIRE } from '../../Share/util/Validators';
import useForm from '../../CustomsHooks/formHook';
import Button from '../../Share/Components/UIElements/Button';
import "./style.css";
import useHttp from '../../CustomsHooks/httpHook';
import { useHistory, useParams } from 'react-router';
import Loader from '../../Share/Components/UIElements/Loader';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import { Cotext } from '../../Context/auth';


const UpdatePlace = () => {
    const auth = useContext(Cotext);
    const placeId = useParams().placeId;
    const history = useHistory()
    const [responsePlace, setResponsePlace] = useState(null)
    const [data, changeHandler, setData] = useForm(
        {
            input: {
                name: {
                    title: "",
                    isValid: false
                },
                description: {
                    title: "",
                    isValid: false
                }
            },
            isValid: false,
            isReset: false
        }
    )
    const [fetchApi, isLoading, isError] = useHttp()
    useEffect(() => {
        const request = async () => {
            const placeData = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
            if (placeData) {
                setData(
                    {
                        input: {
                            name: {
                                title: placeData.place.title,
                                isValid: true
                            },
                            description: {
                                title: placeData.place.description,
                                isValid: true
                            }
                        },
                        isValid: true,
                        isReset: false
                    }

                )
                setResponsePlace(placeData.place)
            }
        }
        request()

    }, [setData, fetchApi, placeId])

    const placeUpdateHandler = async (event) => {
        event.preventDefault()
        const updatePlace = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, "PATCH", JSON.stringify({
            title: data.input.name.title,
            description: data.input.description.title,

        }),
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            });
          
        if(updatePlace) {
            history.push(`/${auth.user.id}/places`);
        }
    }
    if (isLoading) {
        return <Loader />;
    };

    return (
        <> {!isLoading && responsePlace &&
            <Container>
                
                <form className="newplace__form card" onSubmit={placeUpdateHandler}>
                {isError && <ErrorShower error={isError} />}
                    <Input
                        label="Name"
                        id="name"
                        type="text"
                        elementType="input"
                        value={data.input.name.title}
                        valid={data.input.name.isValid}
                        onPress={changeHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        error="please provide valid name"
                    />
                    <Input
                        label="Description"
                        id="description"
                        value={data.input.description.title}
                        valid={data.input.name.isValid}
                        onPress={changeHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        error="please provide valid description"
                    />
                    <Button type="submit" disabled={!data.isValid}>update</Button>
                </form>
            </Container>}
        </>
    )
};
export default UpdatePlace;