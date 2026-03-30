import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { authRequired, requireRole } from "../middlewares/auth.js";
import { upload } from "../../infrastructure/storage/upload.js";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authRequired, requireRole("admin"), upload.single("image"), createEvent);
router.put("/:id", authRequired, requireRole("admin"), upload.single("image"), updateEvent);
router.delete("/:id", authRequired, requireRole("admin"), deleteEvent);

export default router;
