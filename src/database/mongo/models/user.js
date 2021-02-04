const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { rolesEnum } = require("../../../core/authorization/accessList");
const parameterSchema = new Schema({
  studyDesign: { type: Boolean },
  monitoring: { type: Boolean },
  groupHiring: { type: Boolean },
  idea: { type: Boolean },
  dataAnalysis: { type: Boolean },
  inquiry: { type: Boolean },
  presentation: { type: Boolean },
});
const researchSchema = new Schema({
  research: { type: Types.ObjectId, ref: "Research", trim: true },
  parameters: parameterSchema,
});
const userSchema = new Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  image: { type: String, trim: true },
  title: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  mobile: { type: String, trim: true },
  password: { type: String },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  zip: { type: String, trim: true },
  address: { type: String, trim: true },
  address2: { type: String, trim: true },
  roles: [{ type: String, enum: rolesEnum }],
  researches: [researchSchema],
  // fcm_token: { type: String },
  // fcmToken: { type: String, trim: true },
  // addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
