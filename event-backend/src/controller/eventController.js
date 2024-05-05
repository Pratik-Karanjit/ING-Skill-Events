import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import expressAsyncHandler from "express-async-handler";
import errorResponse from "../helper/ErrorResponse.js";
import { Branding, Events, Manpower, Resource } from "../schema/model.js";

export const getAllEvents = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Events.find();
    // console.log(products);

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
  // console.log("event Id hereeee", eventId);
  try {
    // console.log("event id again", eventId);
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

export let createManpower = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, responsibility, mobile_number, eventId } = req.body;

  try {
    const newManpower = await Manpower.create({
      name,
      responsibility,
      mobile_number,
      eventId,
    });
    successResponse(
      res,
      HttpStatus.CREATED,
      "Manpower created successfully",
      newManpower
    );
  } catch (error) {
    console.log("Error creating manpower", error);
  }
});

export const getManpowerById = expressAsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  // console.log("params", eventId);
  try {
    const manpowers = await Manpower.find({ eventId: eventId });

    successResponse(
      res,
      HttpStatus.OK,
      "Manpower fetched successfully",
      manpowers
    );
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching Manpower"
    );
  }
});

export const getResourceById = expressAsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  // console.log("params of resource", eventId);
  try {
    const resource = await Resource.find({ eventId: eventId });

    successResponse(
      res,
      HttpStatus.OK,
      "resource fetched successfully",
      resource
    );
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching resource"
    );
  }
});

export const getBrandingById = expressAsyncHandler(async (req, res) => {
  const { eventId } = req.params;
  // console.log("branding params", eventId);
  try {
    const branding = await Branding.find({ eventId: eventId });

    successResponse(
      res,
      HttpStatus.OK,
      "Branding fetched successfully",
      branding
    );
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching branding"
    );
  }
});

// export const getAllResource = expressAsyncHandler(async (req, res) => {
//   try {
//     const resources = await Resource.find();

//     successResponse(
//       res,
//       HttpStatus.OK,
//       "Resource fetched successfully",
//       resources
//     );
//   } catch (error) {
//     errorResponse(
//       res,
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "Error fetching Resource"
//     );
//   }
// });

export let createBranding = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { category, asset, quantity, placement, eventId } = req.body;

  try {
    const newBranding = await Branding.create({
      category,
      asset,
      quantity,
      placement,
      eventId,
    });
    successResponse(
      res,
      HttpStatus.CREATED,
      "Branding created successfully",
      newBranding
    );
  } catch (error) {
    console.log("Error creating branding.", error);
  }
});

export let createResource = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { item, quantity, eventId } = req.body;

  try {
    const newResource = await Resource.create({
      item,
      quantity,
      eventId,
    });
    successResponse(
      res,
      HttpStatus.CREATED,
      "Resource created successfully",
      newResource
    );
  } catch (error) {
    console.log("Error creating resource", error);
  }
});
