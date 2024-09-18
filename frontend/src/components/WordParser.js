import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function WordParser({ paragraphId, paragraph }) {
  const words = paragraph.split(' ');
  const [parsings, setParsings] = useState(words.map(() => ({
    partOfSpeech: '',
    gender: '',
    number: '',
    person: '',
    tense: '',
    stamm: '',
    status: '',
  })));

  const handleChange = (index, field, value) => {
    const newParsings = [...parsings];
    newParsings[index] = { ...newParsings[index], [field]: value };
    setParsings(newParsings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(parsings.map((parsing, index) => 
        axios.post(`${API_URL}/api/parse`, {
          id: paragraphId,
          wordIndex: index,
          parsing,
        })
      ));
      alert('All words parsed successfully!');
    } catch (error) {
      console.error('Error parsing words:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {words.map((word, index) => (
        <div key={index}>
          <h3>{word}</h3>
          <select
            value={parsings[index].partOfSpeech}
            onChange={(e) => handleChange(index, 'partOfSpeech', e.target.value)}
          >
            <option value="">Part of Speech</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
            <option value="pronoun">Pronoun</option>
            <option value="adverb">Adverb</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="particle">Particle</option>
          </select>
          {['noun', 'adjective', 'pronoun'].includes(parsings[index].partOfSpeech) && (
            <>
              <select
                value={parsings[index].gender}
                onChange={(e) => handleChange(index, 'gender', e.target.value)}
              >
                <option value="">Gender</option>
                <option value="masculine">Masculine</option>
                <option value="feminine">Feminine</option>
              </select>
              <select
                value={parsings[index].number}
                onChange={(e) => handleChange(index, 'number', e.target.value)}
              >
                <option value="">Number</option>
                <option value="singular">Singular</option>
                <option value="plural">Plural</option>
              </select>
              {parsings[index].partOfSpeech === 'noun' && (
                <select
                  value={parsings[index].status}
                  onChange={(e) => handleChange(index, 'status', e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="absolute">Absolute</option>
                  <option value="determined">Determined</option>
                  <option value="construct">Construct</option>
                </select>
              )}
            </>
          )}
          {parsings[index].partOfSpeech === 'verb' && (
            <>
              <select
                value={parsings[index].person}
                onChange={(e) => handleChange(index, 'person', e.target.value)}
              >
                <option value="">Person</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
              </select>
              <select
                value={parsings[index].number}
                onChange={(e) => handleChange(index, 'number', e.target.value)}
              >
                <option value="">Number</option>
                <option value="singular">Singular</option>
                <option value="plural">Plural</option>
              </select>
              <select
                value={parsings[index].tense}
                onChange={(e) => handleChange(index, 'tense', e.target.value)}
              >
                <option value="">Tense</option>
                <option value="perfect">Perfect</option>
                <option value="imperfect">Imperfect</option>
                <option value="imperative">Imperative</option>
                <option value="participle">Participle</option>
              </select>
              <select
                value={parsings[index].stamm}
                onChange={(e) => handleChange(index, 'stamm', e.target.value)}
              >
                <option value="">Stamm</option>
                <option value="peal">Peal</option>
                <option value="pael">Pael</option>
                <option value="aphel">Aphel</option>
                <option value="ethpeel">Ethpeel</option>
                <option value="ethpaal">Ethpaal</option>
                <option value="ettaphal">Ettaphal</option>
              </select>
            </>
          )}
        </div>
      ))}
      <button type="submit">Submit All Parsings</button>
    </form>
  );
}

export default WordParser;