let {pool} =  require('../../connection');
const sql = require('mssql/msnodesqlv8');

async function getDashboardInfo(data){
    try{
        let cn = await pool;
        let {team_id} = data;

        const taskResponse = await getTasks(cn, team_id);
        const userInTeamResponse = await getUsersInTeam(cn, team_id);
        const teamInfoResponse = await getTeamInfo(cn, team_id);

        return {
            tasks: taskResponse.recordset,
            users: userInTeamResponse.recordset,
            teamInfo: teamInfoResponse.recordset
        };
    }catch(err){
        return err
    }
}

async function createTask(data){
    try{
        let cn = await pool;

        let request = cn.request();

        let udtUserList = new sql.Table('udt_createTaskWithUsers');

        udtUserList.columns.add('user_id', sql.Int);
        udtUserList.columns.add('creator', sql.Char(1));

        for(let c of data.collaborators){
            udtUserList.rows.add(c.user_id, '0');
        }

        request.input('vteam_id', sql.Int, data.team_id);
        request.input('vname', sql.NVarChar, data.name);
        request.input('vfinish_at', sql.DateTime, data.finish_at);
        request.input('vdescription', sql.NVarChar, data.description);
        request.input('vstate', sql.Char, '0');
        request.input('vuser_list', udtUserList);


        const response = await request.execute('usp_CreateTask');
        
        return response.recordset[0]
        
    }catch(err){
        return err
    }
}

async function updateTask(data){
    let cn = await pool;

    let request = cn.request();

    console.log(data);

    let udtUserList = new sql.Table("udt_editTaskAddUsers");

    udtUserList.columns.add('user_id', sql.Int);
    udtUserList.columns.add('creator', sql.Char(1));

    for(let c of data.collaborators){
        udtUserList.rows.add(c.user_id, '0');
    }

    request.input('vtask_id', sql.Int, data.task_id);
    request.input('vname', sql.NVarChar, data.name);
    request.input('vfinish_at', sql.DateTime, data.finish_at);
    request.input('vdescription', sql.NVarChar, data.description);
    request.input('vstate', sql.Char, '0');
    request.input('vuser_list', udtUserList);

    
    const response = await request.execute('usp_UpdateTask');
        
    return response.recordset[0];
}

async function deleteTask(task_id){
    let cn = await pool;
    let request = cn.request();

    request.input('vtask_id', sql.Int, task_id);

    console.log("isadjsiad", task_id);

    const response = await request.execute('usp_DeleteTask');

    console.log(response);

    return response.recordset[0];
}


async function getTasks(cn, team_id){
    let request = cn.request();

    request.input('vteam_id', sql.Int, team_id);
    const taskResponse = await request.execute('usp_ListTasks');

    return taskResponse;
}

async function getUsersInTeam(cn, team_id){
    let request = cn.request();

    request.input('vteam_id', sql.Int, team_id);
    const usersResponse = await request.execute('usp_UsersInTeam');

    return usersResponse
}

async function getTeamInfo(cn, team_id){
    let request = cn.request();

    request.input('vteam_id', sql.Int, team_id);
    const teamInfo = await request.execute('usp_GetTeam');

    return teamInfo
}

module.exports = {
    getDashboardInfo,
    createTask,
    updateTask,
    deleteTask
}