import {React, useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import axios from "axios";

/**
 * The login form for the application
 * @returns the login component
 */
export default function Login(props){
    const initFormState = {
        email: '',
        password : ''
    };
    const [user, setUser] = useState(initFormState);
    const [visible, setVisible] = useState(false);
    const [valid, setValid] = useState(true)

    const passDict = {
        true: ['text', 'Hide Password!'],
        false: ['password', 'Show Password!']
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value });
    }

    const showPass = (e) => {
        visible ? setVisible(false) : setVisible(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', user, { withCredentials: true })
            .then(res => props.setLoaded(false))
            .catch(err => setValid(false), setUser(initFormState))
    }

    return(
        <div className="login-form">
            <Form onSubmit={handleSubmit}>
                {!valid? <Badge bg="danger">Username or password incorrect!</Badge>: null}
                <FormGroup row>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" value={user.email || ''} onChange={handleChange} autoComplete="email"/>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="password">Password</Label>
                    <Input type={passDict[visible][0]} name="password" id="password" value={user.password || ''} onChange={handleChange} autoComplete="password"/> 
                    <Button color="secondary" onClick={showPass} size="sm">{passDict[visible][1]}</Button>
                </FormGroup>
                <FormGroup row>
                    <Button color="primary" type="submit">Login</Button>
                </FormGroup>
            </Form>

            <p>Don't have an account? <Button onClick={props.handleSwap}>Register here!</Button></p>
        </div>
    )
}