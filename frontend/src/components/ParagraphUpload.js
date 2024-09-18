import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function ParagraphUpload({ setParagraphId, setParagraph }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting paragraph:', text);
    try {
      const response = await axios.post(`${API_URL}/api/upload`, { text });
      console.log('Response from server:', response.data);
      setParagraphId(response.data.id);
      setParagraph(text);
    } catch (error) {
      console.error('Error uploading paragraph:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Syriac paragraph"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ParagraphUpload;