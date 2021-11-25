import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Sidedrawer.css'


const Sidedrawer = (props) => {
    const nodeRef = React.useRef(null);
    const content = (
        <CSSTransition
            in={props.isSideDrawerOpen}
            timeout={200}
            mountOnEnter
            nodeRef={nodeRef}
            unmountOnExit
            classNames="sidedrawer-fade"
        >

            <aside ref={nodeRef} onClick={props.onClick} className='sidedrawer__list'>
                {props.children}
            </aside>


        </CSSTransition>

    )
    return ReactDOM.createPortal(content, document.getElementById('sidedrawer__container'))
};

export default Sidedrawer;

// a new concept react potal are introduce using the react portal we can render the component in 
// in any place of the body node tree 