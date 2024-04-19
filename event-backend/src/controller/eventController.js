import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import expressAsyncHandler from "express-async-handler";
import errorResponse from "../helper/ErrorResponse.js";
import { Events } from "../schema/model.js";

export const getAllEvents = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Events.find();

    successResponse(
      res,
      HttpStatus.OK,
      "Events fetched successfully",
      products
    );
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching events"
    );
  }
});

export const getEventById = expressAsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  console.log("event Id hereeee", eventId);
  try {
    console.log("event id again", eventId);
    const event = await Events.findOne({ eventId: eventId });
    console.log("event from db", event);
    if (event) {
      successResponse(res, HttpStatus.OK, "Event fetched successfully", event);
    } else {
      errorResponse(res, HttpStatus.NOT_FOUND, "Event not found");
    }
  } catch (error) {
    console.log("error", error);
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching event details"
    );
  }
});
