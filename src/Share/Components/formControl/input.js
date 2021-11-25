import React, { useEffect, useReducer } from 'react';
import { validate } from '../../util/Validators';
import './input.css';


const stateHandler = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouch: true
            }
        case 'RESET':
            return {
                value: '',
                isValid: false,
                isTouch: false
            }

        default:
            return state
    }
}
const Input = (props) => {
    const {
        elementType,
        type,
        placeholder,
        id,
        rows,
        onPress,
        error,
        validators,
        value,
        valid
    } = props;


    const [inputValue, dispatch] = useReducer(stateHandler, {
        value: value || '',
        isValid: valid || false,
        isTouch: false
    })
    useEffect(() => {
        if (props.reset) {
            dispatch({ type: "RESET" })
        }
    }, [props.reset])

    useEffect(() => {
        onPress(id, inputValue.value, inputValue.isValid)
    }, [inputValue.value, inputValue.isValid, onPress, id])

    const changeHandler = (event) => {
        dispatch({ type: "CHANGE", value: event.target.value, validators: validators })
    }

    const touchHandler = () => {
        dispatch({ type: "TOUCH" })
    }

    const element = elementType === 'input' ?
        <input
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            id={id}
            value={inputValue.value}
            onBlur={touchHandler}
        /> :
        <textarea
            placeholder={placeholder}
            onChange={changeHandler}
            id={id}
            rows={rows || 3}
            value={inputValue.value}
            onBlur={touchHandler}
        />
    return (
        <div className={`form-group ${(!inputValue.isValid && inputValue.isTouch) ? 'form-group__invalid' : (inputValue.isValid && !inputValue.isTouchsd) ? 'form-group__valid' : ''}`} >
            <label htmlFor="id" className="form-label">{props.label}</label>
            {element}
            {!inputValue.isValid && inputValue.isTouch && <span className="error_invalid">{error}</span>}
        </div>
    );
};

export default Input;

