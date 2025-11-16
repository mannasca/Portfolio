import Contact from "../models/Contact.js";

export const getAll = async (_req, res) => {
  try { res.json(await Contact.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
export const getById = async (req, res) => {
  try { res.json(await Contact.findById(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const createOne = async (req, res) => {
  try { res.status(201).json(await Contact.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const updateById = async (req, res) => {
  try {
    res.json(await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeById = async (req, res) => {
  try { res.json(await Contact.findByIdAndDelete(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeAll = async (_req, res) => {
  try { res.json(await Contact.deleteMany()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
