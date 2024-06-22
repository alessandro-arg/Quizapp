let questions = [
  {
    question: "What is the tallest mountain in the world?",
    answer1: "K2",
    answer2: "Mount Kilimanjaro",
    answer3: "Mount Everest",
    answer4: "Mount McKinley",
    right_answer: 3,
  },
  {
    question: "In which year did the Berlin Wall fall?",
    answer1: "1987",
    answer2: "1989",
    answer3: "1988",
    answer4: "1990",
    right_answer: 2,
  },
  {
    question: "What is the longest river in the world?",
    answer1: "Amazon River",
    answer2: "Yangtze River",
    answer3: "Nile River",
    answer4: "Mississippi River",
    right_answer: 3,
  },
  {
    question: "Which scientist developed the theory of general relativity?",
    answer1: "Isaac Newton",
    answer2: "Albert Einstein",
    answer3: "Niels Bohr",
    answer4: "James Clerk Maxwell",
    right_answer: 2,
  },
  {
    question: "In which year did the Titanic sink?",
    answer1: "1910",
    answer2: "1923",
    answer3: "1930",
    answer4: "1912",
    right_answer: 4,
  },
  {
    question: "What is the chemical symbol for gold?",
    answer1: "Ag",
    answer2: "Au",
    answer3: "Pb",
    answer4: "Fe",
    right_answer: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    answer1: "Leonardo da Vinci",
    answer2: "Vincent van Gogh",
    answer3: "Michelangelo",
    answer4: "Pablo Picasso",
    right_answer: 1,
  },
  {
    question:
      "Which Japanese city was the first to be targeted by an atomic bomb?",
    answer1: "Nagasaki",
    answer2: "Tokyo",
    answer3: "Hiroshima",
    answer4: "Kyoto",
    right_answer: 3,
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    answer1: "Venus",
    answer2: "Saturn",
    answer3: "Jupiter",
    answer4: "Mars ",
    right_answer: 4,
  },
  {
    question: "Who is the author of the 'Harry Potter' book series?",
    answer1: "J.R.R. Tolkien",
    answer2: "J.K. Rowling",
    answer3: "C.S. Lewis",
    answer4: "Roald Dahl",
    right_answer: 2,
  },
];

function endScreenTemplate() {
  let questionBody = document.getElementById("question_template");
  questionBody.innerHTML = "";
  questionBody.innerHTML += /*html*/ `
        <div class="card-body" id="end_screen">
            <img class="trophyImage" src="./img/tropy.png" alt="">
            <img src="./img/brainresult.png" alt="">
            <div>
            <p style="text-align: center">COMPLETE</p>
            <p style="text-align: center">GENERAL QUIZ</p>
            </div>
                <div style="display: flex; gap: 50px;">
                    <p style="color: orange;">YOUR SCORE</p>
                    <p><b id="rightQuestions"></b> / <b id="amountQuestions"></b></p>
                </div>
                <button
        id="retry_Button"
        type="button"
        class="btn btn-primary end-btn"
        onclick="retryQuiz()">
        Replay
        </button>
        <button
        id="share_Button"
        type="button"
        class="btn btn-outline-primary end-btn">
        Share
        </button>
        </div>
    `;
  return;
}

function questionBodyTemplate() {
  let questionBody = document.getElementById("question_template");
  questionBody.innerHTML = "";
  questionBody.innerHTML += /*html*/ `
      <div class="card-body" id="question_body">
            <h6 class="card-title" id="question_text">Question</h6>
            <div class="card quiz_answer_card mb-3" onclick="answer('answer_1')">
              <div class="card-body" id="answer_1">Answer</div>
            </div>
            <div class="card quiz_answer_card mb-3" onclick="answer('answer_2')">
              <div class="card-body" id="answer_2">Answer</div>
            </div>
            <div class="card quiz_answer_card mb-3" onclick="answer('answer_3')">
              <div class="card-body" id="answer_3">Answer</div>
            </div>
            <div class="card quiz_answer_card mb-3" onclick="answer('answer_4')">
              <div class="card-body" id="answer_4">Answer</div>
            </div>
          </div>
          <div class="questionFooter">
            <button
              id="prev_Button"
              type="button"
              class="btn btn-primary"
              onclick="prevQuestion()"
              disabled
            >
            <i class='bx bxs-left-arrow-alt arrow_size' ></i>
            </button>
            <div id="question_count">
              <b id="current_question">1</b> of <b id="all_questions"></b> Questions
            </div>
            <button
              id="next_Button"
              type="button"
              class="btn btn-primary"
              onclick="nextQuestion()"
              disabled
            >
            <i class='bx bxs-right-arrow-alt arrow_size' ></i>
            </button>
          </div>
      `;
  return;
}

