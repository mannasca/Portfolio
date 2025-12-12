import Qualification from "../models/Qualification.js";

export const getAll = async (_req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ createdAt: -1 });
    res.json(qualifications);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }
    res.json(qualification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const createOne = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    // Validation
    if (!title || !firstname || !lastname || !email) {
      return res.status(400).json({ error: "Missing required fields: title, firstname, lastname, email" });
    }

    const qualification = await Qualification.create({
      title,
      firstname,
      lastname,
      email,
      completion: completion || null,
      description: description || "",
    });

    res.status(201).json(qualification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateById = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    // Validation - at least one field must be provided
    if (!title && !firstname && !lastname && !email && !completion && !description) {
      return res.status(400).json({ error: "At least one field is required for update" });
    }

    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      { title, firstname, lastname, email, completion, description },
      { new: true, runValidators: true }
    );

    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }

    res.json(qualification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const removeById = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);

    if (!qualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }

    res.json({ message: "Qualification deleted successfully", qualification });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const removeAll = async (_req, res) => {
  try {
    const result = await Qualification.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} qualifications`, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
