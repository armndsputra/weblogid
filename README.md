# `O A S E` 
*oase/oasis in Indonesian is a remote and fertile area. depiction of a small framework used to create a simple weblog*

| Layer | Technology |
|-|-|
| ![js Logo](./icons/js.png) | JavaScript |
| <img src="https://nodejs.org/static/images/logo.svg" width="100" alt="Node.js Logo">  | Node.js |
| <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="100" alt="MongoDB"> | Mongodb |


# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system ( ADMIN, USER, GUEST )*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user, fetch user by ID |
| USER  | update user, post content, update content, fetch all content by user ID |
| GUEST | post comments |
| GENERAL  | fetch all contents, fetch content by id, fetch content by keywords |



> ***ADMIN FEATURE :***
- [x] `GET /user` - fetch all user [GO](#fetch-all-user)
- [x] `DELETE /user/id_user` - delete user by ID [GO](#delete-user-by-id)
- [x] `GET /user/id_user` - fetch user by ID [GO](#fetch-user-by-id)
- [x] `PATCH /user/role/id_user` - update user role by ID [GO](#update-user-role-by-id)

> ***USER FEATURE :***
- [x] `POST /postal` - posting content [GO](#posting-content)
- [x] `DELETE /postal/id_content` - delete content [GO](#delete-content)
- [x] `PATCH /postal/id_content` - update content [GO](#update-content)
- [ ] `GET /postal/user` - fetch all content by user ID [GO](guide/doc.md#fetch-all-content-by-user-id)
- [ ] `GET /comment/user` - fetch all comment by user ID
- [ ] `GET /comment/reply` - reply comment

> ***GENERAL FEATURE :***
- [x] `GET /postal` - fetch all content [GO](#fetch-all-content)
- [x] `GET /postal/id_user` - fetch content by ID [GO](#fetch-content-by-id)
- [x] `POST /postal/keyword` - fetch content by keyword [GO](#fetch-content-by-keywords)
  
> ***GUEST FEATURE :***
- [ ] `POST /comment` - post comments


<br>

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
   


<br>

> ### Register
- **Endpoint** : `POST /register`
  ##### Request Body :
  ```json
  {
    "name" : "adipati suryanegara", // required
    "username" : "adipati", // required
    "email" : "adipati@mail.com", // required
    "password" : "admin", // required
    "confirm_password" : "admin", // required
    "birthday" : "12-13-1997", // required
    "gender" : "laki-laki", // required 
  }
  ```

  ##### Response Success :
  ```json
    {
    "success": true,
    "message": "success : user has successfully registered",
    "data": {
        "id": "6934cd9cd68123091a3908e9",
        "name": "adipati suryanegara",
        "username": "adipati",
        "email": "adipati@gmail.com",
        "password": "*********",
        "gender": "laki-laki",
        "birhtday": "12-13-1997",
        "avatar": "default",
        "role": "user",
        "created": "2025-12-06T02:14:17.840Z"
    }
  }
  ```

<br><br>

> ### Login
- **Endpoint** : `POST /login`

##### Request Body :
```json
{
    "email" : "adipati@gmail.com",
    "password" : "admin"
}
```
##### Response Success :
```json
{
    "success" : true,
    "message": "you have successfully logged in",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjY5OTQ5MWRkYjBmNjkzMzZmZDRlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTA2NDE1MSwiZXhwIjoxNzY1MDY3NzUxfQ.rIlzUeyMrfwLI-cfD6WOJvwAhPUYfR4XEFhECrOzFEM",
    "token_type": "Bearer",
    "expires_in": "1h"
}
```
  
#### Implementation Authentication

##### Request Header :
```json
{
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjY5OTQ5MWRkYjBmNjkzMzZmZDRlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTA2NDE1MSwiZXhwIjoxNzY1MDY3NzUxfQ.rIlzUeyMrfwLI-cfD6WOJvwAhPUYfR4XEFhECrOzFEM" // access token code
}
```
<!-- ## ADMIN ACCESS -->
<br><br>

> ### Fetch All User
  - **Endpoint :** `GET /user?limit=0&offset=0`
    
  ##### Response Success :
  ```json
    {
    "success": true,
    "message": "success : user successfully displayed",
    "data": [
        {
            "id": "6934cad44e896cbc5c71a8b7",
            "name": "adipati suryanegara",
            "username": "adipati",
            "email": "adipati@gmail.com",
            "gender": "laki-laki",
            "birthday": "12-13-1997",
            "avatar": "default",
            "role": "user",
            "created": "2025-12-07T00:31:16.831Z"
        },
        {
            "id": "6934cb9c3de0992060c5375e",
            "name": "roro mendut",
            "username": "roro",
            "email": "roro@gmail.com",
            "gender": "laki-laki",
            "birthday": "12-13-1997",
            "avatar": "default",
            "role": "admin",
            "created": "2025-12-07T00:34:36.314Z"
        }
    ]
  }
  ```
  <br><br>
  
> ### Delete User By ID
- **Endpoint** : `DELETE /user/id_user`
##### Response Success :
```json
  {
    "success": true,
    "message": "success : the user has been successfully deleted",
    "data": {
        "id": "6934cad44e896cbc5c71a8b7",
        "name": "adipati suryanegara",
        "username": "adipati",
        "email": "adipati@gmail.com"
    }
  }
```
<br><br>

> ### Fetch User By ID
- **Endpoint** : `GET /user/id_user`
##### Response Success :
```json
{
    "success": true,
    "message": "success : user is displayed by ID",
    "data": {
        "id": "6934ce33d68123091a3908f0",
        "email": "adipati@gmail.com",
        "gender": "laki-laki",
        "birthday": "12-13-1997",
        "role": "user",
        "created": "2025-12-07T00:45:39.880Z"
    }
}
```

<!-- ## USER ACCESS -->
<br><br>

> ### Posting Content
  - **Endpoint** : `POST /postal`
  ##### Request Body :
  ```json
  {
    "title" : "pulang",
    "content" : "******************",
    "thumbnail" : "image.jpg"
  }
  ```
  ##### Response Success :
  ```json
    {
    "success" : true,
    "message": "success : content created successfully",
    "data": {
        "id": "6934cfea1bc8dcb6ed9b5f32",
        "title": "pulang",
        "content": "*****************",
        "thumbnail": "uploads/contents/2025-12-07T00:52:58.011Z-151619766.jpeg",
        "created": "2025-12-07T00:52:58.016Z",
        "author": {
            "_id": "6934ce33d68123091a3908f0",
            "name": "adipati suryanegara"
        }
    }
  }
  ```
<br><br>

  > ### Delete Content
  - **Endpoint** : `DELETE /postal/id_content`
  
   ##### Response Success :
   ```json
   {
    "success": true,
    "message": "success : content successfully deleted",
    "data": {
        "id": "6934cfea1bc8dcb6ed9b5f32",
        "title": "pulang",
        "author": {
            "_id": "6934ce33d68123091a3908f0",
            "name": "adipati suryanegara"
        }
    }
  }
   ```
<br><br>

> ### Update Content
  - **Endpoint** : `PATCH /postal/id_content`
##### Request Body :
```json
{
  "title" : "",
  "content" : "sebuah kampung tradisional dipinggirian kota yogyakarta",
  "thumbnail" : "image.jpg"
}
```
##### Response Success :
```json
{
    "success": true,
    "message": "success : content successfully updated",
    "data": {
        "id": "6934d128ecdef486863838c4",
        "title": "pulang",
        "content": "sebuah kampung tradisional dipinggirian kota yogyakarta",
        "thumbnail": "uploads/contents/2025-12-07T01:57:42.275Z-538175537.jpeg",
        "created": "2025-12-07T00:58:16.444Z",
        "author": {
            "_id": "6934ce33d68123091a3908f0",
            "name": "adipati suryanegara"
        }
    }
}
```


<!-- ## GENERAL ACCESS -->
<br><br>

> ### Fetch All Content
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
    "success": true,
    "message": "success : content successfully displayed",
    "data": [
        {
            "id": "6934d128ecdef486863838c4",
            "title": "pulang",
            "content": "**********",
            "thubnail": "uploads/contents/2025-12-07T01:57:42.275Z-538175537.jpeg",
            "created": "2025-12-07T00:58:16.444Z",
            "author": {
                "_id": "6934ce33d68123091a3908f0",
                "name": "adipati suryanegara"
            }
        }
    ]
}
```

<br><br>
> ### Fetch Content By ID
- **Endpoint** : `GET /postal/id_content`
##### Response Success :
```json
{
    "success": true,
    "message": "success : content is displayed by ID",
    "data": {
        "id": "6934d128ecdef486863838c4",
        "title": "pulang",
        "content": "dikampung yang sepi",
        "thumbnail": "uploads/contents/2025-12-07T01:57:42.275Z-538175537.jpeg",
        "created": "2025-12-07T00:58:16.444Z",
        "author": {
            "_id": "6934ce33d68123091a3908f0",
            "name": "adipati suryanegara"
        }
    }
}
```
<br><br>

> ### Fetch Content By Keywords
- **Endpoint** : `POST /postal/keywords`
##### Request Body :
```json
{
  "keywords" : "pulang"
}
```
##### Response Success : 
```json
{
    "success": true,
    "message": "success : content is displayed by keywords",
    "data": [
        {
            "id": "6934d128ecdef486863838c4",
            "title": "pulang",
            "content": "**********************",
            "thumbnail": "uploads/contents/2025-12-07T01:57:42.275Z-538175537.jpeg",
            "created": "2025-12-07T00:58:16.444Z",
            "author": {
                "_id": "6934ce33d68123091a3908f0",
                "name": "adipati suryanegara"
            }
        }
    ]
}
```
<br><br>

> ### Update User Role By ID
- **Endpoint** : `PATCH /user/role/id_user`
##### Request Body :
```json
{
  " role" : "user"
}
```
##### Response Success : 
```json
{
    "success": true,
    "message": "success : user role successfully updated",
    "data": {
        "user": "adipati suryanegara",
        "role": "user",
        "created": "2025-12-07T00:45:39.880Z"
    }
}
```

<br>

[More Documentation](guide/doc.md)
