import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop';
import Button from '../Button';
import './Model.css';

const ModelOverlay = (props) => {
    console.log(props)
    const content = (
        <>
            <div ref={props.refs} className={`card model ${props.modelClass}`}>
                <header className={`model_header ${props.modelHeaderClass}`}>
                    <h2>{props.header}</h2>
                    <hr />
                </header>
                <div className={`model_body ${props.modelBodyClass}`}>
                    {props.children}
                </div>

                <footer className={`model_footer ${props.modelFooterClass}`}>
                    <Button onClick={props.modelclose}>close</Button>
                    {props.footer}
                </footer>
            </div>
        </>
    )
    return ReactDOM.createPortal(content, document.getElementById('model_wrapper'));
};

const Model = (props) => {

    const nodeRef = React.useRef(null);
    return (
        <>
            {props.show && <Backdrop onClick={props.modelclose} />}
            <CSSTransition
                in={props.show}
                timeout={300}
                mountOnEnter
                nodeRef={nodeRef}
                unmountOnExit
                classNames="model_fade"
                
            >
                <ModelOverlay refs={nodeRef} {...props} />
            </CSSTransition>

        </>
    )
}
export default Model;