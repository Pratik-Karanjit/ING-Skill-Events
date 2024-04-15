import { Schema } from "mongoose";

export let resourceSchema = Schema({
  item: {
    type: String,
    trim: true,
    required: [true, "Item field is required"],
    minLength: [1, "Item must be at least 1 character long"],
    maxLength: [100, "Item must be at most 100 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },

  quantity: {
    type: Number,
    trim: true,
    minLength: [1, "Quantity must be at least 1 character long"],
    maxLength: [100, "Quantity must be at most 100 character"],
    validator: function (v) {
      if (!/^[0-9]+$/.test(v)) {
        throw new Error("Only digits are allowed in the quantity.");
      }
    },
    message: (props) => `${props.value} is not a valid quantity!`,
  },
});
