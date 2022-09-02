import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  deleteproduct,
  Updateproduct,
  createproduct,
  Createproductreview
} from "../controllers/productcontrollers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createproduct);
router.route("/:id/reviews").post(protect,Createproductreview);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, admin, deleteproduct)
  .put(protect, admin, Updateproduct);

export default router;
