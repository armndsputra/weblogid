> ### Commenter
- **Endpoint** : `POST /api/commenter/id_content`
- [Return to the link list](../README.md#link-list-)
  ##### Request Body :
  ```json
  {
    "comment" : "good post", // required
  }
  ```
  ### Response Success : 
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

  > ### Fetch All Commneter by ID
- **Endpoint** : `GET /api/commenter/id_content?limit=2&offset=0`
- [Return to the link list](../README.md#link-list-)

  ### Response Success : 

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