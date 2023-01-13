import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/navigation';

export default function Profile() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({})
    const [userResponses, setUserResponses] = useState([])
    const navigate = useNavigate();

    const dualChain = (data) => {
        setUserResponses(data)
        setLoaded(true)
    }

    const chain = (data) => {
        setUser(data)
        axios.get('http://localhost:8000/api/query/getUserQueries', { withCredentials: true })
            .then(res => dualChain(res.data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (!loaded) {
            axios.get('http://localhost:8000/api/user/current', { withCredentials: true })
                .then(res => chain(res.data))
                .catch(err => navigate('/'))
        }
    }, [loaded])

    const deleteDataset = (id) => {
        axios.delete(`http://localhost:8000/api/query/delete/${id}`, { withCredentials: true })
            .then(res => setLoaded(false))
            .catch(err => console.error(err))
    }

    return (
        <div className="profile">
            <Navigation user={user} loaded={loaded} setLoaded={setLoaded} />
            <h1>{user.firstName + " " + user.lastName +"'s"} queries</h1>
            <div className="response-list">
                {userResponses.isEmpty ? null : userResponses.map((res, i) => {
                    return (
                        <div className="response-list-data" key={i}>
                            <p>URL:{res.url}</p>
                            {res.key ? <p> Key: {res.key}</p> : null}
                            Dataset: {res.dataset instanceof Object ? <p> {res.dataset.path ? res.dataset.path : null} {"->"} {JSON.stringify(res.dataset.data)} </p> : null}
                            <Button onClick={() => deleteDataset(res._id)}>Delete</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}