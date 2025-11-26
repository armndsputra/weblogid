## `OASE` `Personal` `Website`
# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system (Admin/User)*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user |
| USER  | update user |

---
1. > npm install
2. > create a file with name .env
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

## Example :

### Register
- **Endpoint** : `POST /register`
  **Request Body :**
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

  **Response :**
  ```json
    {
    "message": "succed",
        "data": {
            "name": "***",
            "username": "***",
            "email": "***@mail.com",
            "gender": "famele",
            "birhtday": "00-00-0000",
            "avatar": "default",
            "role": "user",
            "created": "--- --- ---"
        }
    }
  ```


### Login
- **Endpoint** : `POST /login`

**Request Body:**
```json
{
    "email" : "account@mail.com",
    "password" : "******"
}
```
### Response
```json
{
    "message": "you have successfully logged in",
    "access_token": "AccessTokenCode",
    "token_type": "Bearer",
    "expires_in": "1h"
}
```
  
##### Implementation Authentication
*In the access token there are 2 roles admin and user*
***Header***
```json
{
    "Authorization" : "Bearer AccessTokenCode"
}
```
---
## Feature | Admin
### Fetch All User
- **Endpoint** : `GET /user`
  ### Response
  ```json
    {
    "message": "success",
    "data": [
        {
            "id": "***",
            "name": "***",
            "username": "***",
            "email": "***@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "admin",
            "created": "--- --- ---"
        },
        {
            "id": "***",
            "name": "***",
            "username": "***",
            "email": " ***@gmail.com",
            "gender": "famele",
            "birthday": "00-00-0000",
            "avatar": "***.jpeg",
            "role": "user",
            "created": "--- --- ---"
        }
    ]
    }
  ```
  
### Delete User By ID
- **Endpoint** : `DELETE /user/id_user`
  ### Response
  ```json
    {
        "message": "the user has been successfully deleted",
        "deleted": {
            "id": "***",
            "name": "***",
            "user": "***",
            "email": " ***@mail.com"
        }
    }
  ```