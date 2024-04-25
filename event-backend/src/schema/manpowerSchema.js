import { Schema } from "mongoose";

export let manpowerSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name field is required"],
    minLength: [1, "Name must be at least 1 character long"],
    maxLength: [50, "Name must be at most 50 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },

  responsibility: {
    type: String,
    trim: true,
    required: [true, "Responsibility field is required"],
    minLength: [1, "Responsibility must be at least 1 character long"],
    maxLength: [200, "Responsibility must be at most 200 character"],
  },

  mobile_number: {
    type: Number,
    trim: true,
    minLength: [1, "Mobile Number must be at least 1 character long"],
    maxLength: [100, "Mobile Number must be at most 100 character"],

    message: (props) => `${props.value} is not a valid mobile number!`,
  },
  eventId: {
    type: String,
    trim: true,
  },
});
