import express from "express";
const router = express.Router();
import {
  addorderitem,
  getorderbyId,
  Getmyorders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getorders,
} from "../controllers/ordercontrollers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addorderitem).get(protect, admin, getorders);
router.route("/myorders").get(protect, Getmyorders);
router.route("/:id").get(protect, getorderbyId);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
