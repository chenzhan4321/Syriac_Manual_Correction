import React, { useState } from 'react';
import ParagraphUpload from './components/ParagraphUpload';
import WordParser from './components/WordParser';

function App() {
  const [paragraphId, setParagraphId] = useState(null);
  const [paragraph, setParagraph] = useState('');

  console.log('Current state:', { paragraphId, paragraph }); // Add this line for debugging

  return (
    <div className="App">
      <h1>Syriac Paragraph Parser</h1>
      {!paragraphId ? (
        <ParagraphUpload setParagraphId={setParagraphId} setParagraph={setParagraph} />
      ) : (
        <WordParser paragraphId={paragraphId} paragraph={paragraph} />
      )}
    </div>
  );
}

export default App;