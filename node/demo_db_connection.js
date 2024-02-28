var mysql = require('mysql')

var con =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"jackspurs"
});

con.connect(function(err){
    if(err)throw err;
    console.log("connected")
    // con.query(sql,function(err,result){
        // if(err)throw err;
        // console.log("Result: "+ result)
    // })
})