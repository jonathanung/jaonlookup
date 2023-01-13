import React from 'react';

export default function ResponseList(props) {
    const getName = (i) => {
        if (i === 0) return "response-list-data-new"
        else return "response-list-data"
    }
    return (
        <div className="response-list">
            <h4>Previous Responses:</h4>
            {props.responseArray.isEmpty ? null : props.responseArray.map((res, i) => {
                return (
                    <div className={getName(i)} key={i}>
                        <p>URL:{res.url}</p>
                        {res.key ? <p> Key: {res.key}</p> : null}
                        Dataset: {res.dataset instanceof Object ? <p> {res.dataset.path ? res.dataset.path : null} {"->"} {JSON.stringify(res.dataset.data)} </p> : null}
                    </div>
                )
            })}
        </div>
    )
}