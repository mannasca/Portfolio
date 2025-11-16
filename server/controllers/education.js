import Qualification from "../models/Qualification.js";

export const getAll = async (_req, res) => {
  try { res.json(await Qualification.find()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
export const getById = async (req, res) => {
  try { res.json(await Qualification.findById(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const createOne = async (req, res) => {
  try { res.status(201).json(await Qualification.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const updateById = async (req, res) => {
  try { res.json(await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeById = async (req, res) => {
  try { res.json(await Qualification.findByIdAndDelete(req.params.id)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};
export const removeAll = async (_req, res) => {
  try { res.json(await Qualification.deleteMany()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};
