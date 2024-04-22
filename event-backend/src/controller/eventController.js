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

export let createEvent = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const {
    title,
    owner,
    scope,
    description,
    college,
    start_date,
    end_date,
    budget,
    tag,
    status,
    eventId,
  } = req.body;

  try {
    // Convert start_date and end_date to mm/dd/yyyy format
    const formattedStartDate = new Date(start_date).toLocaleDateString("en-US");
    const formattedEndDate = new Date(end_date).toLocaleDateString("en-US");
    console.log("formattedStartDate", formattedStartDate);
    console.log("formattedEndDate", formattedEndDate);

    const newEvent = await Events.create({
      title,
      owner,
      scope,
      description,
      college,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      budget,
      tag,
      status,
      eventId,
      eventImage: req.file.filename,
    });
    successResponse(
      res,
      HttpStatus.CREATED,
      "Event created successfully",
      newEvent
    );
  } catch (error) {
    console.log("Error creating event", error);
  }
});
