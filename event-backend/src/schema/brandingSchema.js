import { Schema } from "mongoose";

export let brandingSchema = Schema({
  category: [
    {
      type: String,
      trim: true,
      minLength: [1, "Category must be at least 1 character long"],
      maxLength: [30, "Category must be at most 30 characters"],
      enum: {
        values: ["Card", "Student"],
        message: (notEnum) => {
          return `${notEnum.value} is not a valid category`;
        },
      },
    },
  ],
  // category: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Category field is required"],
  //   minLength: [1, "Category must be at least 1 character long"],
  //   maxLength: [100, "Category must be at most 100 characters"],
  // },
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
    type: Number,
    trim: true,
    required: [true, "Quantity field is required"],
    minLength: [1, "Quantity must be at least 1 character long"],
    maxLength: [100, "Quantity must be at most 100 characters"],
  },

  placement: {
    type: String,
    trim: true,
    required: [true, "Placement field is required"],
    minLength: [1, "Placement must be at least 1 character long"],
    maxLength: [100, "Placement must be at most 100 characters"],
  },
});
