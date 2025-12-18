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
| ADMIN | delete user, fetch user, delete comment, traffic log |
| USER  | update user, post content, update content, fetch content, fetch comment, traffic post |
| GUEST | post comment |
| GENERAL  | fetch content, fetch comment, login, register |

### Link List :

> ***ADMIN***
- [x] `GET /api/account/user/?limit=0&offset=0` - fetch all user  [GO](#fetch-all-user)
- [x] `DELETE /api/account/user/id_user` - delete one user by ID [GO](#delete-one-user-by-id)
- [x] `GET /api/account/user/id_user` - fetch one user by ID [GO](#fetch-one-user-by-id)
- [x] `PATCH /api/account/user/role/id_user` - update one user role by ID [GO](#update-one-user-role-by-id)
- [x] `DELETE /api/commenter/id_commenter` - delete one comment by ID [GO](guide/doc.md#delete-one-comment-by-id)
- [x] `GET /api/traffic - fetch all traffic log` [GO](guide/doc.md#fetch-all-traffic-log)

> ***USER***
- [x] `POST /api/post` - post content [GO](#posting-content)
- [x] `DELETE /api/post/id_content` - delete one content by ID [GO](#delete-one-content-by-id)
- [x] `PATCH /api/post/id_content` - update one content by ID [GO](#update-content)
- [x] `GET /api/post/user?limit=2&offset=0` - fetch all content by user ID [GO](guide/doc.md#fetch-all-content-by-user-id) 
- [x] `GET /api/commenter/id_content?limit=2&offset=0` - fetch all commenter by ID [GO](guide/doc.md#fetch-all-commenter-by-id)
<!-- - [ ] `GET /api/commenter/reply` - reply commenter -->
- [x] `PATCH /api/account/user/id_user` - update user by ID [GO](guide/doc.md#update-user-by-ID)

> ***GUEST***
- [x] `POST /api/commenter` - commenter [GO](guide/doc.md#commenter)

> ***GENERAL***
- [x] `GET /api/post/?limit=0&offset=0` - fetch all content [GO](#fetch-all-content)
- [x] `GET /api/post/id_content` - fetch one content by ID [GO](#fetch-one-content-by-id)
- [x] `POST /api/post/keywords?limit=0&offset=0` - fetch all content by keywords [GO](#fetch-all-content-by-keywords)
- [x] `POST /api/account/register` - register user [GO](#register)
- [x] `POST /api/account/login` - login user [GO](#login)
- [x] `GET /api/commenter/?limit=0&offset=0` - fetch all comment [GO](guide/doc.md#fetch-all-commenter)
  


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
- **Endpoint** : `POST /api/account/register`
-  [Return to the link list](#link-list-)
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
- **Endpoint** : `POST /api/account/login`
-  [Return to the link list](#link-list-)

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
  - **Endpoint :** ``GET /api/account/user/?limit=0&offset=0``
    
   - [Return to the link list](#link-list-)

  ##### Response Success :
  ```json
  {
    "success": true,
    "message": "success : user successfully displayed",
    "data": [
        {
            "id": "693bb530d613027903742a41",
            "name": "adipati suryanegara",
            "username": "adipati",
            "email": "adipati@mail.com",
            "gender": "male",
            "birthday": "28011997",
            "avatar": "default.jpg",
            "role": "admin",
            "createdAt": "2025-12-12T06:24:48.435Z"
        }
    ]
  }
  ```
  <br><br>
  
> ### Delete One User By ID
- **Endpoint** : `DELETE /api/account/user/id_user`
- [Return to the link list](#link-list-)
##### Response Success :
```json
{
    "success": true,
    "message": "success : the user has been successfully deleted",
    "data": {
        "id": "693cf5c3cf74fba8da5b5e67",
        "name": "nadin aminah",
        "username": "nadin",
        "email": "nadin@mail.com"
    }
}
```
<br><br>

> ### Fetch One User By ID
- **Endpoint** : `GET /api/account/user/id_user`
- [Return to the link list](#link-list-)
##### Response Success :
```json
{
    "success": true,
    "message": "success : user is displayed by ID",
    "data": {
        "id": "693bb530d613027903742a41",
        "email": "adipati@mail.com",
        "gender": "male",
        "birthday": "28011997",
        "role": "admin",
        "createdAt": "2025-12-12T06:24:48.435Z"
    }
}
```

<!-- ## USER ACCESS -->
<br><br>

> ### Posting Content
  - **Endpoint** : `POST /api/post`
  - [Return to the link list](#link-list-)
  ##### Request Body :
  ```json
  {
    "title" : "buruh pabrik",
    "content" : "Lorem Ipsum is simply dummy text .....",
    "thumbnail" : "image.jpg"
  }
  ```
  ##### Response Success :
  ```json
  {
    "success": true,
    "message": "success : content created successfully",
    "data": {
        "id": "693cfab2cf74fba8da5b5e82",
        "title": "buruh pabrik",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text  of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "thumbnail": "uploads/posts/2025-12-13T05:33:38.540Z-523537722.jpeg",
        "createdAt": "2025-12-13T05:33:38.545Z",
        "author": {
            "_id": "693cf7e9cf74fba8da5b5e75",
            "name": "nadin aminah"
        }
    }
  }
  ```
<br><br>

  > ### Delete One Content by ID
  - **Endpoint** : `DELETE /api/post/id_content`
  - [Return to the link list](#link-list-)
  
   ##### Response Success :
   ```json
  {
    "success": true,
    "message": "success : content successfully deleted",
    "data": {
        "id": "693cfab2cf74fba8da5b5e82",
        "title": "buruh pabrik",
        "author": {
            "_id": "693cf7e9cf74fba8da5b5e75",
            "name": "nadin aminah"
        }
    }
  }
   ```
<br><br>

> ### Update Content
  - **Endpoint** : `PATCH /postal/id_content`
  - [Return to the link list](#link-list-)
##### Request Body :
```json
{
  "title" : "buruh pabrik kulonprogo",
  "content" : "Lorem Ipsum is simply dummy text.....",
  "thumbnail" : "image.jpg"
}
```
##### Response Success :
```json
{
    "success": true,
    "message": "success : content successfully updated",
    "data": {
        "id": "693cfa10cf74fba8da5b5e7c",
        "title": "buruh pabrik kulonprogo",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "thumbnail": "uploads/posts/2025-12-13T05:46:32.553Z-515117181.jpeg",
        "createdAt": "2025-12-13T05:30:56.495Z",
        "author": {
            "_id": "693cf7e9cf74fba8da5b5e75",
            "name": "nadin aminah"
        }
    }
}
```


<!-- ## GENERAL ACCESS -->
<br><br>

> ### Fetch All Content
  - **Endpoint** : `GET /api/post/?limit=0&offset=0`
-  [Return to the link list](#link-list-)
  ##### Response Success : 

```json
{
    "success": true,
    "message": "success : content successfully displayed",
    "data": [
        {
            "id": "693cfa10cf74fba8da5b5e7c",
            "title": "buruh pabrik kulonprogo",
            "content": "hidden",
            "thubnail": "uploads/posts/2025-12-13T05:46:32.553Z-515117181.jpeg",
            "createdAt": "2025-12-13T05:30:56.495Z",
            "author": {
                "_id": "693cf7e9cf74fba8da5b5e75",
                "name": "nadin aminah"
            }
        }
    ]
}
```

<br><br>

> ### Fetch One Content By ID
- **Endpoint** : `GET /api/post/id_content`
- [Return to the link list](#link-list-)
##### Response Success :
```json
{
    "success": true,
    "message": "success : content is displayed by ID",
    "data": {
        "id": "693cfa10cf74fba8da5b5e7c",
        "title": "buruh pabrik kulonprogo",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "thumbnail": "uploads/posts/2025-12-13T05:46:32.553Z-515117181.jpeg",
        "createdAt": "2025-12-13T05:30:56.495Z",
        "author": {
            "_id": "693cf7e9cf74fba8da5b5e75",
            "name": "nadin aminah"
        }
    }
}
```
<br><br>

> ### Fetch All Content By Keywords
- **Endpoint** : `POST /api/post/keywords?limit=0&offset=0`
- [Return to the link list](#link-list-)
##### Request Body :
```json
{
  "keywords" : "pabrik"
}
```
##### Response Success : 
```json
{
    "success": true,
    "message": "success : content is displayed by keywords",
    "data": [
        {
            "id": "693cfa10cf74fba8da5b5e7c",
            "title": "buruh pabrik kulonprogo",
            "content": "hidden",
            "thumbnail": "uploads/posts/2025-12-13T05:46:32.553Z-515117181.jpeg",
            "createdAt": "2025-12-13T05:30:56.495Z",
            "author": {
                "_id": "693cf7e9cf74fba8da5b5e75",
                "name": "nadin aminah"
            }
        }
    ]
}
```
<br><br>

> ### Update One User Role By ID
- **Endpoint** : `PATCH /api/account/user/role/id_user`
- [Return to the link list](#link-list-)
##### Request Body :
```json
{
  "role" : "user" // admin, user, guest
}
```
##### Response Success : 
```json
{
    "success": true,
    "message": "success : user role successfully updated",
    "data": {
        "name": "nadin aminah",
        "username": "nadin",
        "email": "nadin@mail.com",
        "role": "user",
        "createdAt": "2025-12-13T05:21:45.123Z"
    }
}
```

<br>

[More Documentation](guide/doc.md)
