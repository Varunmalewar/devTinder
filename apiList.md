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
- GET /user/connection
- GET /user/request/
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignored , intrested , accepted , rejected 