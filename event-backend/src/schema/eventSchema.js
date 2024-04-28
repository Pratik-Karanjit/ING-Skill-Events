import { Schema } from "mongoose";

export let eventSchema = Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title field is required"],
    minLength: [1, "Title must be at least 1 character long"],
    maxLength: [50, "Title must be at most 50 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },

  owner: {
    type: String,
    trim: true,
    required: [true, "Owner field is required"],
    minLength: [1, "Owner must be at least 1 character long"],
    maxLength: [50, "Owner must be at most 50 character"],
  },
  scope: {
    type: String,
    trim: true,
    minLength: [1, "Scope must be at least 1 character long"],
    maxLength: [300, "Scope must be at most 300 character"],
  },
  eventImage: {
    type: String,
    trim: true,
    required: [true, "Image field is required"],
    minLength: [1, "Image must be at least 1 character long"],
    maxLength: [50, "Image must be at most 50 character"],
  },

  description: {
    type: String,
    trim: true,
    minLength: [1, "Description must be at least 1 character long"],
    maxLength: [500, "Description must be at most 500 character"],
  },

  college: {
    type: String,
    trim: true,
    minLength: [1, "College must be at least 1 character long"],
    maxLength: [100, "College must be at most 100 character"],
  },

  start_date: {
    type: Date,
    trim: true,
    minLength: [1, "Date must be at least 1 character long"],
    maxLength: [100, "Date must be at most 100 character"],
  },

  end_date: {
    type: Date,
    trim: true,
    minLength: [1, "Date must be at least 1 character long"],
    maxLength: [100, "Date must be at most 100 character"],
  },

  status: {
    type: String,
    trim: true,
    minLength: [1, "Status must be at least 1 character long"],
    maxLength: [50, "Status must be at most 50 character"],
  },

  budget: {
    type: Number,
    trim: true,
    minLength: [1, "Budget must be at least 1 character long"],
    maxLength: [50, "Budget must be at most 50 character"],
    validator: function (v) {
      if (!/^[0-9]+$/.test(v)) {
        throw new Error("Only digits are allowed in the mobile number.");
      }
    },
    message: (props) => `${props.value} is not a valid mobile number!`,
  },

  eventId: {
    type: String,
    trim: true,
  },
  // placement: {
  //   type: [String],
  //   trim: true,
  //   enum: {
  //     values: ["Main Gate", "Ground Floor", "Entrance Door", "Roof top"],
  //     message: (notEnum) => {
  //       return `${notEnum.value} is not a valid Asset`;
  //     },
  //   },
  // },

  tag: {
    type: String,
    trim: true,
  },
  // tag: {
  //   type: [String],
  //   trim: true,
  //   enum: {
  //     values: ["Center", "East", "West", "North", "South"],
  //     message: (notEnum) => {
  //       return `${notEnum.value} is not a valid tag`;
  //     },
  //   },
  // },
});
