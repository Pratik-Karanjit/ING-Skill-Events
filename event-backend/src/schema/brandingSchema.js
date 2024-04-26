import { Schema } from "mongoose";

const validQuantities = [1, 2, 3, 4, 5];
export let brandingSchema = Schema({
  // category: [
  //   {
  //     type: String,
  //     trim: true,
  //     minLength: [1, "Category must be at least 1 character long"],
  //     maxLength: [30, "Category must be at most 30 characters"],
  //     enum: {
  //       values: ["Card", "Student"],
  //       message: (notEnum) => {
  //         return `${notEnum.value} is not a valid category`;
  //       },
  //     },
  //   },
  // ],
  category: {
    type: String,
    trim: true,
    required: [true, "Category field is required"],
    minLength: [1, "Category must be at least 1 character long"],
    maxLength: [100, "Category must be at most 100 characters"],
  },
  asset: [
    {
      type: String,
      trim: true,
      minLength: [1, "Asset must be at least 1 character long"],
      maxLength: [30, "Asset must be at most 30 characters"],
      enum: {
        values: ["abc", "def"],
        message: (notEnum) => {
          return `${notEnum.value} is not a valid Asset`;
        },
      },
    },
  ],
  // asset: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Asset field is required"],
  //   minLength: [1, "Asset must be at least 1 character long"],
  //   maxLength: [100, "Asset must be at most 100 characters"],
  // },

  quantity: {
    type: [Number],
    enum: {
      values: validQuantities,
      message: (notEnum) => {
        return `${notEnum.value} is not a valid Quantity`;
      },
    },
  },
  placement: {
    type: [String],
    trim: true,
    enum: {
      values: ["Main Gate", "Ground Floor", "Entrance Door", "Roof top"],
      message: (notEnum) => {
        return `${notEnum.value} is not a valid placement`;
      },
    },
  },
  eventId: {
    type: String,
    trim: true,
  },
});
