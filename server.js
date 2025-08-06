const http = require('http');
const username = require('./users');
let userList = username.get();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

 
    if (req.url === '/login' && req.method === 'POST') {
        let body = "";
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            const user = userList.find(u => u.username === username );
            if(user){
              if(user.password==password){
                res.end(JSON.stringify({message:`${username}login successful`}))
              }
              else{
                res.end(JSON.stringify({message:"Incorrect Password"}))
              }
            }
            else{
                res.end(JSON.stringify({message:`Incorrect Username ${username} `}))
            }
            
        });
    }

 
    else if (req.url === '/register' && req.method === 'POST') {
        let newUser = "";
        req.on('data', chunk => {
            newUser += chunk;
        });

        req.on('end', () => {
            const ra = JSON.parse(newUser);
            const exists = userList.some(u => u.username === ra.username);

            if (exists) {
                res.end(JSON.stringify({ message: "Username already exists " }));
            } else {
               userList.push(JSON.parse(newUser)) 
                res.end(JSON.stringify({ message: "User registered successfully " }));
            }
        });
    }


    else if (req.url === '/users' && req.method === 'GET') {
        res.end(JSON.stringify(userList));
    }
    else if(req.url==='/update' && req.method==='PUT'){
       let body="";
       req.on('data',chunk=>{
        body+=chunk;
       }) 
       req.on('end',()=>{
        const updatedData=JSON.parse(body);
        const index=userList.findIndex(u=>u.username==updatedData.username);
        if(index!=-1){
            userList[index]={...userList[index],...updatedData};
            res.end(JSON.stringify({message:"updated successfully"}))
        }else{
            res.end(JSON.stringify({message:"username not found"}));
        }
       })
    }
    else if(req.url==='/delete' && req.method==='DELETE'){
          let body="";
          req.on('data',chunk=>{
            body+=chunk;
          })
          req.on('end',()=>{
            const {username}=JSON.parse(body);
            const index=userList.findIndex(u=>u.username==username);
            if(index!=-1){
                userList.splice(index,1);
                res.end(JSON.stringify({message:"deleted successfully"}));
            }else{
                res.end(JSON.stringify({message:"not found"}))

            }
          })
    }

  
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Route not found " }));
    }
});


const port = 4202;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
