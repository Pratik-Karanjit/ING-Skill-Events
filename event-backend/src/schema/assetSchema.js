import { Schema } from "mongoose";

export let assetSchema = Schema({
  asset: {
    type: String,
    trim: true,
    required: [true, "Asset field is required"],
    minLength: [1, "Asset must be at least 1 character long"],
    maxLength: [100, "Asset must be at most 100 character"],

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

  placement: {
    type: String,
    trim: true,
    required: [true, "Placement field is required"],
    minLength: [1, "Placement must be at least 1 character long"],
    maxLength: [100, "Placement must be at most 100 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },
});

// import { Schema } from "mongoose";

// // Schema for the entries within each category
// const entrySchema = Schema({
//   placement: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   subject: {
//     type: String,
//     trim: true,
//     required: true,
//   },
// });

// // Schema for the parent category
// export let categorySchema = Schema({
//   name: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   entries: [entrySchema],
// });

// categories: [
//   {
//     name: "student",
//     entries: [
//       {
//         id: 1,
//         placement: "first floor",
//         subject: "science"
//       },
//       {
//         id: 2,
//         placement: "second floor",
//         subject: "non-science"
//       },
//       {
//         id: 3,
//         placement: "third floor",
//         subject: "humanities"
//       }
//     ]
//   },
//   {
//     name: "backdrop",
//     entries: [
//       {
//         placement: "first floor",
//         subject: "biology"
//       },
//       {
//         placement: "second floor",
//         subject: "history"
//       },
//       {
//         placement: "third floor",
//         subject: "literature"
//       }
//     ]
//   }
// ];

// db.categories.insertOne({
//   name: "student",
//   entries: [
//     { id: 1, placement: "first floor", subject: "science" },
//     { id: 2, placement: "second floor", subject: "non-science" },
//     { id: 3, placement: "third floor", subject: "humanities" }
//   ]
// });
