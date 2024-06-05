const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createPayment,
  getAllPaymentsforYear,
  getAllPaymentsforMonth,
  getSinglePayment,
  updatePayment,
  deletePayment,
  getAllPaymentsforStudent,
} = require("../controllers/paymentController");

const checkPermissions = require("../utils/checkPermissions");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createPayment)
  .get(authenticateUser, authorizePermissions("admin"), getAllPaymentsforYear);
router
  .route("/month")
  .get(authenticateUser, authorizePermissions("admin"), getAllPaymentsforMonth);
router
  .route("/student/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin"),
    getAllPaymentsforStudent
  );
router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSinglePayment)
  .patch(authenticateUser, authorizePermissions("admin"), updatePayment)
  .delete(authenticateUser, authorizePermissions("admin"), deletePayment);

module.exports = router;
