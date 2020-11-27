var express = require('express');
var router = express.Router();
var Mdash = require('./dashboard.model');

// router.use('**', async function(req, res, next){
//     next();
// });

/* GET users listing. */
router.get('/getDashboardInfo', async function(req, res, next) {
    try{
        let team_id = req.query.team_id;
        let response = await Mdash.getDashboardInfo({team_id});

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

router.post('/createTask', async function(req, res, next){
    try{

        let taskData = req.body;

        let response = await Mdash.createTask(taskData);

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

router.post('/updateTask', async function(req, res, next){
    try{

        let taskData = req.body;

        let response = await Mdash.updateTask(taskData);

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
