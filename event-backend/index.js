import express, { json } from "express";
import { port } from "./src/config/constant.js";
import cors from "cors";
import connectDb from "./src/connectdb/connectdb.js";
import entryRouter from "./src/routes/entryRouter.js";

let app = express();

app.use(json());

app.use(cors());
app.use("/entry", entryRouter);

connectDb();

app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
