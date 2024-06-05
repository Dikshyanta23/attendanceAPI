const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createAbsentees,
  getAllAbsentees,
  getAllAbsenteesByDate,
  getAllAbsenteesByStudent,
  updateAbsentees,
  deleteAbsentees,
  getSingleAbsentees,
} = require("../controllers/absenteesController");

const checkPermissions = require("../utils/checkPermissions");

router
  .route("/")
  .get(authenticateUser, getAllAbsentees)
  .post(authenticateUser, authorizePermissions("admin"), createAbsentees);

router.route("/date").get(authenticateUser, getAllAbsenteesByDate);

router.route("/student/:id").get(authenticateUser, getAllAbsenteesByStudent);
router
  .route("/:id")
  .get(authenticateUser, getSingleAbsentees)
  .patch(authenticateUser, authorizePermissions("admin"), updateAbsentees)
  .delete(authenticateUser, authorizePermissions("admin"), deleteAbsentees);

module.exports = router;
