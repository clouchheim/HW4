// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false, hint: true },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false, hint: true },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false, hint: true }
      ]
    },
    {
      question: "Which of the following languages has the longest alphabet?",
      answers: [
        { text: "Arabic", correct: false },
        { text: "Russian", correct: true },
        { text: "Greek", correct: false, hint: true },
        { text: "Hawaiian", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We use the id of the id of the div element in the index.html file that we want to extract. 
  // The ids are specified in the id = ID_NAME inside of the <div> container start. 
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let hintCount = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hintCount = 0;
    nextButton.textContent = "Next";
    hintButton.textContent = "Hint";
    showQuestion();
  }
  
  function showQuestion() {
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // These elements are created dynamically because the question and answer elements are changing based on when 
      // the user interacts with the UI. We cannot predict their interaction so we need to add elements, on the fly, dymanically. 
      // In contrast, the other elements like the strcuture of the page overall, are not dependent on the user interaction. 
      // 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        // button.dataset allows for data to be stored inside of the html element
        button.dataset.correct = answer.correct;
      }
      if (answer.hint) {
        button.dataset.hint = answer.hint
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing?
      // This line is attatching the button just created to the answerButtonsElement 
      // which is connected to the html file as the area where the answer buttons go
      // placing these interactive pieces into the UI
      answerButtonsElement.appendChild(button);
    });

    // Add the hint button
    hintButton.style.display = "block";
    
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    // e stands for event, e.target shows what button was clicked

    hintButton.style.display = "none" // I realize that this is different from the instructions, but it did not make sense to 
    // me to ever have the hint and next buttons displayed at the same time since you only need a hint if you havent answered,
    // and if you have answered since once you answer you cannot answer again and the correct answer is shown and the 
    // you do not need a hint. Therefore, you can only get hints in my quiz before you answer and therefore before the next
    // button is displayed. 

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    // this ensures that the correct answer always turns green no matter the answer pressed, then disable button
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // This is important because it makes the next button show up and be ready for interactivity, if we did not change 
    // the style.display from "none" then it would never show up. 
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You used ${hintCount} hints and scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // On the click of the next button, if you are on a valid question (e.g. there are still questions
  // left to answer or you havent seen your score) then the click directs you to ghte handleNextButton() fuction
  // which either moves onto the next question or shows score. If you are out of this range, then the button
  // starts the quiz from the beignning. 
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  // hint button 
  hintButton.addEventListener("click", () => {
    hintCount++;
    for (const button of answerButtonsElement.children) {
      console.log(button.dataset.correct)
      if (button.dataset.hint) {
        button.classList.add("wrong");
        button.disabled = true;
        hintButton.style.display = "none"
        break; 
      }
    }
  });
  
  startQuiz();
  