import { Schema } from "mongoose";

export let resourceSchema = Schema({
  item: {
    type: String,
    trim: true,
    required: [true, "Item field is required"],
    minLength: [1, "Item must be at least 1 character long"],
    maxLength: [100, "Item must be at most 100 character"],
  },

  quantity: {
    type: Number,
    trim: true,
    minLength: [1, "Quantity must be at least 1 character long"],
    maxLength: [100, "Quantity must be at most 100 character"],
    message: (props) => `${props.value} is not a valid quantity!`,
  },
});
