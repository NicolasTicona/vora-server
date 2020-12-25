const sql = require('mssql/msnodesqlv8');

async function connectMssql(){
    try{
        let cn = new sql.ConnectionPool({
            server: 'localhost',
            port: 1433,
            database: 'vora',
            driver: 'ODBC Driver 13 for SQL Server',
            options: {
                trustedConnection: true
            } 
        })

        let pool = await cn.connect();

        console.log('BASE DE DATOS: POOL', pool)

        return pool;

    }catch(err){
        console.log('Ocurrió un error', err)
    }
} 

module.exports = {
    pool: connectMssql()
}