const express = require("express");
const { User } = require("../models/UserModel");
const { register, login } = require("../controllers/user.controller");


const router = express.Router();

router.post("/", register);
router.post("/login", login);



// router.get("/", async (req, res, next) => {
//     const Users = await User.find({});
//     res.send(Users);
// });

// router.delete("/:id", async (req, res, next) => {
//     try {
//         //console.log(req.params.id);
//         const delItem = await User.findByIdAndDelete(req.params.id);
//         if (!delItem) res.sendStatus(404);
//         res.status(200).send(delItem);
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(400);
//     }
// });

// router.patch("/:id", async (req, res, next) => {
//     try {
//         const updatedObject = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedObject) res.sendStatus(404);
//         res.status(200).send(updatedObject);
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(400);
//     }
// });

module.exports = router;