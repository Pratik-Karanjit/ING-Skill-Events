import { Router } from "express";
import { getAllEvents } from "../controller/eventController.js";

let entryRouter = Router();

entryRouter.route("/events").get(getAllEvents);

export default entryRouter;
