const loadQuizButton = document.getElementById('loadQuiz');
const createQuizButton = document.getElementById('createQuiz');
const quiz = document.getElementById('quiz');

loadQuizButton.addEventListener("click", () => {
  if (localStorage.length === 0) {
    alert('Não há Quiz salvos')
  }
})

//const createQuizForm = () => {
//  quiz.innerHTML = 
//};

createQuizButton.addEventListener("click", () => {
  createQuizForm();
});

