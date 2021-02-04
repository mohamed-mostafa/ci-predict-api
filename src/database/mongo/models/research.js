const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const researchStatusEnum = ["NEW", "DONE", "IN PROGRESS", "REMOVED", "MOVED"];
const researchSchema = new Schema({
  name: { type: String, trim: true },
  abstract: { type: String, trim: true },
  status: {
    type: String,
    trim: true,
    enum: researchStatusEnum,
    default: "NEW",
  },
  investigators: [{ type: Types.ObjectId, ref: "User", trim: true }],
  commonParameters: {
    submission: { type: Boolean },
    irb: { type: Boolean },
    manuscriptDrafting: { type: Number, min: 0, max: 100 },
    fund: { type: Number, min: 0, max: 100 },
    dataCollection: { type: Number, min: 0, max: 100 },
    studyPlan: { type: Number, min: 0, max: 100 },
    responsibility: { type: Number, min: 0, max: 100 },
    manuscriptReview: { type: Number, min: 0, max: 100 },
    revising: { type: Number, min: 0, max: 100 },
    citation: { type: Number, min: 0, max: 100 },
  },
});

module.exports = mongoose.model("Research", researchSchema);
