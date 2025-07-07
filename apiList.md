# DevTinder API's

auth router
- POST /signup
- POST /login
- POST /logout

## profile router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionrequest router
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/connection
- GET /user/request/
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored , intrested , accepted , rejected 