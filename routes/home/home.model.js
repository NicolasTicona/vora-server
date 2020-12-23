let {pool} =  require('../../connection');
const sql = require('mssql/msnodesqlv8');

async function getTeams(){
    
    try{
        let cn = await pool;
        let request = cn.request();

        const teamsResponse = await request.execute('usp_ListTeams');
        
        console.log(teamsResponse)

        return {
            teams: teamsResponse.recordset
        }
    }catch(err){
        return err
    }
}

async function joinTeam(data){
    try{
        let cn = await pool;

        let request = cn.request();

        request.input('vid_user', sql.Int, data.user_id);
        request.input('vid_team', sql.Int, data.team_id);

        const response = await request.execute('usp_JoinTeam');

        return response.recordset[0];

    }catch(err){
        return err
    }
}

async function createTeam(data){
    try{
        let cn = await pool;

        console.log(data);

        let request = cn.request();

        let udtUserList = new sql.Table('udt_createTeamWithUsers');

        udtUserList.columns.add('user_id', sql.Int);
        udtUserList.columns.add('creator', sql.Char(1));

        for(let c of data.collaborators){
            udtUserList.rows.add(c, '0');
        }

        request.input('vname', sql.NVarChar, data.name);
        request.input('vuser_list', udtUserList);


        const response = await request.execute('usp_CreateTeam');
        
        return response.recordset[0];
    }
    catch(err){
        return err
    }
}

module.exports = {
    getTeams,
    createTeam,
    joinTeam
}