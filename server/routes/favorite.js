const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {

    Favorite.find({movieId: req.body.movieId})
        .exec((err, favorite) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, favoriteNumber: favorite.length})
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

            return res.status(200).json({success: true, favorited: result});
        })
})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return response.status(400).send(err)
            return res.status(200).json({success: true, doc});
        })

})


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
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, favorites})
        })

});

router.post('/deleteFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, result) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, result});
        })

})
module.exports = router;
