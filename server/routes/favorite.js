const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================


router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져옵니다.
    Favorite.find({movieId : req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // 그다음에 프론트에 다시 숫자 정보를 보내줍니다.
            return res.status(200).json({success: true, favoriteNumber: info.length});
        })
    

})

router.post('/favorited', (req, res) => {

    Favorite.find({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);

            let result = false;

            if(info.length !== 0) {
                result = true;
            }

            res.status(200).json({success: true, favorited: result});
        })

})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc)=> {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, doc});
        })

});


router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, doc});
    })

})

router.post('/getFavoritedMovie', (req, res) => {

    Favorite.find({userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, favorites})
        })
});

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, result) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true});
        })

})

module.exports = router;
