var mysql = require('mysql')

var con =  mysql.createConnection({
    host:"localhost",
    user:"myadmin",
    password:"Raphael2004",
    database:"mydb"
});

con.connect(function(err){
    var query = "SELECT * FROM customers";
    if(err)throw err;
    con.query(query,function(err,result,fields){
        if(err)throw err;
        console.log(fields)
    })
})