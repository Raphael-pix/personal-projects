const http = require('http')
const fs = require('fs')


//read file
http.createServer(function(req,res){
    fs.readFile("../javascript/weather app/index.html",function(err,data){
        res.writeHead(200,{"content-type":"text/html"});
        res.write(data);
        return res.end();
    });
}).listen(8080)


//create and update files
fs.appendFile("demofile.txt","hello world",function(data,err){
    if (err) throw err
    console.log("saved!")
})
//appends the specified content at the end of the specified file.Also used for updating files

fs.open("demofile.txt","w",function(err,file){
    if(err)throw err
    console.log("saved!")
})

fs.writeFile("demofile.txt","Good morning",function(err,data){
    if (err) throw err
    console.log("saved")
})
//re-writes the content inside the specified file.Also used for updating files


//delete file
fs.unlink("demofile.txt",function(err){
    console.log("deleted")
})


//renaming file
fs.rename("demofile.text","demofile.txt",function(err){
    if(err)throw err
    console.log("renamed")
})