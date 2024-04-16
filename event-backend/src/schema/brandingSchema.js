import { Schema } from "mongoose";

export let brandingSchema = Schema({
  category: {
    type: String,
    trim: true,
    required: [true, "Category field is required"],
    minLength: [1, "Category must be at least 1 character long"],
    maxLength: [100, "Category must be at most 100 characters"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },
});
