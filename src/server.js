import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import dessertRouter from "./routes/dessert.routes.js";
import errHandler from "./middleware/errHandler.js";


const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Api v0.1.0");
});

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/dessert", dessertRouter);

//Error function
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
