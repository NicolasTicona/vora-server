let {pool} =  require('../../connection');
const sql = require('mssql/msnodesqlv8');
const { urlencoded } = require('body-parser');

async function getUsersInTeam(team_id){
    
    try{
        let cn = await pool;
        let request = cn.request();
    
        request.input('vteam_id', sql.Int, team_id);
        const usersResponse = await request.execute('usp_UsersInTeam');
    
        return {
            users: usersResponse.recordset
        }
    }catch(err){
        err
    }
}

async function getUsersInTask(task_id) {
    try{
        let cn = await pool;
        let request = cn.request();
    
        request.input('vtask_id', sql.Int, task_id);
        const usersResponse = await request.execute('usp_UsersInTask');
    
        return {
            users: usersResponse.recordset
        }
    }catch(err){
        err
    }
}

async function removeUserFromTask(task_id, user_id){
    try{
        let cn = await pool;
        let request = cn.request();
    
        request.input('vtask_id', sql.Int, task_id);
        request.input('vuser_id', sql.Int, user_id);
        const usersResponse = await request.execute('usp_RemoveUserFromTask');
        
        return {
            message: usersResponse.recordset[0].statusMessage
        }
    }catch(err){
        err
    }
}


module.exports = {
    getUsersInTeam,
    getUsersInTask,
    removeUserFromTask
}