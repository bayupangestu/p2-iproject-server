## Endpoint

list of available endpoint:

- `GET /`
- `POST /register`
- `POST /login`
- `POST /threads`
- `GET /threads/:id`
- `POST /threads/:id/posts`
- `GET /concerts`
- `GET /news`
- `POST /xendit`

&nbsp;

## 1 . GET /

**Description**

- Get all data thread

**Request**

_200 - OK_

- Body

```json
{
        "id": 2,
        "title": "bisa",
        "content": "dong",
        "imageUrl": "please",
        "userId": 2,
        "createdAt": "2022-04-19T16:25:39.875Z",
        "updatedAt": "2022-04-19T18:09:04.179Z",
        "user": {
            "id": 2,
            "username": "user1",
            "email": "user1@mail.com",
            "password": "$2a$10$6f8AFbVY9AYs0PJCjXfO3uCsZqyMBmEyvASQx.u1lqhBwgUVGKLOO",
            "bio": "first acc",
            "imageUrl": "testtt",
            "createdAt": "2022-04-19T08:32:58.300Z",
            "updatedAt": "2022-04-19T08:32:58.301Z"
        },
        "post": [
            {
                "id": 7,
                "title": "comment",
                "body": "first comment",
                "createdAt": "2022-04-20T14:06:15.696Z",
                "updatedAt": "2022-04-20T14:06:15.696Z",
                "userId": 2,
                "threadId": 2
            },
        ]
```

&nbsp;

## 8. GET /posts/:id

**Description**

- Read detail post