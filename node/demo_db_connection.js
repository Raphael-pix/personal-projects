var mysql = require('mysql')

var con =  mysql.createConnection({
    host:"localhost",
    user:"myadmin",
    password:"Raphael2004",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var query = "DROP TABLE customers";
    con.query(query,function(err,result){
        if(err)throw err;
        console.log("Table deleted")
    })
})