import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import { Row } from 'antd';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';


function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPageNumber, setCurrentPageNumber] = useState(0)


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        patchMovies(endpoint);
        
    }, [])

    const patchMovies = (endpoint) => {

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovies(Movies.concat(response.results));
            //if(CurrentPageNumber===1) {
                setMainMovieImage(response.results[0]);
            //}
            setCurrentPageNumber(response.page);
        })        
    }

    const loadMore = () => {
        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPageNumber+1}`;
        patchMovies(endpoint);

    }

    return (
        <div style={{width: '100%', margin: '0'}}>

            {/* Main Image */}

            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
                            title={MainMovieImage.original_title}
                            text={MainMovieImage.overview}
                />            
            }
            

            <div style={{width: '85%', margin: '1em auto'}}>

                <h2> Movies by latest </h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    
                    
                    <React.Fragment>
                        {Movies && Movies.map((movie, index) => (
                                <GridCards
                                    Movie
                                    key={index}
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                        ))}
                    </React.Fragment>

                    
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMore}> Load More </button>
            </div>

        </div>
    )
}

export default LandingPage
