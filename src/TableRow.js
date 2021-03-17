import React from 'react';

const Row = ({ base, amount }) => {
    if(amount === 1){
        return(
            <tr className="table-primary">
            <td>{ base }</td>
            <td>{ amount }</td>
        </tr>
        )
    }
    return(
        <tr>
            <td>{ base }</td>
            <td>{ amount }</td>
        </tr>
    )
}

export default Row;