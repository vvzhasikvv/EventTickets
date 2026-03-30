import { Event } from "../../infrastructure/db/models/Event.js";

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      capacity,
      price,
      category,
      status
    } = req.body;

    if (!title || !description || !location || !startDate || !endDate || !capacity || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const availableTickets = Number(capacity);
    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const event = await Event.create({
      title,
      description,
      location,
      startDate,
      endDate,
      capacity,
      availableTickets,
      price,
      category,
      status,
      coverImageUrl,
      createdBy: req.user._id
    });

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.coverImageUrl = `/uploads/${req.file.filename}`;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
