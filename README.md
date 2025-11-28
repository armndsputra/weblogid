## `OASE` `Personal` `Website`

| Layer | Technology |
|-|-|
| ![js Logo](./icons/js.png) | JavaScript |
| <img src="https://nodejs.org/static/images/logo.svg" width="100" alt="Node.js Logo">  | Node.js |
| <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="100" alt="MongoDB"> | Mongodb |


# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system ( Admin/User )*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user |
| USER  | update user, post content |
| GENERAL  | fetch all contents, fetch content by id, fetch content by keywords |

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
  
3. > npm start | npm run dev
---

### Register
- **Endpoint** : `POST /register`
  ##### Request Body :
  ```json
  {
    "name" : "--- --- ---", // required
    "username" : "------", // required
    "email" : "------@mail.com", // required
    "password" : "------", // required
    "confirm_password" : "------", // required
    "birthday" : "00-00-0000", // required
    "gender" : "------", // required 
  }
  ```

  ##### Response Success :
  ```json
    {
    "message": "succed",
        "data": {
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "birhtday": "00-00-0000",
            "gender": "famele",
            "avatar": "default.jpg",
            "role": "user", // default role
            "created": "--- --- ---"
        }
    }
  ```


### Login
- **Endpoint** : `POST /login`

##### Request Body :
```json
{
    "email" : "------@mail.com",
    "password" : "------"
}
```
##### Response Success :
```json
{
    "message": "you have successfully logged in",
    "access_token": "--- --- --- ---",
    "token_type": "Bearer",
    "expires_in": "1h"
}
```
  
#### Implementation Authentication

##### Request Header :
```json
{
    "Authorization" : "Bearer --- --- --- ---" // access token code
}
```
## ADMIN ACCESS
***FEATURE :***
- [x] `GET /user` - fetch all user
- [x] `DELETE /user/id_user` - delete user


### 1. Fetch All User
  - **Endpoint :** `GET /user`
  ##### Response Success :
  ```json
    {
    "message": "success",
    "data": [
        {
            "id": "-------",
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "admin",
            "created": "--- --- ---"
        },
        {
            "id": "-------",
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "user",
            "created": "--- --- ---"
        }
    ]
    }
  ```
  
### 2. Delete User By ID
- **Endpoint** : `DELETE /user/id_user`
##### Response Success :
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



## USER ACCESS
***FEATURE :***
- [x] `POST /postal` - posting content
- [x] `DELETE /postal/id_content` - delete content

### 1. Posting Content
  - **Endpoint** : `POST /postal`
  ##### Request Body :
  ```json
  {
    "title" : "--- --- ---",
    "content" : "--- --- ---"
  }
  ```
  ##### Response Success :
  ```json
  {
    "message": "succeed",
    "data": {
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thumbnail": "uploads/contents/------",
        "created": "--- --- ---",
    }
  }
  ```
  ### 2. Delete Content
  - **Endpoint** : `DELETE /postal/id_content`
  
   ##### Response Success :
   ```json
   {
    "message": "deleted",
    "deleted": {
        "id": "------",
        "title": "--- --- ---"
    }
  }
   ```

## GENERAL ACCESS
***FEATURE :***
- [x] `GET /postal` - fetch all content
- [x] `GET /postal/id_user` - fetch by id content
- [x] `POST /postal/keyword` - fetch by keyword
  
### 1. Fetch All Content
  - **Endpoint** : `GET /postal/?limit=0&offset=0`
  ##### `Pagination` Params :
  ```json
  {
    "limit" : 0,
    "offset" : 0
  }
  ```
  ##### Response Success : 

```json
{
    "message": "success",
    "data": [
        {
            "id": "------",
            "user": "------",
            "title": "--- --- ---",
            "content": "--- --- ---",
            "thubnail": "uploads/contents/------",
            "created": "--- --- ---",
        }
    ]
}
```

### 2. Fetch Content By ID
- **Endpoint** : `GET /postal/id_content`
##### Response Success :
```json
{
    "message": "success",
    "data": {
        "id": "------",
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thubnail": "uploads/contents/------",
        "created": "--- --- ---",
    }
}
```

### 3. Fetch Content By Keywords
- **Endpoint** : `POST /postal/keywords`
##### Request Body :
```json
{
  "keywords" : "--- --- ---"
}
```
##### Response Success : 
```json
{
    "message": "success",
    "data": [
        {
        "id": "------",
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thubnail": "uploads/contents/------",
        "created": "--- --- ---",
        }
    ]
}
```