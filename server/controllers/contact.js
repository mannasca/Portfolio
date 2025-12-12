import Contact from "../models/Contact.js";

export const getAll = async (_req, res) => {
  try { 
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts); 
  }
  catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
};

export const getById = async (req, res) => {
  try { 
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(contact); 
  }
  catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
};

export const createOne = async (req, res) => {
  try { 
    const { firstname, lastname, email, subject, body } = req.body;
    
    // Validation
    if (!firstname || !lastname || !email || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contact = await Contact.create({
      firstname,
      lastname,
      email,
      subject: subject || "",
      body
    });

    res.status(201).json(contact); 
  }
  catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
};

export const updateById = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } 
  catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
};

export const removeById = async (req, res) => {
  try { 
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully", contact }); 
  }
  catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
};

export const removeAll = async (_req, res) => {
  try { 
    const result = await Contact.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} contacts`, result }); 
  }
  catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
};
