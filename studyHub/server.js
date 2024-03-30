const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const session = require('express-session')
const fs  = require('fs')
const cookies = require('cookie-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

const secretSession = uuidv4()
app.use(cookieParser())
app.use(session({
    secret:secretSession,
    resave:true,
    saveUninitialized:true,
    cookie: { secure: false }
}))

const saltRounds = 10;

const db =  mysql.createConnection({
    host:"localhost",
    user:"myadmin",
    password:"Raphael2004",
    database:"studyhub_connect"
});
db.connect((err)=>{
    if(err)throw err
    console.log('database connected successfully')
})


app.get('/register',(req,res)=>{
    res.render('sign-up.ejs')
})
app.post('/register',(req,res)=>{

    const {email,password,conpassword} = req.body

    const username = uuidv4();

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).send('Please enter a valid email address.')
    }
    if (password.length < 6  || password.length >30){
        return res.status(400).send('Password must be 6 and 30 characters.')
    }
    if(password !== conpassword){
        return res.status(400).send('Passwords do not match')
    }

    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if (err) throw err
        const insertQuery = 'INSERT INTO user_profile (username,email,password) VALUES (?,?,?)'
        const insertParams = [username,email,hash]
        
        db.query(insertQuery,insertParams,(err,result)=>{
            if(err){
                res.status(500).json({message:err})
            }
            console.log('User registered successfully:', result);
            res.redirect('/login')
        })

    })


})

app.get('/login',(req,res)=>{
    res.render('log-in.ejs')
})
app.post('/login', (req,res)=>{
    const {email,password} = req.body

    const profilePicture = req.file ? req.file.buffer : null
    req.session.profilePicture = profilePicture

    const selectQuery = 'SELECT * FROM user_profile WHERE email = ?'
    const selectParams = [email]

    db.query(selectQuery,selectParams,(err,result)=>{
        if (err){
            console.error('Error querying database:, ' ,err)
            return res.send('An error occured:'+ err)
        }
        if(result.length == 0){
            return res.send('Invalid login credentials. please try again')
        }

        const user = result[0]

        bcrypt.compare(password,user.password,(bcryptErr,bcryptResults)=>{
            if(bcryptErr){
                console.error('Error comparing passwords:',bcryptErr)
                return res.send('An error occurred. Please try again')
            }
            if(bcryptResults){
                req.session.email = email
                req.session.loggedIn = true

                user.loginCount++

                const updateQuery = 'UPDATE user_profile SET loginCount = ? WHERE email = ?';
                const updateParams = [user.loginCount, email];

                db.query(updateQuery, updateParams, (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating loginCount:', updateErr);
                        return res.send('An error occurred. Please try again');
                    }
                
                    const redirectPath = user.loginCount === 1 ? '/createProfile' : '/';
                    res.redirect(redirectPath);
                });
                } else {
                    res.send('Invalid login credentials. Please try again');
                }
                
        })

    })
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});

function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        return next(); 
    } else {
        res.redirect('/login');
    }
}

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './public/uploads/')
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})
const upload = multer({storage})

