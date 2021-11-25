import { useState, useCallback } from "react";
import CustomError from "../Share/util/CustumError";

const useHttp = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);


    const fetchApi = useCallback(async (url, method = "GET", body = null,header={}) => {

        try {
            setLoading(true)
            const places = await fetch(url, {
                method: method,
                headers: header,
                body,

            });
            const resposne = await places.json();
            if (!places.ok) {
                throw new CustomError(resposne.errors)
            };
            setLoading(false);
            setError(null)
            return resposne;
        } catch (error) {
            setLoading(false);
            if (typeof error.message === 'string') {
                setError([{ msg: error.message }]);
                return;
            };
            setError(error.message || [{ msg: "something went wrong,  try again " }])
        }
    }, []);


    return [fetchApi, isLoading, isError, setError];
};

export default useHttp;


// the destructioning is