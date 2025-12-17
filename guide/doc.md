> ### Commenter
- **Endpoint** : `POST /api/commenter/id_content`
- [Return to the link list](../README.md#link-list-)
  ##### Request Body :
  ```json
  {
    "comment" : "good post", // required
  }
  ```
  ##### Response Success : 
  ```json
  {
    "success": true,
    "message": "comment added to post 693cfa10cf74fba8da5b5e7c successfully",
    "comment": {
        "id": "693d00e01c9b5882cf7da38c",
        "commenter": "693d0023f2c4ecadc9160542",
        "content": "693cfa10cf74fba8da5b5e7c",
        "comment": "good post",
        "createdAt": "2025-12-13T06:00:00.481Z"
    }
  }
  ```

  <br><br>

  > ### Fetch All Commenter by ID
- **Endpoint** : `GET /api/commenter/id_content?limit=2&offset=0`
- [Return to the link list](../README.md#link-list-)

  ##### Response Success : 

  ```json
  {
    "success": true,
    "message": "comments for post 693cfa10cf74fba8da5b5e7c fetched successfully",
    "comments": [
        {
            "id": "693d00e01c9b5882cf7da38c",
            "commenter": "693d0023f2c4ecadc9160542",
            "content": "693cfa10cf74fba8da5b5e7c",
            "comment": "good post",
            "createdAt": "2025-12-13T06:00:00.481Z"
        }
    ]
  }
  ```

  <br><br>

    > ### Update User By ID
- **Endpoint** : `PATCH /api/account/user/id_user`
- [Return to the link list](../README.md#link-list-)

  ##### Request Body :
  ```json
  {
    "name" : "",
    "gender" : "",
    "birthday" : "23012004",
    "avatar" : "image.jpg"
  }
  ```
  ##### Response Success : 
  ```json
  {
    "success": true,
    "message": "success : user successfully updated",
    "data": {
        "name": "nadin aminah",
        "username": "nadin",
        "email": "nadin@mail.com",
        "gender": "male",
        "birthday": "23012004",
        "createdAt": "2025-12-13T05:21:45.123Z",
        "avatar": "uploads/users/2025-12-14T03:56:23.896Z-245960213.png"
    }
  }
  ```

  <br><br>

  > ### Fetch All Traffic Log
- **Endpoint** : `GET /api/traffic`
- [Return to the link list](../README.md#link-list-)

  ##### Response Success : 
  ```json
    {
    "success": true,
    "message": "success fetch all traffic logs",
    "data": [
        {
            "_id": "6940e2bef7c544fb6243c6d1",
            "ip": "::1",
            "userID": "693bb530d613027903742a41",
            "username": "adipati",
            "userAgent": "PostmanRuntime/7.49.1",
            "url": "/api/traffic?limit=2&offset=2",
            "method": "GET",
            "timestamp": "2025-12-16T04:40:30.708Z",
            "createdAt": "2025-12-16T04:40:30.712Z",
            "__v": 0
        }
    ]
  }
  ```


    <br><br>

  > ### Delete One Comment By ID
- **Endpoint** : `GET /api/commenter/id_comment`
- [Return to the link list](../README.md#link-list-)
  ##### Response Success : 

```json
{
    "success": true,
    "message": "comment deleted successfully",
    "deletedComment": {
        "id": "69425208734d0ad301996386",
        "commenter": "69425066b235a2412428f040",
        "content": "69424f1d83cdba82025151b5",
        "comment": "this is a comment",
        "createdAt": "2025-12-17T06:47:36.244Z"
    }
}
```

  <br><br>

  > ### Fetch All Commenter
- **Endpoint** : `GET /api/commenter/?limit=0&offset=0`
- [Return to the link list](../README.md#link-list-)
  ##### Response Success : 

```json
{
    "success": true,
    "message": "all comments fetched successfully",
    "comments": [
        {
            "id": "694259f7a473befeb8cf3bac",
            "commenter": "69425066b235a2412428f040",
            "content": "69424f1d83cdba82025151b5",
            "comment": "good",
            "createdAt": "2025-12-17T07:21:27.540Z"
        }
    ]
}
```