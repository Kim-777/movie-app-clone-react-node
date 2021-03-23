import React, {useEffect, useState} from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    const [Movie, setMovie] = useState({});
    const [Casts, setCasts] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    const movieId = props.match.params.movieId;

    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

    useEffect(() => {
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log('movie', response);
            setMovie(response);
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCasts(response.cast);
            setCrews(response.crew);
            
        })



    }, [])

    const toggleActorCrew = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}

            {Movie.backdrop_path &&
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280/${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />           
            
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>

                <Favorite movie={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                
                {/* Movie info */}
                <MovieInfo movie={Movie}/>

                <br />
                {/* Actors Grid */}

                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorCrew}> {ActorToggle ? `Toggle Crew View` : `Toggle Actor View`} </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        <React.Fragment>
                            {Casts && Casts.map((cast, index) => (
                                    <GridCards key={index}
                                        image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    />
                            ))}
                        </React.Fragment>
                    </Row>                
                }

                {!ActorToggle && 
                    <Row gutter={[16, 16]}>
                        <React.Fragment>
                            {Crews && Crews.map((crews, index) => (
                                    <GridCards key={index}
                                        image={crews.profile_path ? `${IMAGE_BASE_URL}w500${crews.profile_path}` : null}
                                        characterName={crews.name}
                                    />
                            ))}
                        </React.Fragment>
                    </Row>                     
                }

                





            </div>
        </div>
    )
}

export default MovieDetail
