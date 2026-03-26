import express from "express"
import authCheck from "../middleware/authen.middleware.js"
import { editMeController } from "../controllers/users.controllers.js"


const usersRouter = express.Router()
 
usersRouter.get("/me", authCheck, (req,res,next)=>(res.send("done")))
usersRouter.put("/me", authCheck, editMeController)

export default usersRouter;