const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const researchStatusEnum = ["NEW", "DONE", "IN PROGRESS", "REMOVED", "MOVED"];
const researchSchema = new Schema({
  image: { type: String, trim: true },
  name: { type: String, trim: true },
  abstract: { type: String, trim: true },
  status: {
    type: String,
    trim: true,
    enum: researchStatusEnum,
    default: "NEW",
  },
  investigators: [
    {
      id: { type: Types.ObjectId, ref: "User", trim: true },
      status: {
        type: String,
        enum: ["Approved", "Pending", "Rejected"],
        default: "Rejected",
      },
    },
  ],
  commonParameters: {
    submission: { type: Boolean, default: false },
    irb: { type: Boolean, default: false },
    manuscriptDrafting: { type: Number, min: 0, max: 100, default: 0 },
    fund: { type: Number, min: 0, max: 100, default: 0 },
    dataCollection: { type: Number, min: 0, max: 100, default: 0 },
    studyPlan: { type: Number, min: 0, max: 100, default: 0 },
    responsibility: { type: Number, min: 0, max: 100, default: 0 },
    manuscriptReview: { type: Number, min: 0, max: 100, default: 0 },
    revising: { type: Number, min: 0, max: 100, default: 0 },
    citation: { type: Number, min: 0, max: 100, default: 0 },
  },
});

module.exports = mongoose.model("Research", researchSchema);
