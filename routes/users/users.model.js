let {pool} =  require('../../connection');
const sql = require('mssql/msnodesqlv8');

async function getCollaborators(){
    try{
        let cn = await pool;
        let request = cn.request();
    
        const response = await request.execute('usp_ListCollaborators');
    
        return {
            collaborators: response.recordset
        }
    }catch(err){
        return err;
    }
}

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
        return err
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
        return err
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
        return err
    }
}

async function userLogIn(email, password){
    try{
        let cn = await pool;
        let request = cn.request();

        console.log(email, password)
    
        request.input('vemail', sql.VarChar, email);
        request.input('vpassword', sql.VarChar, password);
        const usersResponse = await request.execute('usp_UserLogin');

        return {
            user: usersResponse.recordset[0]
        }
    }catch(err){
        console.log(err);
       return err
    }
}


module.exports = {
    getUsersInTeam,
    getUsersInTask,
    removeUserFromTask,
    userLogIn,
    getCollaborators
}