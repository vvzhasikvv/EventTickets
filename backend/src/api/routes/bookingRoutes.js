import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  cancelBooking,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { authRequired, requireRole } from "../middlewares/auth.js";

const router = Router();

router.post("/", authRequired, createBooking);
router.get("/my", authRequired, getMyBookings);
router.get("/:id", authRequired, getBookingById);
router.get("/", authRequired, requireRole("admin"), getAllBookings);
router.put("/:id", authRequired, requireRole("admin"), updateBookingStatus);
router.delete("/:id", authRequired, cancelBooking);

export default router;
