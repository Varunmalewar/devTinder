# DevTinder API's

auth router
- POST /signup
- POST /login
- POST /logout

## profile router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## connectionrequest router
- POST /request/send/status/:userId
 status can be ignored or intrested





- POST /request/review/:status/:requestId
 status accept or reject


## userRouter
- GET /user/request/received
- GET /user/connection
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored , intrested , accepted , rejected 


# Pagination
/feed?page=1&limit=10 => first 10 users 1-10

/feed?page=2&limit=10 => users 11-20

/feed?page=3&limit=10 => users 21-30   .skip(20) & .limit(10)

/feed?page=4&limit=10 => users 31-40

.skip() & .limit() functions given by mongo 
.skip(0) & .limit(10) it will give first 10


skip formula will be (pageno.-1)*limit