import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap'
import FormController from './formController';
import axios from 'axios';

/**
 * Navigation component for the website
 * @param {} props 
 * @returns navigation component
 */
export default function Navigation(props) {
    const [show, setShow] = useState(false)
    const [target, setTarget] = useState(null)
    const ref = useRef(null)

    const handleClick = (e) => {
        show ? setShow(false) : setShow(true);
        setTarget(e.target)
    }

    const logout = () => {
        axios.get("http://localhost:8000/api/user/logout", { withCredentials: true })
            .then(res => props.setLoaded(false))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.loaded === false) {
            setShow(false);
        }
    }, [props.loaded])
    if(props.loaded) {
        return (
            <Navbar className="navigation" style={{'backgroundColor' : '#97FFFF', 'border': 'solid 5px black', 'borderRadius': '10px' }}>
                <Container>
                    <Navbar.Brand href="/">jsonlookup</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end" ref={ref}>
                        {props.user._id
                            ? <NavDropdown title={props.user.firstName + " " + props.user.lastName}>
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            :   <Button onClick={handleClick}>login!</Button>
                        }
                        <FormController setLoaded={props.setLoaded} innerRef={ref} show={show} target={target} handleClick={handleClick} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}