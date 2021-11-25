import { useState, useCallback } from "react";

const useForm = (intialState) => {
    const [data, setData] = useState(intialState)
    const changeHandler = useCallback((id, value, isValid) => {
        setData((pre) => {
            let formIsvalid = true
            for (const key in pre.input) { 
                if (key === id) {
                    formIsvalid = formIsvalid && isValid
                } else {
                    formIsvalid = formIsvalid && pre.input[key].isValid
                }
            }

            return {
                ...pre,
                input: {
                    ...pre.input,
                    [id]: {
                        ...pre.input[id],
                        title: value,
                        isValid: isValid

                    }
                },
                isValid: formIsvalid,
                isReset: false
            }
        })
    }, []);


    return [data, changeHandler,setData];
};

export default useForm;

