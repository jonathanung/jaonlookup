import React, { useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import Login from './login';
import Register from './registration';

export default function FormController(props) {
    const [isReg, setIsReg] = useState(false);

    const regDict = {
        true: "Register",
        false: "Login"
    }

    const handleSwap = () => {
        setIsReg(() => {return (!isReg)})
    }
    return (
        <Overlay
            show={props.show}
            target={props.target}
            placement="bottom"
            container={props.innerRef}
            containerPadding={40}>
            <Popover id="popover-contained">
                <Popover.Header className="popover-form-header" style={{color:"black"}}>
                    <h6 className="popover-form-header-text">{regDict[isReg]}</h6>
                    <Button onClick={props.handleClick} size="sm">x</Button>
                </Popover.Header>
                <Popover.Body className="popover-form-parent">
                    {isReg
                        ? <Register setLoaded={props.setLoaded} handleSwap={handleSwap} handleClick={props.handleClick} />
                        : <Login setLoaded={props.setLoaded} handleSwap={handleSwap} handleClick={props.handleClick} />
                    }
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}