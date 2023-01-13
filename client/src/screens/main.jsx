import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Navigation from '../components/navigation';
import Query from '../components/query';
import LastResponse from '../components/lastResponse';
import ResponseList from '../components/responseList';


export default function Main() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({})
    const [response, setResponse] = useState({})
    const [responseArray, setResponseArray] = useState([])

    useEffect(() => {
        if (!loaded) {
            axios.get('http://localhost:8000/api/user/current', { withCredentials: true })
            .then(res => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch(err => {
                setUser({});
                setLoaded(true);
            })
        }
    }, [loaded])

    useEffect(() => {
        if (response.url) {
            if (user._id) {
                axios.post("http://localhost:8000/api/query/create", response, { withCredentials: true })
                    .then(res => res)
                    .catch(err => console.log(err))
            }
            setResponseArray([response, ...responseArray])
        }
    }, [response])

    return (
        <div className="mainpage">
            <Navigation user={user} loaded={loaded} setLoaded={setLoaded} />
            <Query response={response} setResponse={setResponse} />
            <Row className="mainpage-content">
                <Col md={6}>
                    <ResponseList responseArray={responseArray} />
                </Col>
                <Col md={6}>
                    <LastResponse response={response} />
                </Col>
            </Row>
        </div>
    )
}