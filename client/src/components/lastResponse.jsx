import React from 'react';

export default function LastResponse(props) {

    return (
        <div className="last-response">
            <h4>Last Response: {props.response.url ? props.response.url : "no responses yet!"}</h4>
            {props.response.res !== undefined ? <div className="last-response-data"> data: { JSON.stringify(props.response.res.data, null, 1 ) }</div>: null}
        </div>
    )
}