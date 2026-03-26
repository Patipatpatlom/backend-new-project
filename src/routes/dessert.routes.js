import express from "express";
import authCheck from "../middleware/authen.middleware.js";
import { postDessertsController, deleteDesertsController, getDessertsController } from "../controllers/dessert.controllers.js"

const dessertRouter = express.Router();

dessertRouter.get("/", authCheck, getDessertsController);
dessertRouter.post("/", authCheck, postDessertsController);
dessertRouter.delete("/:id", authCheck, deleteDesertsController);

export default dessertRouter;
