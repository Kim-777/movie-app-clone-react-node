import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Button } from 'antd';

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false);

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movie.title;
    const moviePost = props.movie.backdrop_path;
    const movieRuntime = props.movie.runtime;

    const variables = {
        movieId,
        userFrom,
        movieTitle,
        moviePost,
        movieRuntime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    console.log('favorite', response.data);
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert(' favorite number taken failed...')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    console.log('favorited', response);
                    setFavorited(response.data.favorited)
                } else{
                    alert('failed...')
                }
            })

    }, [])

    const onClickFavorite = () => {

        if(Favorited) {

            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber -1)
                        setFavorited(false);
                    } else {
                        alert('failed...');
                    }
                })

        } else {

            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(true);
                    } else {
                        alert('failed to addToFavorite')
                    }
                })

        }
    }

    return (
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
