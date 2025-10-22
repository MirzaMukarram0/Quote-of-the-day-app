import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "general",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient random selection
quoteSchema.index({ _id: 1 });

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
