var express = require('express');
var router = express.Router();
var MUsers = require('./users.model');

router.get('/getCollaborators', async function(req, res, next) {
    try{
        let response = await MUsers.getCollaborators();

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

router.post('/login', async function(req, res){
    try{
        let email = req.body.email;
        let password = req.body.password;

        console.log(email)
        console.log(password)

        let response = await MUsers.userLogIn(email, password);

        if(response?.code || response instanceof Error){
            throw String(response);
        }

        if(response.user.teams){
            response.user.teams = response.user.teams.split(',');
        }else{
            response.user.teams = [];
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
} )


router.get('/prueba', async function(req, res, next){
    res.json({
        message: 'hola'
    })
})


module.exports = router;