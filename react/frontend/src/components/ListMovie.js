import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './main.css';
import MovieItem from './MovieItem';
import Pagination from './Pagination';

function ListMovie() {
    const [movies, setMovieList] = useState([]);
    const [movieLength, setMovieLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    //조회 여부
    const [searchYn, setSearchYn] = useState(false);
    const title = useRef();
    const navigate = useNavigate();

    const path = window.location.href.split('/');
    const page_ = path[path.length - 1] == '' ? 1 : path[path.length - 1];
    console.log('넘어온 페이지:' + page_);

    function getList(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { 
                setMovieList(data.content); 
                setMovieLength(data.totalElements); 
            });
    }

    function searchTitle(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { 
                
                setMovieList(data);
               
            });
    }

    useEffect(() => { 
        getList(`/findAllMovies/${page_}`); 
        setCurrentPage(page_);
    }, []);

    //const indexOfLast = currentPage * postsPerPage;  // 10
    //const indexOfFirst = indexOfLast - postsPerPage; // 0
    const currentMovies = (currentPage) => {
        if (searchYn == false) {
            getList(`/findAllMovies/${currentPage}`);
        } else {
            getList(`/findByTitle/${title.current.value}/${currentPage}`);
        }
        setCurrentPage(currentPage);
    };

    return (
        <>
            <h2>영화목록 page={currentPage}</h2>
            타이틀: <input name="title" ref={title} />
            <button type='button' onClick={() => {
                //const title = title.current.value;
                if (title.current.value == '') {
                    alert('제목을 입력하세요');
                    return false;
                }
                getList(`/findByTitle/${title.current.value}`)
                setSearchYn(true);
            }}>
                조회
            </button><br/><br/>
            <button onClick={() => navigate('/addMovie')}>영화 추가</button>
            등록된 영화수: {movieLength}편
            <br/><br/>
            <div style={{
                display: 'grid',
                gridTemplateRows: '1fr',
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }}>
                {movies.map(
                    ({ id , title, price, synopsis }) => (
                        <MovieItem
                            id={id}
                            title={title}
                            price={price}
                            page={currentPage}
                        />
                    )
                )}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={movieLength}
                paginate={currentMovies}></Pagination>
        </>
    )
}

export default ListMovie;