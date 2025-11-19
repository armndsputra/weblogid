# RESTful API `OASE` `Personal Website`
---
## Overview
1. > npm install
2. > .env
   
    > #server
    > PORT='3000'
    > #DATABASE MONGODB URL
    > MONGODB_URL = ''
    > #JWT KEY
    > JWT_KEY = ''


3. > npm start
   
### Register

- `POST /register` - Register User
  ```json
  {
    "name" : "my name", // required | 
    "username" : "user123", // required
    "email" : "@mail.com", // required
    "password" : "***", // required
    "confirm_password" : "***", // required
    "birthday" : "12-10-1996", // required
    "gender" : "male",
  }
  ```