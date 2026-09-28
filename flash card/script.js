const defaultCards = [
  {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language. It is used to structure content on web pages."
  },
  {
    question: "What is CSS?",
    answer: "CSS stands for Cascading Style Sheets. It is used to style and design web pages."
  },
  {
    question: "What is an algorithm?",
    answer: "An algorithm is a step-by-step procedure for solving a problem or completing a task."
  },
  {
    question: "What is a variable in programming?",
    answer: "A variable in programming is a named storage location that holds a value which can be modified during the execution of a program."
  },
  {
    question: "What is a function in JavaScript?",
    answer: "A function in JavaScript is a reusable block of code designed to perform a specific task when called."
  },
  {
    question: "What is the purpose of semantic HTML elements?",
    answer: "Semantic HTML elements describe the meaning of content, making pages more accessible and easier for browsers and search engines to understand."
  },
  {
    question: "What is the difference between HTML and CSS?",
    answer: "HTML structures the content of a webpage, while CSS is used to style and visually design that content."
  },
  {
    question: "What is a loop in programming?",
    answer: "A loop is a programming construct that repeats a block of code until a certain condition is met."
  },
  {
    question: "What is a database?",
    answer: "A database is an organized collection of data that can be stored, retrieved, and managed efficiently."
  },
  {
    question: "What is the DOM in web development?",
    answer: "The DOM is the Document Object Model, which represents the structure of a web page so JavaScript can access and manipulate it."
  },
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language used to add interactivity and dynamic behavior to websites."
  },
  {
    question: "What is the purpose of the `if` statement?",
    answer: "The `if` statement checks a condition and runs a block of code only when that condition is true."
  },
  {
    question: "What is an array?",
    answer: "An array is a data structure used to store multiple values in a single variable."
  },
  {
    question: "What does CSS stand for?",
    answer: "CSS stands for Cascading Style Sheets."
  },
  {
    question: "What is a class in CSS?",
    answer: "A class in CSS is a reusable selector that can be applied to multiple HTML elements to share styles."
  },
  {
    question: "What is the box model in CSS?",
    answer: "The CSS box model describes the layout of an element as content, padding, border, and margin."
  },
  {
    question: "What is Flexbox?",
    answer: "Flexbox is a CSS layout model that helps arrange elements in rows or columns with flexible spacing."
  },
  {
    question: "What is a boolean?",
    answer: "A boolean is a data type that can have only two values: true or false."
  },
  {
    question: "What is a conditional statement?",
    answer: "A conditional statement executes code based on whether a specified condition is true or false."
  },
  {
    question: "What is event handling in JavaScript?",
    answer: "Event handling is the process of responding to user actions such as clicks, key presses, or mouse movements."
  },
  {
    question: "What is localStorage?",
    answer: "localStorage is a browser feature that stores data in the user's browser so it can be accessed later."
  },
  {
    question: "What is a comment in programming?",
    answer: "A comment is text in code that is ignored by the program but helps developers understand the purpose of the code."
  },
  {
    question: "What is the difference between let and const?",
    answer: "`let` allows reassignment, while `const` is used for values that should not be reassigned."
  },
  {
    question: "What is responsive design?",
    answer: "Responsive design is an approach that makes websites adapt to different screen sizes and devices."
  },
  {
    question: "What is an API?",
    answer: "An API is an application programming interface that allows different software systems to communicate with each other."
  },
  {
    question: "What is debugging?",
    answer: "Debugging is the process of finding and fixing errors or bugs in code."
  },
  {
    question: "What is a string in programming?",
    answer: "A string is a sequence of characters used to represent text in a program."
  },
  {
    question: "What is a framework?",
    answer: "A framework is a set of tools and libraries that helps developers build applications faster and more consistently."
  },
  {
    question: "What is the difference between front-end and back-end development?",
    answer: "Front-end development focuses on the user interface and experience, while back-end development handles server-side logic and data management."
  }
];

let cards = JSON.parse(localStorage.getItem("flashcards")) || defaultCards;
let currentIndex = 0;
let editingIndex = null;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const answerBox = document.getElementById("answerBox");
const counterEl = document.getElementById("counter");
const showAnswerBtn = document.getElementById("showAnswerBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const formPanel = document.getElementById("formPanel");
const formTitle = document.getElementById("formTitle");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

function saveCards() {
  localStorage.setItem("flashcards", JSON.stringify(cards));
}

function displayCard() {
  if (cards.length === 0) {
    questionEl.textContent = "No flashcards available.";
    answerEl.textContent = "";
    counterEl.textContent = "Card 0 of 0";
    answerBox.classList.add("hidden");
    showAnswerBtn.classList.add("hidden");
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    editBtn.disabled = true;
    deleteBtn.disabled = true;
    return;
  }

  const card = cards[currentIndex];

  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;
  counterEl.textContent = `Card ${currentIndex + 1} of ${cards.length}`;

  answerBox.classList.add("hidden");
  showAnswerBtn.classList.remove("hidden");
  showAnswerBtn.textContent = "Show Answer";

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
  editBtn.disabled = false;
  deleteBtn.disabled = false;
}

showAnswerBtn.addEventListener("click", () => {
  answerBox.classList.toggle("hidden");
  showAnswerBtn.textContent = answerBox.classList.contains("hidden")
    ? "Show Answer"
    : "Hide Answer";
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayCard();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    displayCard();
  }
});

addBtn.addEventListener("click", () => {
  editingIndex = null;
  formTitle.textContent = "Add Flashcard";
  questionInput.value = "";
  answerInput.value = "";
  formPanel.classList.remove("hidden");
  questionInput.focus();
});

editBtn.addEventListener("click", () => {
  if (!cards.length) return;

  editingIndex = currentIndex;
  formTitle.textContent = "Edit Flashcard";
  questionInput.value = cards[currentIndex].question;
  answerInput.value = cards[currentIndex].answer;
  formPanel.classList.remove("hidden");
  questionInput.focus();
});

deleteBtn.addEventListener("click", () => {
  if (!cards.length) return;

  const confirmed = confirm("Are you sure you want to delete this flashcard?");

  if (!confirmed) return;

  cards.splice(currentIndex, 1);

  if (currentIndex >= cards.length) {
    currentIndex = Math.max(0, cards.length - 1);
  }

  saveCards();
  displayCard();
});

saveBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("Please enter both a question and an answer.");
    return;
  }

  if (editingIndex === null) {
    cards.push({ question, answer });
    currentIndex = cards.length - 1;
  } else {
    cards[editingIndex] = { question, answer };
    currentIndex = editingIndex;
  }

  saveCards();
  formPanel.classList.add("hidden");
  displayCard();
});

cancelBtn.addEventListener("click", () => {
  formPanel.classList.add("hidden");
});

displayCard();
