import React, { useEffect, createContext, useCallback, useState } from "react";

export const Cotext = createContext({
    isLoggedIn: false,
    token: null,
    user: null,
    login: () => { },
    logout: () => { },
});

let tokenTracker;
const AuthContext = (props) => {
    const [expireToken, setExpireToken] = useState(null)
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = useCallback((user, token, expire) => {
        setUser(user);
        setToken(token);
        const expireToken = expire || new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
        setExpireToken(expireToken);
        localStorage.setItem("userData", JSON.stringify({ user, token, expireToken }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        setExpireToken(null);
        localStorage.removeItem('userData');
    }, [])

    // when the user token is expire than the  user data is not remove from the localstroage 
    // so we have to the best solution for this issuse to solve the problem

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData && userData.token && new Date(userData.expireToken) > new Date() &&
            login(userData.user, userData.token, userData.expireToken)
    }, [login]);

    // it will run the function when the token expire 
    useEffect(() => {
        if (token && expireToken) {
            const timeRemain = new Date(expireToken).getTime() - new Date().getTime();
            tokenTracker = setTimeout(() => {
                logout()
            }, timeRemain);
        } else {
            clearTimeout(tokenTracker)
        }
    }, [token, expireToken, logout])
    const providerValue = {
        isLoggedIn: !!token,
        token,
        user,
        login,
        logout
    };

    return (
        <Cotext.Provider value={providerValue}>
            {props.children}
        </Cotext.Provider>
    );

};

export default AuthContext;
