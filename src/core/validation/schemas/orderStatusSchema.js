const { ORDER_STATUS_ENUM } = require("../../../config/constants/order");
module.exports = {
  type: "object",
  properties: {
    text: { type: "string", enum: ORDER_STATUS_ENUM },
    note: { type: "string" },
  },
  required: ["text"],
  additionalProperties: false,
};
