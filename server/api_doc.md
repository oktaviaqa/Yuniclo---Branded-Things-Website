# Branded Things API Documentation

## Endpoints:
List of available endpoints:

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `GET /categories`
- `POST /register`
- `POST /login`
- `PUT /products/:id`
- `PATCH /products/:id`
&nbsp;

## 1. POST /products
Description:
- Create new product

Request:
- headers:
```json
{
    "access_token": "string"
}
```
- body:
```json
{
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "status": "Active"
}
```
_Response (201 - Created)_
```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "status": "Active"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Name is required"
}
OR
{
    "message": "Description is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Price must be grater than 50.000"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

&nbsp;

## 2. get /products

Description:
- Get all product from database

Request:
- headers:
```json
{
    "access_token": "string"
}
```
_Response(200 - OK)_
```json
[
    {
        "id": 5,
        "name": "baju",
        "description": "fsjefnnfsl",
        "price": 60000,
        "stock": 10,
        "imgUrl": "rtyuio",
        "categoryId": 23,
        "authorId": 6,
        "createdAt": "2023-10-02T14:46:01.738Z",
        "updatedAt": "2023-10-02T14:46:01.738Z",
        "User": {
            "id": 6,
            "username": "user1",
            "email": "user1@example.com",
            "password": "$2b$10$36iH83l6QjYJ01cP7kOKP.FBbv/QHJjXSj/Nx9znrVrvUGUroCN6.",
            "role": "user",
            "phoneNumber": "123-456-7890",
            "address": "123 Main St",
            "createdAt": "2023-10-02T13:29:27.088Z",
            "updatedAt": "2023-10-02T13:29:27.088Z"
        }
    }
    ...,
]
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response(500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /products/:id

Description: 
- Get product by id

Request:
- headers:
```json
{
    "access_token": "string"
}
```
- params:
```json
{
    "id": "integer (required)"
}
```
_Response(200 - OK)_
```json
{
    "id": 5,
    "name": "baju",
    "description": "fsjefnnfsl",
    "price": 60000,
    "stock": 10,
    "imgUrl": "rtyuio",
    "categoryId": 23,
    "authorId": 6,
    "createdAt": "2023-10-02T14:46:01.738Z",
    "updatedAt": "2023-10-02T14:46:01.738Z"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response (404 - Error not found)_
```json
{
    "message": "Error not found"
}
```
_Response(500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 4. DELETE /products/:id
Description: 
-  Delete product by id

Request:
- headers:
```json
{
    "access_token": "string"
}
```
- params:
```json
{
    "id": "integer (required)"
}
```
_Response(200 - OK)_
```json
{
    "message": "Product success to delete"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Forbidden"
}
```
_Response (404 - Error not found)_
```json
{
    "message": "Error not found"
}
```
_Response(500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 4. GET /categories
Description:
- get all categories from database

Request:
- headers:
```json
{
    "access_token": "string"
}
```
_Response(200 - OK)_
```json
[
    {
        "id": 22,
        "name": "Dresses",
        "createdAt": "2023-10-02T13:29:26.812Z",
        "updatedAt": "2023-10-02T13:29:26.812Z"
    },
    {
        "id": 23,
        "name": "Shorts",
        "createdAt": "2023-10-02T13:29:26.812Z",
        "updatedAt": "2023-10-02T13:29:26.812Z"
    },
    ...,
]
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response(500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 5.  POST /register
Description:
- Create new admin

Request:
- body:
```json
{
    "username": "string", 
    "email": "string",
    "password": "string",
    "phoneNumber": "integer",
    "address": "string",
}
```
_Response (201 - Created)_
```json
{
    "username": "string", 
    "email": "string",
    "password": "string",
    "role": "admin",
    "phoneNumber": "integer",
    "address": "string"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Email is required"
}
OR
{
    "message": "Please use the correct email format: user@example.com"
}
OR
{
    "message": "Email is already exists"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "The password must be 5 to 10 characters long"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 6.  POST /login
Description:
Login as a user or admin

Request:
- body:
```json
{
    "email": "string",
    "password": "string"
}
```
_Response (200 - OK)_
```json
{
    "access_token": "string"
}
```
_Response (401 - Bad Request)_
```json
{
    "message": "Invalid password or username"
}
```
_Response (400 - Unauthorized)_
```json
{
    "message": "Invalid token"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 7.  PUT /products/:id
Description:
Edit product list

Request:
- headers:
```json
{
    "access_token": "string"
}
```
- params:
```json
{
    "id": "integer (required)"
}
- body:
```json
{
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
}
```
_Response (200 - OK)_
```json
{
    "message": "Product has been updated"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Name is required"
}
OR
{
    "message": "Description is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "Price must be grater than 50.000"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

## 8.  PATCH /products/:id
Description:
Edit status from product table

Request:
- headers:
```json
{
    "access_token": "string"
}
```
- params:
```json
{
    "id": "integer (required)"
}
- body:
```json
{
    "status": "string"
}
```
_Response(200 - OK)_
```json
{
    "message": "Status has been updated"
}
```
_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthenticated"
}
```
_Response (403 - Forbidden)_
```json
{
    "message": "Forbidden"
}
```
_Response (404 - Error not found)_
```json
{
    "message": "Error not found"
}
```
_Response(500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

