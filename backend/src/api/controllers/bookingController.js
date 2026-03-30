import { Booking } from "../../infrastructure/db/models/Booking.js";
import { Event } from "../../infrastructure/db/models/Event.js";

export const createBooking = async (req, res, next) => {
  try {
    const { eventId, quantity } = req.body;
    if (!eventId || !quantity) {
      return res.status(400).json({ message: "eventId and quantity are required" });
    }

    const existing = await Booking.findOne({ userId: req.user._id, eventId });
    if (existing) {
      return res.status(409).json({ message: "Booking already exists for this event" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const qty = Number(quantity);
    if (event.availableTickets < qty) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    event.availableTickets -= qty;
    await event.save();

    const totalPrice = qty * event.price;
    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      quantity: qty,
      totalPrice,
      status: "confirmed"
    });

    return res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Booking already exists for this event" });
    }
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("eventId", "title startDate location")
      .sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("eventId", "title startDate location");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId", "title startDate location")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (booking.status !== "cancelled") {
      booking.status = "cancelled";
      await booking.save();

      const event = await Event.findById(booking.eventId);
      if (event) {
        event.availableTickets += booking.quantity;
        await event.save();
      }
    }

    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};
