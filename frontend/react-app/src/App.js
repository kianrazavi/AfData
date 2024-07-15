import React, { useState, useEffect } from 'react';

function App() {
  const [surveyData, setSurveyData] = useState({
    companyName: '',
    surveyQuestions: [{ questionText: '', type: 'short_answer', options: [] }],
  });
  const [surveys, setSurveys] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const questions = [...surveyData.surveyQuestions];
    questions[index][name] = value;
    setSurveyData({
      ...surveyData,
      surveyQuestions: questions,
    });
  };

  const handleAddQuestion = () => {
    setSurveyData({
      ...surveyData,
      surveyQuestions: [...surveyData.surveyQuestions, { questionText: '', type: 'short_answer', options: [] }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const questions = [...surveyData.surveyQuestions];
    questions.splice(index, 1);
    setSurveyData({
      ...surveyData,
      surveyQuestions: questions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!surveyData.companyName || surveyData.surveyQuestions.some(q => !q.questionText)) {
      setMessage('Please fill out all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
      const data = await response.json();
      setMessage('Survey created successfully!');
      fetchSurveys(); // Refresh the list of surveys
    } catch (err) {
      setMessage('Error creating survey.');
      console.error('Error creating survey:', err);
    }
  };

  const fetchSurveys = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/surveys');
      const data = await response.json();
      setSurveys(data);
    } catch (err) {
      console.error('Error fetching surveys:', err);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Create a Survey</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={surveyData.companyName}
          onChange={(e) => setSurveyData({ ...surveyData, companyName: e.target.value })}
        />
        <h2>Questions</h2>
        {surveyData.surveyQuestions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              name="questionText"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => handleChange(e, index)}
            />
            <select
              name="type"
              value={question.type}
              onChange={(e) => handleChange(e, index)}
            >
              <option value="short_answer">Short Answer</option>
              <option value="long_answer">Long Answer</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
            </select>
            {question.type === 'multiple_choice' && (
              <input
                type="text"
                name="options"
                placeholder="Options (comma separated)"
                value={question.options.join(',')}
                onChange={(e) => {
                  const options = e.target.value.split(',');
                  handleChange({ target: { name: 'options', value: options } }, index);
                }}
              />
            )}
            <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <button type="submit">Submit</button>
      </form>
      <h2>Existing Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>
            <h3>{survey.companyName}</h3>
            {survey.surveyQuestions.map((question, index) => (
              <div key={index}>
                <p>{question.questionText}</p>
                {question.type === 'multiple_choice' && (
                  <ul>
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
