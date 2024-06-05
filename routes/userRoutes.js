const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateUserPassword,
} = require("../controllers/userController");

const checkPermissions = require("../utils/checkPermissions");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router
  .route("/:id")
  .get(authenticateUser, getUser)
  .delete(authenticateUser, authorizePermissions("admin"), deleteUser);

module.exports = router;
