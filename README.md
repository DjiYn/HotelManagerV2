Vilnius University project about web services. Hotel room manager.

## Hotel Manager
### How to use API?

To start application:

Required applications:
```
Docker
```

Used additional service from:
https://github.com/VytenisKaj/LibraryWebService

Instructions:
1. Clone Github repository to your [directory] with --recursive flag to clone submodule too;
2. cd [directory];
3. docker-compose up [-d];

## API

Service works on port 80.

### Users

#### GET request

Returns a list of all users in database.

```
URI: /users
```

Returns user by their ID.

```
URI: /users/64197f89c47f17d076421261
```

Returns user's booked rooms by their ID.

```
URI: /users/64197f89c47f17d076421261/rooms
```

Returns user's booked books by their ID.

```
URI: /users/64197f89c47f17d076421261/books
```

#### PUT request

Updates user's information.

```
URI: /users/64197f89c47f17d076421261

Body:
    {
        "Name": "Peter", 
        "Surname": "Smith" 
    }
```

Books a room for a user.

```
URI: /users/64197f89c47f17d076421261/rooms

Body:
    {
        "roomID": "643eeb9baa987d1229d8789c"
    }
```

Books a book for a user.

```
URI: /users/64197f89c47f17d076421261/books


Body:
    {
        "bookID": "643eeb9baa987d1229d8789c"
    }
```

#### POST request

Adds user to a database.

```
URI: /users

Body:
    {
        "Name": "Peter", 
        "Surname": "Smith" 
    }
```

#### DELETE request

Deletes user from database.

```
URI: /users/64197f89c47f17d076421261
```

Removes all booked rooms from user

```
URI: /users/64197f89c47f17d076421261/rooms
```

Removes all booked books from user

```
URI: /users/64197f89c47f17d076421261/books
```

### Hotel Rooms

#### GET request

Returns a list of all rooms in database.

```
URI: /rooms
```

Returns a room by its ID.

```
URI: /rooms/64197f89c47f17d076421261
```

Returns user's that booked room by its ID.

```
URI: /rooms/64197f89c47f17d076421261/users
```

#### PUT request

Removes all users from room.

```
URI: /rooms/64197f89c47f17d076421261
```

Books a room for a user.

```
URI: /rooms/64197f89c47f17d076421261/users

Body:
    {
        "userID": "64197f89c47f17d076421261"
    }
```

#### POST request

Adds new room to a database.

```
URI: /rooms

Body:
    {
        "roomName: "VIP", 
        "roomPrice": "1000.00 EUR" 
    }
```

#### DELETE request

Deletes room from database.

```
URI: /rooms/64197f89c47f17d076421261
```

### Books

#### GET request

Returns a list of all books available in database from API service.

```
URI: /libraryAPI/books
```

Returns book by their ID.

```
URI: /libraryAPI/books/1
```

#### PUT request

Updates books's information.

```
URI: /libraryAPI/books/1

Body:
{
    "title": "string",
    "isbn": "string",
    "createdDate": "2023-05-16T19:46:52.097Z",
    "authorId": 0,
    "description": "string",
    "isAvailable": true,
    "unavailableUntil": "2023-05-16T19:46:52.097Z"
}
```

#### POST request

Adds a new book to a database.

```
URI: /libraryAPI/books/

Body:
{
    "title": "string",
    "isbn": "string",
    "createdDate": "2023-05-16T19:46:52.097Z",
    "authorId": 1,
    "description": "string",
    "isAvailable": true,
    "unavailableUntil": "2023-05-16T19:46:52.097Z"
}
```

#### DELETE request

Deletes a book from database.

```
URI: /libraryAPI/books/1
```