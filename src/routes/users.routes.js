import express from "express"
import authCheck from "../middleware/authen.middleware.js"
import { adminUpdateUserController, editMeController } from "../controllers/users.controllers.js"
import { getUserByIdController } from "../controllers/users.controllers.js";
import { adminOnly } from "../middleware/adminOnly.js";

const usersRouter = express.Router()


usersRouter.get("/me", authCheck, (req,res,next)=>(res.send("done")))
usersRouter.put("/me", authCheck, editMeController)

// usersRouter.get("/:id", authCheck, getUserByIdController);
usersRouter.get(
  "/:id",
  authCheck,
  adminOnly,
  getUserByIdController,
);

usersRouter.patch(
  "/:id",
  authCheck,
  adminOnly,
  adminUpdateUserController
);


export default usersRouter;