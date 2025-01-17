import React from 'react'
import { Col } from 'antd';

function GridCards(props) {

    if(props.Movie) {

        return (
            <Col lg={6} md={8} xs={24} >
                <div style={{ position: 'relative'}} >
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{width:'100%', height:'450px'}} src={props.image} alt={props.movieName}/>
                        
                    </a>
                </div>
            </Col>
        )

    } else {

        return (
            <div>
                {props.image &&
                    <Col lg={6} md={8} xs={24} >

                        <div style={{ position: 'relative'}} >
                                <img style={{width:'100%', height:'450px'}} src={props.image} alt={props.characterName}/>
                        </div>
                    </Col>            
                }
            </div>
        
        )        

    }

}

export default GridCards
