const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Please provide phone number"],
    },
    belt: {
      type: String,
      required: true,
      enum: {
        values: ["white", "yellow", "blue", "purple", "brown", "black"],
        message: "{{Value}} is not supported",
      },
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
  },
  { timestamps: true }
);

studentSchema.pre("remove", async function (next) {
  await this.model("Absentees").deleteMany({ student: this._id });
  await this.model("Payment").deleteMany({ student: this._id });
  next();
});

module.exports = mongoose.model("Student", studentSchema);
