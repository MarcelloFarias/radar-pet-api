const mongoose = require("mongoose");

const { Schema } = mongoose;
const { userSchema } = require("./User");

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    lastSeen: { type: Date, required: true },
    image: { type: String, required: false },
    status: { type: String, required: true },
    authorId: { type: [userSchema], required: true },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
