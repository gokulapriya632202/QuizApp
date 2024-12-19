const questions = [
    { question: "What does CSS stand for?", options: ["A. Cascading Style Sheets", "B. Computer Style Sheets", "C. Colorful Style Sheets", "D. Creative Style Sheets"], answer: "A. Cascading Style Sheets" },
    { question: "What is the purpose of !important in CSS?", options: ["A. Adds a comment", "B. Overrides all styles","C. Creates a rule", "D. Specifies element"], answer: "B. Overrides all styles" },
    { question: "What does HTML stand for?", options: [ "A. High Text Machine Language", "B. Hyperlink and Text Markup Language", "C. Home Tool Markup Language","D. Hyper Text Markup Language",], answer: "D. Hyper Text Markup Language" },
    { question: "Which property is used to set text color in CSS?", options: ["A. color", "B. text-color", "C. font-color", "D. background-color"], answer: "A. color" },
    { question: "How do you add a background color in CSS?", options: ["A. color", "B. bgcolor", "C. background-color","D. background"], answer: "C. background-color" }
  ];
  
  let score = 0;
  let currentQuestionIndex = 0;
  
  const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
  
  function renderQuestions() {
    const quizContainer = document.getElementById("quiz-container");
  
    randomQuestions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "quiz-container";
      if (index === 0) questionDiv.classList.add("active");
  
      questionDiv.innerHTML = 
        `
        <div class="question-box">
             <p>  ${index + 1}. ${q.question}</p>
        </div>
        <div class="quiz-box">
          <div class="options">
            ${q.options.map(option => `
              <div class="option" onclick="checkAnswer(this, '${option}', '${q.answer}', ${index})">
                ${option}
              </div>
            `).join("")}
          </div>
           ${index < randomQuestions.length - 1 
            ? `<button onclick="goToNext(${index})">Next</button>`
            : `<button onclick="showFinalScore()">Submit</button>`
          }
        </div>`;
        
      quizContainer.appendChild(questionDiv);
    });
  }
  
  function checkAnswer(optionElement, selected, correct, index) {
    const options = document.querySelectorAll(`.quiz-container:nth-child(${index + 1}) .option`);
    options.forEach(option => option.style.pointerEvents = "none");
  
    if (selected === correct) {
      optionElement.classList.add("correct");
      score++;
    } else {
      optionElement.classList.add("wrong");
    }
  }
  
  function goToNext(index) {
    const current = document.querySelectorAll(".quiz-container")[index];
    const next = document.querySelectorAll(".quiz-container")[index + 1];
    current.classList.remove("active");
    next.classList.add("active");
  }
  
  function showFinalScore() {
    const percentage = Math.round((score / randomQuestions.length) * 100);
    document.getElementById("quiz-container").innerHTML = `
      <div class="result-container">
        <div class="result-box">
          <h1 id="final">Quiz Result!</h1>
          <div class="circle-container">
            <div class="circle" style="--progress: ${percentage}%; background: conic-gradient(rgb(23, 161, 216) ${percentage}%, #3a2a44 ${percentage}%)">
              ${percentage}%
            </div>
          </div>
          <p>Your Score: ${score} out of ${randomQuestions.length}</p>
          <div class="btn-container">
            <button onclick="location.reload()">Try Again</button>
            <button onclick="goToHome()">Go To Home</button>
          </div>
        </div>
      </div>
    `;
  }
  
  function goToHome() {
    window.location.href = "/main"; // Redirects to the route serving main.ejs
  }
  
  
  renderQuestions();
  