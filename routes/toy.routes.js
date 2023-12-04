const express = require("express");
const { getAllTasks, getTaskByName, getTaskByCat, getTasksBetween,getTaskById, addTask, deleteTask, updateTask } = require("../controllers/toy.controller");
const { auth } = require("../controllers/auth.controller");
const router = express.Router();


router.get("/", getAllTasks);
router.get("/search", getTaskByName);
router.get("/category/:catname", getTaskByCat);
router.get("/prices", getTasksBetween);
router.get("/:id", getTaskById);

router.post("/", auth(), addTask);
router.delete("/:id", auth(), deleteTask);
router.patch("/:id", auth(), updateTask);



module.exports = router;