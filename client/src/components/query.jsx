import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { Badge } from 'react-bootstrap';

export default function Query(props) {
    const initFormState = {
        url: '',
        key: ''
    }
    const [queryData, setQueryData] = useState(initFormState) 
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQueryData({ ...queryData, [name]: value })
    }

    const getBgCol = () => {
        if (error) {
            return "pink"
        }
        return "antiquewhite"
    } 

    const findKeyArray = (path, key, arr) => {
        let count = 0;
        for (const i of arr) {
            if (i instanceof Object) {
                if (i instanceof Array) {
                    const val = findKeyArray(path + "[" + count + "]", key, arr[i])
                        if (val !== undefined) {
                            return val;
                        } else {
                        const val = findKey(path + "[" + count + ']', key, arr[i])
                        if (val !== undefined) {
                            return val;
                        }
                    }
                }
            }
            count++;
        }
}
    const findKey = (path = "data", key, data) => {
        if (key in data) {
            return {"path" : path + "/" + key, "data" : data[key]}
        } else {
            for (const k in data) {
                if (data[k] instanceof Object) {
                    if (data[k] instanceof Array) {
                        const val = findKeyArray(path + "/" + k, key, data[k])
                        if (val !== undefined) {
                            return val;
                        }
                    } else {
                        const val = findKey(path + "/" + k, key, data[k])
                        if (val !== undefined) {
                            return val;
                        }
                    }
                }
            }
        }
    }

    const findKeyController = (response) => {
        if (response.key !== '') {
            const val = findKey("data", response.key, response.res.data)
            if (val) {
                props.setResponse({ ...queryData, dataset: val })
            } else {
                props.setResponse({ ...queryData, dataset: null })
            }
        } else {
            props.setResponse({url: response.url, dataset:{path: "data", data: response.res.data}})
        }
    }

    const handleSubmit = (e) => {
        setError(false);
        e.preventDefault();
        axios.get(queryData.url)
            .then(res => findKeyController({...queryData, res: res}))
            .catch(err => setError(err))
        
    }

    return (
        <Form className="query-form" onSubmit={handleSubmit} style={{ backgroundColor: getBgCol() }}>
            {error ? <Badge className="error" bg="danger">There was an error with that query. Try again.</Badge>: null}
            <Row className="query-form-row">
                <Col md={7} className="query-form-col">
                    <FormGroup row className="query-form-group">
                        <label htmlFor="url">API URL</label>
                        <Input type="text" name="url" id="url" value={queryData['url'] || ''} onChange={handleChange} style={{'border' : '3px black solid'}} />
                    </FormGroup>
                </Col>
                <Col md={4} className="query-form-col">
                    <FormGroup row className="query-form-group">
                        <label htmlFor="key">JSON Key</label>
                        <Input type="text" name="key" id="key" value={queryData['key'] || ''} onChange={handleChange} style={{'border' : '3px black solid'}}/>
                    </FormGroup>
                </Col>
                <Col md={1} className="query-form-col-button">
                    <FormGroup row className="query-form-group" >
                        <Button type="submit">Submit!</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}