var express = require('express');
var router = express.Router();
var MUsers = require('./users.model');

router.get('/getUsersInTeam', async function(req, res, next) {
    try{
        let team_id = req.query.team_id;

        let response = await MUsers.getUsersInTeam(team_id);

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

router.get('/getUsersInTask', async function(req, res, next) {
    try{
        let task_id = req.query.task_id;

        let response = await MUsers.getUsersInTask(task_id);

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
})

router.post('/removeUserFromTask', async function(req, res, next){
    try{
        let task_id = req.body.task_id;
        let user_id = req.body.user_id;

        let response = await MUsers.removeUserFromTask(task_id, user_id);

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
})


module.exports = router;