app.get('/createProfile',requireLogin,(req,res)=>{
    const email = req.session.email;
    const profilePicture = req.session.profilePicture
    if(req.session.email){
        res.render('profile-creation.ejs',{profilePicture , email})
    }else{
        res.redirect('/login')
    }
})
app.post('/createProfile',upload.single('profilePicture') ,(req,res)=>{
    if(req.session.email){
        const {username,fname,lname,DOB,school} = req.body
        const profilePicture = req.file ? req.file.filename : 'default-profile-photo.jpg'
        const intrestsArray = Array.isArray(req.body.intrests) ? req.body.intrests : [req.body.intrests];
        const email = req.session.email


        const profilePicturePath = saveProfilePictureToDatabase(email, profilePicture);
        const updateQuery = 'UPDATE user_profile SET username=?, first_name=?, last_name=?, DOB=?, school=?, intrests=?, profile_picture=?, profile_picture_path=? WHERE email=?';
        const updateParams = [username, fname, lname, DOB, school, intrestsArray.join(','), profilePicture,profilePicturePath ,email];

        db.query(updateQuery,updateParams,(err,result)=>{
            if (err){
                console.error('Error querying database:, ' ,err)
                return res.send('An error occured:'+ err)
            }
                console.log('profile created successfully')
                req.session.profilePicture = profilePicture
                req.session.profilePicturePath = profilePicturePath
                res.redirect('/')
            })
        }else{
            res.redirect('/login')
        }
    })

    function saveProfilePictureToDatabase(email,profilePicture){
        const profilePicturePath = '/uploads/' + email +'-profile-picture'

        const filePath = path.join(__dirname, 'public', 'uploads', email + '-profile-picture');
        fs.writeFile(filePath,profilePicture,'binary',(err)=>{
            if(err){
                console.err('Error saving profile picture',err)
            }else{
                console.log('Profile picture saved successfully.')
                const updateQuery = 'UPDATE user_profile SET profile_picture_path = ? WHERE email = ?';
                const updateParams = [profilePicturePath, email];

                db.query(updateQuery, updateParams, (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating profile picture path:', updateErr);
                    } else {
                        console.log('Database updated with profile picture path.');
                    }
                });
            }
        })

        return profilePicturePath
    }

    app.get('/',requireLogin ,(req,res)=>{
        const email = req.session.email
        const profilePicture = req.session.profilePicture|| 'default-profile-photo.jpg'

        db.query('SELECT * FROM user_messages WHERE email = ? AND isRead = 0', [email],(err,messages)=>{
            if(err){
                console.error("Error fetching messages from database:" , err)
                return res.status(500).send('An error occurred. Please try again.');
            }
            
            res.render('index',{ profilePicture , messages})
        })
    })

    app.locals.formatTime = function (time) {
        const options = { hour: 'numeric', minute: 'numeric' };
        return new Date(time).toLocaleTimeString(undefined, options);
    };

    app.get('/createGroupProfile',requireLogin ,(req,res)=>{
        const profilePicture = req.session.profilePicture
        const email = req.session.email
        res.render('group-creation.ejs',{profilePicture,email})
    })
    app.post('/createGroupProfile',upload.single('profilePicture'), (req, res) => {
        if (req.session.email) {
          const { groupname, members, rules, interests } = req.body;
          const profilePicture = req.file ? req.file.filename : 'default-profile-photo.jpg';
          console.log(req.file)
          const email = req.session.email
          const admin = email
          const groupId = uuidv4();
          const intrestsArray = Array.isArray(req.body.intrests) ? req.body.intrests : [req.body.intrests];
          console.log(email,admin,profilePicture,intrestsArray)
      
          const profilePicturePath = saveProfilePictureToDatabase(email, profilePicture);
      
          const insertQuery = 'INSERT INTO studygroups (GroupId,Admin,Name, Members, Rules,Intrests, profile_picture_path) VALUES (?,?, ?, ?, ?, ?,?)';
          const insertParams = [groupId,admin,groupname, members, rules, intrestsArray.join(','), profilePicturePath];
      
          db.query(insertQuery, insertParams, (err, result) => {
            if (err) {
              console.error('Error inserting group details into database:', err);
              return res.send('An error occurred. Please try again.');
            }
      
            console.log('Group profile created successfully');
            res.redirect('/');
          });
        } else {
          res.redirect('/login');
        }
      });


    app.get('/createstudyRoom', requireLogin ,(req,res)=>{
        const profilePicture = req.session.profilePicture
        const email = req.session.email
        res.render('room-creation.ejs',{profilePicture,email})
    })


app.get('/api/searchMembers', (req, res) => {
    const searchQuery = req.query.query
    const query = 'SELECT * FROM user_profile WHERE username LIKE ?';
    const searchTerm = `%${searchQuery}%`;

    db.query(query, [searchTerm], (err, results) => {
        if (err) {
            console.error('Error searching members:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results)
        const members = results.map(member => ({
            id: member.User_id, 
            name: member.username
        }));

        res.json(members);
    });
});

app.post('/api/addMemberToGroup', (req, res) => {
    const memberId = req.body.memberId;

    // TODO: Implement logic to add the member to the group in your database
    // For example, you might have a 'group_members' table with columns 'group_id' and 'user_id'
    const groupId = 1; // Replace with the actual group ID

    // Insert the member into the group in the database
    const insertQuery = 'INSERT INTO group_members (group_id, user_id) VALUES (?, ?)';
    db.query(insertQuery, [groupId, memberId], (err, result) => {
        if (err) {
            console.error('Error adding member to the group:', err);
            return res.status(500).json({ error: 'Failed to add member to the group' });
        }

        console.log('Member added to the group successfully');
        res.json({ success: true });
    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})