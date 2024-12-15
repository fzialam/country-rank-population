import React from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [param] = useParams()
    return(
        <div>
            <h1>Detail</h1>
            <h3>{param}</h3>
        </div>
    )
}

export default Detail;