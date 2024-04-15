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
