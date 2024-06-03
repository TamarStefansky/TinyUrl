import express from "express";
import UserController from "../Controllers/UserController.js";
const UserRouter = express.Router();

UserRouter.get("/",UserController.getUsers);
UserRouter.get("/:id",UserController.getById);
UserRouter.post("/",UserController.post);
UserRouter.put("/:id", UserController.put);
UserRouter.delete("/:id",UserController.delete);

export default UserRouter;