var express = require('express');
var router = express.Router();
var MHome = require('./home.model');


router.get('/getTeams', async function(req, res, next) {
    try{

        let response = await MHome.getTeams();

        if(response?.code || response instanceof Error){
            throw String(response);
        }

        res.status(200).json({
            status: 200,
            response
        });
    }catch(err){
        res.status(500).json({
            status: 500,
            err
        })
    }
});

router.post('/createTeam', async function(req, res, next){
    try{

        let teamData = req.body;

        let response = await MHome.createTeam(teamData);

        if(response?.code || response instanceof Error){
            throw String(response);
        }

        res.status(200).json({
            status: 200,
            response
        });
    }catch(err){

        console.log(err);

        res.status(500).json({
            status: 500,
            err
        })
    }
})

router.post('/joinTeam', async function(req, res, next){
    try{

        let data = req.body;

        let response = await MHome.joinTeam(data);

        if(response?.code || response instanceof Error){
            throw String(response);
        }

        res.status(200).json({
            status: 200,
            response
        });
    }catch(err){

        console.log(err);

        res.status(500).json({
            status: 500,
            err
        })
    }
})

module.exports = router;