let rightQuestions = 0;
let currentQuestion = 0;
let userSelections = Array(questions.length).fill(null);

function startQuiz() {
  questionBodyTemplate();
  showCurrentQuestion();
  document.getElementById("all_questions").innerHTML = questions.length;
}

function renderQuestionTemplate() {
  let question = questions[currentQuestion];
  document.getElementById("current_question").innerHTML = currentQuestion + 1;
  document.getElementById("question_text").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer1"];
  document.getElementById("answer_2").innerHTML = question["answer2"];
  document.getElementById("answer_3").innerHTML = question["answer3"];
  document.getElementById("answer_4").innerHTML = question["answer4"];
}

function showCurrentQuestion() {
  if (currentQuestion >= questions.length) {
    endScreenTemplate();
    document.getElementById("amountQuestions").innerHTML = questions.length;
    document.getElementById("rightQuestions").innerHTML = rightQuestions;
    document.getElementById("question_template").style.background =
      "rgb(247,247,247)";
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  } else {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById("progressbar").style.width = `${percent}%`;
    renderQuestionTemplate();

    resetAnswer();

    let userSelection = userSelections[currentQuestion];
    if (userSelection !== null) {
      if (
        userSelection === `answer_${questions[currentQuestion].right_answer}`
      ) {
        document
          .getElementById(userSelection)
          .parentNode.classList.add("bg-success");
      } else {
        document
          .getElementById(userSelection)
          .parentNode.classList.add("bg-danger");
        document
          .getElementById(`answer_${questions[currentQuestion].right_answer}`)
          .parentNode.classList.add("bg-success");
      }
      disableAnswerButtons();
      document.getElementById("next_Button").disabled = false;
      document.getElementById("prev_Button").disabled = currentQuestion === 0;
    } else {
      enableAnswerButtons();
      resetAnswer();
      document.getElementById("next_Button").disabled = true;
      document.getElementById("prev_Button").disabled = currentQuestion === 0;
    }
  }
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idRightAnswer = `answer_${question.right_answer}`;
  disableAnswerButtons();

  userSelections[currentQuestion] = selection;

  if (selectedQuestionNumber == question.right_answer) {
    rightQuestions++;
    document.getElementById(selection).parentNode.classList.add("bg-success");
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idRightAnswer)
      .parentNode.classList.add("bg-success");
  }

  document.getElementById("next_Button").disabled = false;
  document.getElementById("prev_Button").disabled = currentQuestion === 0;
}

function nextQuestion() {
  currentQuestion++;
  showCurrentQuestion();
}

function prevQuestion() {
  currentQuestion--;
  showCurrentQuestion();
}

function disableAnswerButtons() {
  let buttons = document.querySelectorAll(".quiz_answer_card");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.pointerEvents = "none";
  }
}

function enableAnswerButtons() {
  let buttons = document.querySelectorAll(".quiz_answer_card");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.pointerEvents = "auto";
  }
}

function resetAnswer() {
  let answers = ["answer_1", "answer_2", "answer_3", "answer_4"];
  for (let answer of answers) {
    document
      .getElementById(answer)
      .parentNode.classList.remove("bg-danger", "bg-success");
  }
}

function retryQuiz() {
  currentQuestion = 0;
  rightQuestions = 0;
  userSelections.fill(null);
  questionBodyTemplate();
  showCurrentQuestion();
  document.getElementById("all_questions").innerHTML = questions.length;
  document.getElementById("question_template").style.background =
    "url(./img/brainbg.jpg)";
  document.getElementById("question_template").style.backgroundSize = "cover";
}
