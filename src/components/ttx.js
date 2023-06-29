import React, { useState, useEffect } from "react";

const questions = [
  "What should you do when the server gets sluggish?",
  "What should you do when the server is down and you discover a ransom note?",
  "As the IT personnel, what should you do to remedy the ransomware attack?",
  "System is patched and currently restoring the backup, what should you do next in preparation for the site to be live?",
];

const scene = [
    "You went in to look into your servers and realised they became sluggish.",
    "Server is completely down and while looking at the system, IT team discovers a ransom note.",
    "As the IT personnel, you are tasked to remedy the situation.",
    "IT team has fixed the issue and are currently restoring the data back to server."
]


export default function TTX() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ans, setAns] = useState([]);
  const [finalEvaluation, setFinalEvaluation] = useState([]);


  // Handle error and success in the pdf file upload
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    fetch("http://localhost:5001/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setSuccess(true);
        // Handle the response from Flask if needed
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage("Error uploading file. Please try again.");
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };
  

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleEvaluate = () => {
    fetch("http://localhost:5001/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: questions[questionIndex],
        answer: answer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { suggestions } = data;
        setSuggestions(suggestions);
        setAns((prevAns) => [...prevAns, ...suggestions]); // Append suggestions to the ans array
        console.log(ans); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      // Last question, handle the final logic if needed
      // Set the final_question state or perform any final actions
      console.log(ans)
      return;
    }
    console.log(ans)
    setQuestionIndex(questionIndex + 1);
    setAnswer("");
    setSuggestions([]);
  };


  const getFinalEvaluation = () => {
    fetch("http://localhost:5001/final_evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: ans,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { finalEvaluation } = data;
        setFinalEvaluation(finalEvaluation);
        console.log(finalEvaluation);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(ans); // Log the ans array whenever it changes
  }, [ans]);
  useEffect(() => {
    console.log(finalEvaluation); // Log the finalEvaluation array whenever it changes
  }, [finalEvaluation]);

  return (
    <div className="container align-middle">
        <div className="card mb-2 text-bg-secondary p-3">
            <h2 className="mb-4">Upload PDF</h2>
            <hr></hr>
            <div className="mb-3 text-start">
                <label htmlFor="fileInput" className="form -label">
                Select PDF File:
                </label>
                <input
                type="file"
                className="form-control p-2"
                id="fileInput"
                accept=".pdf"
                onChange={handleUpload}
                />
            </div>

            {success && (
                <div className="alert alert-success" role="alert">
                File uploaded successfully!
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                {errorMessage}
                </div>
            )}
        </div>

        <div className="card mb-2 text-bg-secondary p-3 text-start">
            <div className="card-body text-start p-2">
                <h2>Scenario:</h2>
                <hr></hr>
                <p>
                    You are in a fully digital bank with many critical services that customers depend on in your systems. There are several functions that are deemed critical and have a short RTO.

                    Management has evaluated that prolong downtime, especially if it is over the RTO has detrimental effect on the company.

                    Since this is a rapidly growing startup, products and functions are required to be developed quickly and scaled, thus there were some tiny shortcuts here and there.
                </p>
            </div>
        </div>

        <div className="card mb-2 text-bg-secondary p-3 text-start">
            <div className="card-body p-2">
                <h2 className="card-title">Context {questionIndex + 1}</h2>
                <hr></hr>
                <p>{scene[questionIndex]}</p>
                <h2 className="card-title">Question {questionIndex + 1}</h2>
                <hr></hr>
                <p >{questions[questionIndex]}</p>
    
                <textarea className="form-control" value={answer} onChange={handleAnswerChange} />
                <br></br>
                <button className="btn btn-primary mb-4" onClick={handleEvaluate}>Evaluate</button>
                <br></br>
                <h3>GPT Evaluation:</h3>
                <hr></hr>
                <div className="mb-4">
                    <ul>
                        {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
                <button className="btn btn-primary" onClick={handleNextQuestion}>Next Question</button>
            </div>
        </div>

        <div className="card mb-2 text-bg-secondary p-3 text-start">
            <div className="card-body p-2">
                <h2 className="card-title mb-2">Final Evaluation:</h2>
                <div className="mb-4">
                  <ul>
                    {finalEvaluation.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary" onClick={getFinalEvaluation}>Get Final Evaluation</button>
            </div>
        </div>
    </div>
  );
}
