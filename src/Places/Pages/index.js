import React, { useContext } from 'react';
import Input from '../../Share/Components/formControl/input';
import Button from '../../Share/Components/UIElements/Button';
import Container from '../../Share/Components/UIElements/Container';
import { VALIDATOR_REQUIRE } from '../../Share/util/Validators';
import { Cotext } from '../../Context/auth'
import useForm from '../../CustomsHooks/formHook';
import useHttp from '../../CustomsHooks/httpHook';
import ErrorShower from '../../Share/Components/UIElements/Errorshow';
import Loader from '../../Share/Components/UIElements/Loader';
import { useHistory } from 'react-router';
import './style.css';
import ImageUpload from '../../Share/Components/Uploadimage';

const NewPlace = (props) => {
    const auth = useContext(Cotext);
    const history = useHistory();
    const [fetchApi, isLoading, isError] = useHttp()
    const [data, changeHandler] = useForm(
        {
            input: {
                name: {
                    title: '',
                    isValid: false
                },
                description: {
                    title: '',
                    isValid: false
                },
                address: {
                    title: '',
                    isValid: false
                },
                image: {
                    title: '',
                    isValid: false
                }
            },
            isValid: false,
            isReset: false
        }
    )

    console.log(data)
    const formHandler = async (event) => {
        console.log(event)
        event.preventDefault()
        // for sending the binary data we have to use the formdata api
        const formData = new FormData();
        formData.append('title',data.input.name.title);
        formData.append('address', data.input.address.title);
        formData.append('description',data.input.description.title);
        formData.append('image',data.input.image.title)
        
      if(data.isValid){
        const res = await fetchApi(`${process.env.REACT_APP_BACKEND_URL}/places`, 'POST',
        formData
        , {
            Authorization: `Bearer ${auth.token}`
        })
    if (res) {
        history.push("/" + auth.user.id + "/places")
    }
      }
    }
    console.log("fdlks;ja", auth.token)
    return (
        <>
            <Container>
                {isLoading && <Loader />}
                {isError && <ErrorShower error={isError} />}
                <form className="card newplace__form" onSubmit={formHandler}>
                    <Input
                        id="name"
                        elementType="input"
                        type="text"
                        label="Name"
                        placeholder="name..."
                        onPress={changeHandler}
                        error="provide valid name (maxlenght of 5 )"
                        validators={[VALIDATOR_REQUIRE()]}
                        reset={data.isReset}
                    />
                    <Input
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="description..."
                        onPress={changeHandler}
                        error="please provide valid description(min lenght of 5)"
                        validators={[VALIDATOR_REQUIRE()]}
                        reset={data.isReset}
                    />
                    <Input
                        elementType="input"
                        id="address"
                        type="text"
                        label="Address"
                        placeholder="address..."
                        onPress={changeHandler}
                        error="please provide valid address"
                        validators={[VALIDATOR_REQUIRE()]}
                        reset={data.isReset}
                    />
                    {/* <Input 
                        type="text" 
                        label="Description" 
                        placeholder="enter name" 
                    /> */}
                    <ImageUpload id="image" onPress={changeHandler} />

                    <Button type="submit" disabled={!data.isValid} >SUBMIT</Button>

                </form>
            </Container>
        </>
    )
};

export default NewPlace;















// import React, { useState } from 'react';

// const Input = (props) => {

//     const {
//         element,
//         label,
//         name,
//         type,
//         onChange,
//         placeholder,
//         error,
//         value,
//         rows
//     } = props
//     console.log("error in ", error)
//     switch (element) {
//         case "input": {
//             return (
//                 <div className={`form-group ${props.className}`}>
//                     <label className="form-input__label">
//                         {label || "title"}
//                     </label>
//                     <input
//                         type={type}
//                         placeholder={placeholder}
//                         onChange={onChange}
//                         name={name}

//                     />
//                     {error && <p>{error}</p>}

//                 </div>
//             )

//         }
//         default:
//             return (
//                 <div className={`form-group ${props.className}`}>
//                     <label className="form-input__label">
//                         {label || "title"}
//                     </label>
//                     <textarea
//                         placeholder={placeholder}
//                         onChange={onChange}
//                         name={name}
//                         value={value}
//                         rows={rows || 3}
//                     />
//                     {error && <p>{error}</p>}
//                 </div>
//             );
//     }
// }


// const NewPlace = (props) => {

//     const [data, setdata] = useState({
//         name: "",
//         description: "",
//         errors: {},
//     })

//     const formDataHandler = (event) => {
//         setdata({
//             ...data,
//             [event.target.name]: event.target.value
//         })

//     }
//     const submitHandler = (event) => {
//         event.preventDefault()
//         alert('form is submitted')
//         if (data.name === "") {
//             setdata({
//                 ...data,
//                 errors: {
//                     name: "Name filed is Required"
//                 }
//             })
//             return;
//         }

//         if (data.description === "") {
//             setdata({
//                 ...data,
//                 errors: {
//                     description: "Description field is Required"
//                 }
//             });
//             return;
//         }

//         setdata({
//             name: "",
//             description: "",
//             errors: {}
//         })


//     }
//     return (
//         <div>
//             <h2>{data.errors.name}</h2>
//             <h2>{data.description}</h2>
//             <h2>{data.name}</h2>
//             <form onSubmit={submitHandler}>
//                 <Input
//                     onChange={formDataHandler}
//                     error={data.errors.name}
//                     element="input"
//                     type="text"
//                     name="name"
//                     placeholder="enter name "
//                     value={data.name}
//                 />
//                 <Input onChange={formDataHandler} value={data.description} error={data.errors.description} element="textarea" name="description" placeholder="enter name" rows={12} />
//                 <button >click</button>
//             </form>
//         </div>
//     );
// };
// export default NewPlace;