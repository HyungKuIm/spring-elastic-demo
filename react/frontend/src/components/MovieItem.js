import React from "react";
import { Link } from "react-router-dom";
import './main.css';
function MovieItem({ id, title, price, synopsis, page }) {
    const url = `http://localhost:8090/download/${id}`;
    let img = '';
    img = `<img src='${url}' width='100px' alt=''/><br/>`;
    return (
        <div style={{ margin: '5px' }}>
            <Link to={`/detail/${id}/${page}`}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
            
                영화제목: {title} <br />
                가격: {price}원 <br/>
            </Link>
            
        </div>
    )
}
export default MovieItem;