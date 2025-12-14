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