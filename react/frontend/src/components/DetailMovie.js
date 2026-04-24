import React, { useRef, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import './main.css';

function DetailMovie() {

    const path = window.location.href.split('/');

    const id_ = path[path.length - 2]
    const page_ = path[path.length - 1]

    const id = useRef();

    // const id = path[path.length - 1]

    const navigate = useNavigate();

    const title = useRef();

    const price = useRef();

    const synopsis = useRef();

    const img = useRef();

    console.log(id_)

    const [movie, setMovie] = useState([]);

    

    function getMovie(url){

        fetch(url)

            .then(response => { return response.json(); })

            .then(data => {setMovie(data); });

    }

    console.log(movie)

  

    useEffect(() => {getMovie(`/detailMovie/${id_}`);}, []);

    const url = `http://localhost:8090/download/${id_}`;
    let img_ = '';
    img_ = `<img src='${url}' width='200px' alt=''/>`;

    return (

        <>

            <h2>영화 상세</h2>

            <table>

                <tbody>

                    <tr>

                        <td>영화ID</td>

                        <td><input ref={id} defaultValue={movie.id} readOnly/></td>

                    </tr>

                    <tr>

                        <td>영화제목</td>

                        <td><input ref={title} defaultValue={movie.title}/></td>

                    </tr>

                    <tr>

                        <td>가격</td>

                        <td><input type="number" ref={price} defaultValue={movie.price} /></td>

                    </tr>

                    <tr>

                        <td>줄거리</td>

                        <td><textarea rows="5" cols="60" ref={synopsis} defaultValue={movie.synopsis}/></td>

                    </tr>
                    <tr>
                        <td>영화이미지</td>
                        <td>
                            <span dangerouslySetInnerHTML={{__html: img_}}></span>
                            <input type='file' ref={img}/>
                        </td>
                    </tr>
                    <tr>

                        <td colSpan='2' align='center'>

                            <button type="button" onClick={() => {
                                const form = new FormData();
                                let jsonBodyData = {
                                    'id': id.current.value,
                                    'title': title.current.value,
                                    'price': price.current.value,
                                    'synopsis': synopsis.current.value
                                }
                                form.append('movie', new Blob([JSON.stringify(jsonBodyData)], {
                                    type: 'application/json'
                                }));
                                if (img.current.files != null) {
                                    form.append('img', img.current.files[0]);
                                }
                                fetch('/saveMovie', {

                                    method: 'POST',

                                    body:  form

                                }).then(() => {

                                    navigate('/');

                                })

                            }}>수정</button>
                            <button type='button' onClick={() => {
                                if (window.confirm('삭제할까요?')) {
                                    fetch(`/deleteMovie/${movie.id}`,
                                    {method: 'delete'})
                                    .then(() => {
                                        navigate('/')
                                    });
                                }
                            }}>삭제</button>

                            <button onClick={() => navigate(`/page/${page_}`)}>영화목록</button>

                        </td>

                    </tr>

                </tbody>

            </table>

        </>

    )

}

export default DetailMovie;
