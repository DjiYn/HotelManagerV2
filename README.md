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
1. Clone Github repository to your [directory];
2. cd [directory];
3. Clone Github of https://github.com/VytenisKaj/LibraryWebService
```
git clone https://github.com/VytenisKaj/LibraryWebService
```
4. docker-compose up [-d];

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
```

Body:
    {
        "roomID": "643eeb9baa987d1229d8789c"
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
