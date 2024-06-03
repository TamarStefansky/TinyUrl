import express from "express";
import LinkController from "../Controllers/LinkController.js";
const LinkRouter = express.Router();

LinkRouter.get("/",LinkController.getLinks);
LinkRouter.get("/:id",LinkController.getById);
LinkRouter.post("/",LinkController.post);
LinkRouter.put("/:id", LinkController.put);
LinkRouter.delete("/:id",LinkController.delete);
LinkRouter.get("/target/:id",LinkController.getByTarget);
export default LinkRouter;
 