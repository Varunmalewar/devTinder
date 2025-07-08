const express = require('express');
// const User = require("../models/user")
const {userauth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userauth, async (req,res)=>{

    try{
       const fromUserId = req.user._id; // Logging person userId
       const toUserId = req.params.toUserId; // UserId of the person to whom the request is sent

       const status = req.params.status; // Status of the connection request, can be 'ignored' or 'intrested'

       const allowedStatus= ['ignored','intrested']
       if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status type " +status})

       }

         // Check if the user is trying to send a request to themselves
        //  if(fromUserId.toString() === toUserId.toString()){
        //     return res.status(400).json({message: "You cannot send a connection request to yourself"});
        //  }

            // Check if the user is trying to send a request to an already connected user
            const connectedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'accepted'});
            if(connectedUsers.length > 0){
                return res.status(400).json({message: "You are already connected with this user"});
            }

            // Check if the user is trying to send a request to an already ignored user
            const ignoredUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'ignored'});
            if(ignoredUsers.length > 0){
                return res.status(400).json({message: "You have already ignored this user"});
            }

            // Check if the user is trying to send a request to an already interested user
            const interestedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'intrested'});
            if(interestedUsers.length > 0){
                return res.status(400).json({message: "You have already sent an interested request to this user"});
            }

            // Check if the user is trying to send a request to an already rejected user
            const rejectedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'rejected'});
            if(rejectedUsers.length > 0){
                return res.status(400).json({message: "You have already rejected this user"});
            }

            // Check if the toUserId is already exist or not 
            const toUser = await User.findById(toUserId)
            if(!toUser){
                return res.status(404).json({message: "User not found"});
            }
            

            

       // If there is an existing connectionRequest
         const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId, status: 'intrested' },
                { fromUserId: toUserId, toUserId: fromUserId, status: 'intrested' }
            ],
        
         });
         if(existingConnectionRequest){
              return res.status(400).json({message: "Connection request already exists"});
            }

        

       const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
       })
       const data = await connectionRequest.save();

    res.json({
        message: req.user.firstName + " sent the "+ status+ "connection request to " + toUser.firstName,
        data: data
       })

    } 
    catch(err){
        res.status(404).send("ERROR"+ err.message);
    }

})





requestRouter.post("/request/review/:status/:requestId", userauth, async (req,res)=>{
    try{
        // const requestId = req.params.requestId; // ID of the connection request to be reviewed
        // const status = req.params.status; // Status of the connection request, can be 'accepted' or 'rejected'

        // const allowedStatus= ['accepted','rejected']
        // if(!allowedStatus.includes(status)){
        //     return res.status(400).json({message: "Invalid status type " +status})
        // }

        // // Find the connection request by ID
        // const connectionRequest = await ConnectionRequest.findById(requestId);
        // if(!connectionRequest){
        //     return res.status(404).json({message: "Connection request not found"});
        // }

        // // Check if the user is authorized to review this request
        // if(connectionRequest.toUserId.toString() !== req.user._id.toString()){
        //     return res.status(403).json({message: "You are not authorized to review this request"});
        // }

        // // Update the status of the connection request
        // connectionRequest.status = status;
        // await connectionRequest.save();

        // res.json({
        //     message: `Connection request ${status} successfully`,
        //     data: connectionRequest
        // });

        const loggedInUser = req.user; // The user who is logged in and reviewing the request
        // const requestId = req.params.requestId; // ID of the connection request to be reviewed


        const {status,requestId} = req.params; // Status of the connection request, can be 'accepted' or 'rejected'
        const allowedStatus = ['accepted','rejected']
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type " +status})
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id, // Check if the logged in user is the receiver of the request
            status : 'intrested' // Check if the request is in 'intrested' status
                                 // because the ignored status will be ejeceted person can't 
        })
        if(!connectionRequest){
            return res.status(400).json({message : "Connection request not found"})
        }

        connectionRequest.status = status; // Update the status of the connection request



        const data = await connectionRequest.save(); // Save the updated connection request
        res.json({
            message : "Connection request " + status, data:data
        })

        // Varun => Elon
        // Is Elon logged in user or not == toUserdId wala
        // status = intreseted






    } catch(err){
        res.status(500).send("ERROR"+ err.message);
    }
})















module.exports = requestRouter;