# RESTful API `OASE` `Personal Website`
---
## Overview
1. > npm install
2. > add .env file
   ```
    #server
    PORT='3000'
    #DATABASE MONGODB URL
    MONGODB_URL = ''
    #JSON Web Token (JWT) Key
    JWT_KEY = ''
   ```
  
3. > npm start
   ---
### Register
- `POST /register` - Register
  
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

### Login
- `POST /login` - Login
  
  ```json
  {
    "email" : "@mail.com", // required
    "password" : "***", // required
  }
  ```

### Update User ( User )
- `PATCH /user/id_user` - Update
  
  - Requires header authorization 
    ```json
    {
      "Authorization" : "Bearer "
    }
    ```
- Bequest body
  ```json
  {
    "name" : "name",
    "gender": "famele",
    "birthday" : "12-10-1945",
    "avatar" : "default.jpg" // file
  }
  ```