import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Button } from 'antd'
function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.favoriteNumber);
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.');
                }
            });

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setFavorited(response.data.favorited);
                } else {
                    alert('favorite 여부 정보 가져오기 실패했습니다.')
                }
            })

    }, []);

    const onClickFavorite = () => {

        if(Favorited) {

            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(false);
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
                    }
                })

        } else {

            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(true);
                    } else {
                        alert('Favorite 리스트에 추가하는 걸 실패했습니다.');
                    }
                })

        }

    }




    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"}  {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
