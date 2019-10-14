const express = require('express');
const {userById, allUsers, getUser, updateUser} = require("../controllers/user");
const {requireSignin} = require('../controllers/auth');

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);

//any route containing :userID, our app will first execute userById()
router.param("userId", userById);

module.exports = router;