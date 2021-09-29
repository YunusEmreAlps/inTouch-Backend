const express = require('express');
var Track = require('../models/track')
const requireAuth = require('../methods/actions');

const router = express.Router();

router.use(requireAuth.authenticate);

router.get('/tracks', async (req, res)=>{
    const tracks = await Track.find({userId:req.user._id});
    res.send(tracks);
});

router.post('/tracks', async (req, res)=>{
    const {name, locations} = req.body;
    if(!name || !locations){
        return  res.status(422).send({error:'you must provide a name and locations'});
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id});
        await track.save();
        res.send(track);
    }catch (err) {
        return  res.status(422).send({error:err.message});
    }

});

module.exports = router;