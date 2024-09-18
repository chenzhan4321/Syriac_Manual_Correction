const express = require('express');
const router = express.Router();
const Paragraph = require('../models/paragraph');

router.post('/upload', async (req, res) => {
  try {
    const { text } = req.body;
    const paragraph = new Paragraph({ text, words: [] });
    await paragraph.save();
    res.json({ success: true, id: paragraph._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/parse', async (req, res) => {
  try {
    const { id, wordIndex, parsing } = req.body;
    const paragraph = await Paragraph.findById(id);
    paragraph.words[wordIndex] = parsing;
    await paragraph.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;