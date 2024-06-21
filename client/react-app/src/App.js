import React, { useState } from 'react';

function App() {
  const [surveyData, setSurveyData] = useState({
    companyName: '',
    surveyQuestion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({
      ...surveyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
      const data = await response.json();
      console.log('Survey created:', data);
    } catch (err) {
      console.error('Error creating survey:', err);
    }
  };

  return (
    <div>
      <h1>Create a Survey</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={surveyData.companyName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surveyQuestion"
          placeholder="Survey Question"
          value={surveyData.surveyQuestion}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
