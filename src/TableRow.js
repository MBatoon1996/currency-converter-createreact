import React from 'react';

const Row = ({ base, amount }) => {
    return(
        <tr>
            <td>{ base }</td>
            <td>{ amount }</td>
        </tr>
    )
}

export default Row;