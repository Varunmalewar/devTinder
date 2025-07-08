const express = require("express");
const { userauth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user"); // Import User model to populate user details

const userRouter = express.Router();

// Get all the pending connection request for the logged-in user
userRouter.get("/user/request/received", userauth, async (req, res) => {
  try {
    // const userId = req.user._id; // Assuming user ID is stored in req.user
    // const pendingRequests = await ConnectionRequest.find({ toUserId: userId, status: 'pending' })
    //     .populate('fromUserId', 'firstName lastName photoUrl'); // Populate with user details

    // res.status(200).json(pendingRequests);

    const loggedInUser = req.user; // Get the logged-in user's

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested", // Fetching only 'intrested' requests (corrected spelling)
    }).populate("fromUserId", "firstName lastName photoUrl"); // Populate with user details

    console.log("Populated connection requests:", connectionRequest);

    res.json({
      message: "Data fetched successfully",
      connectionRequest: connectionRequest,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching connection requests: " + err.message });
  }
});

userRouter.get("/user/connection", userauth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Fetching all accepted connections for the logged-in user
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName photoUrl")
      .populate("toUserId", "firstName lastName photoUrl");

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
        // _id: row._id,
        // User details of the person they are connected to
        // status: row.status
      } else {
        return row.fromUserId;
        // _id: row._id,
        // User details of the person who is connected to them
        // status: row.status
      }
    }); // Extracting user details from the connections

    console.log("Populated connections:", connections);
    res.status(200).json({
      message: "Connections fetched successfully",
      connections: data,
    });

    // const connectionRequest = await ConnectionRequest.find({
    //     $or: [
    //         { toUserId: loggedInUser._id, status: 'accepted' },
    //         { fromUserId: loggedInUser._id, status: 'accepted' }
    //     ]
    // });
    // res.json({
    //     message: "Connections fetched successfully",
    //     connections: connectionRequest
    // })
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

userRouter.get("/user/feed", userauth, async (req, res) => {
  try {
    // const loggedInUser = req.user; // Get the logged-in user's ID

    // // Fetch all users except the logged-in user
    // const users = await User.find({ _id: { $ne: loggedInUser._id } }, 'firstName lastName photoUrl');

    // res.status(200).json({
    //     message: "User feed fetched successfully",
    //     users: users
    // });

    // DO IT
    // User not should see his own profile in the feed
    // user should not see card of his connections
    // user should not see the card of ignored people
    // user should not see the card of already sent connections

    const page = parseInt(req.query.page) || 1; // Get the page number from the request, default to 1 if not provided

    let limit = parseInt(req.query.limit) || 10; // Get the limit from the request, default to 10 if not provided

    limit = limit>50 ? 50 : limit; // Limit the maximum number of results to 50
    
    const skip = (page - 1) * limit; // Calculate the number of documents to skip    

    const loggedInUser = req.user;

    // i will find out all the connnection request either i have sent or i received
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");
    // res.send(connectionRequest);




    const hideUserFromField = new Set(); // Set to store user IDs to hide from the feed, the reason we use Set is to avoid duplicates
    // connectionRequest.forEach((request) => {
    //     if (request.fromUserId.toString() === loggedInUser._id.toString()) {
    //         hideUserFromField.add(request.toUserId.toString());
    //     } else {
    //         hideUserFromField.add(request.fromUserId.toString());
    //     }
    // });

    // these people are the people whom i want to hide from the feed
    // i will not show them in the feed
    connectionRequest.forEach((request) => {
      hideUserFromField.add(request.fromUserId.toString());
      hideUserFromField.add(request.toUserId.toString());
    });
    console.log("Users to hide from feed:", hideUserFromField);




    // very important query to fetch all the users except the logged-in user and those in the hideUserFromField set
    // Fetch all users except the logged-in user and those in the hideUserFromField set
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromField) } },
        { _id: { $ne: loggedInUser._id } }, // Exclude the logged-in user
      ], // Exclude users in the hideUserFromField set
    }).select("firstName lastName photoUrl _id").skip(skip).limit(limit) // Select only the fields I want to return


   console.log("Users fetched for feed:", users);

    res.status(200).json({
      message: "User feed fetched successfully",
      users: users,
    });
    
   
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user feed: " + err.message });
  }
});

module.exports = userRouter;
