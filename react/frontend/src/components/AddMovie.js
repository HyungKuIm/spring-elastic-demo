import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import './main.css';
function AddMovie() {
    const navigate = useNavigate();
    //const id = useRef();
    const title = useRef();
    const price = useRef();
    const synopsis = useRef();
    const img = useRef();
    return (
        <>
            <h2>영화 추가</h2>
            <table>
                <tbody>
                    {/* <tr>
                        <td>영화ID</td>
                        <td><input ref={id} /></td>
                    </tr> */}
                    <tr>
                        <td>영화제목</td>
                        <td><input ref={title} /></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input type="number" ref={price} /></td>
                    </tr>
                    <tr>
                        <td>줄거리</td>
                        <td><textarea rows="5"
                                cols="60" 
                                ref={synopsis} /></td>
                    </tr>
                    <tr>
                        <td>영화이미지</td>
                        <td>
                            <input type='file' ref={img}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' align='center'>
                            <button type='button' onClick={() => {
                                const form = new FormData();
                                let jsonBodyData = {
                                    'title': title.current.value,
                                    'price': price.current.value,
                                    'synopsis': synopsis.current.value
                                }
                                form.append('movie', new Blob([JSON.stringify(jsonBodyData)], {
                                    type: 'application/json'
                                }));
                                form.append('img', img.current.files[0]);

                                fetch('/saveMovie', {
                                    method: 'POST',
                                    // encType: 'multipart/form-data',
                                    body: form
                                }).then(() => {
                                    navigate('/');
                                })
                            }}>
                                추가
                            </button>
                            <button onClick={() => navigate('/')}>영화목록</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}
export default AddMovie;