// MySql dependency
const mysql = require("mysql");

// MySql connection pool
let pool = mysql.createPool({
  connectionLimit: 10,
  host: '119.29.178.132',
  port: 3306,
  user: 'root',
  password: '202020',
  database: 'sign'
})

function query(sql, values) {
  return new Promise((resolve, reject) => {
    // Get connection
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      // If connected, execute query.
      connection.query(sql, values, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}


//在应用程序关闭时断开连接池
process.on('SIGINT', function () {
  pool.end(function (err) {
    if (err) {
      console.log(err);
    }
    process.exit();
  })
});

// insert data
const create = (tableName, data) => {
  const sql = 'INSERT INTO ?? SET ?';
  return new Promise((resolve, reject) => {
    query(sql, [tableName, data]).then(resp => {
      resolve(resp);
    }).catch(err => {
      reject(err);
    })
  });
}

// get data by obj
const getByObj = (tableName, data) => {
  let sql = 'SELECT * FROM  ??  WHERE';
  sql = sql.replace("??", "`" + tableName + "`");
  sql=parseObj(sql,data)
  return query(sql,null);
}
// get one data by id
const getById = (tableName, id) => {
  const sql = 'SELECT * FROM  ??  WHERE id = ?';
  return query(sql, id);
}

// all data
const getAll = (tableName) => {
  const sql = 'SELECT * FROM  ?? ';
  return query(sql, [tableName]);
}


// update data
const update = (tableName, id, data) => {
  const sql = 'UPDATE  ?? SET ? WHERE id = ?';
  return query(sql, [tableName, data, id]);
}

// del data
const del = (tableName, id) => {
  const sql = 'DELETE FROM  ?? WHERE id = ?';
  return query(sql, [tableName, id]);
}



//Will not empty fields after joining together the SQL
const parseObj = (sql, obj) => {
  for (let o in obj) {
    if (obj[o] != null) {
      if (typeof obj[o] === "string") {
        sql += endWithAnd(sql) + o + "='" + obj[o] + "'"
      } else if (typeof obj[o] === "number") {
        sql += endWithAnd(sql) + o + "=" + obj[o]
      } else if (typeof obj[o] === "boolean") {
        if (o) {
          sql += endWithAnd(sql) + o + "=" + 1
        } else {
          sql += endWithAnd(sql) + o + "=" + 0
        }
      }
    }
  }
  return sql;
}
const endWithAnd = (sql) => {
  return sql.endsWith("WHERE") ? " " :" and "
}

module.exports = {pool, getByObj,getAll,getById,update,del,create}
