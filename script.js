const loadQuizButton = document.getElementById('loadQuiz');
//const createQuizButton = document.getElementById('createQuiz');
const quiz = document.getElementById('quizDIV');

const createQuiz = document.getElementById('createQuiz');


const loadQuizButtonFunction = () => {
  if (localStorage.length === 0) {
    alert('Não há Quiz salvos')
  }
}


loadQuizButton.addEventListener("click", loadQuizButtonFunction);

//FUNÇÃO DO BOTÃO CRIAR FORMULÁRIO E SUA VOLTA PARA A PAGINA PRINCIPAL
const createQuizForm = () => {
  quiz.innerHTML = '<h2>CRIE SEU QUESTIONARIO</h2>\n      <div class="formLine">\n        <label for="quizTitleForm">Questão</label>\n        <input type="text" name="title" id="quizTitleForm" placeholder="Insira aqui a pergunta da questão">\n      </div>\n      <div class="formLine">\n        <label for="responseA">A.</label>\n        <input type="text" name="answer" id="responseA" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseB">B.</label>\n        <input type="text" name="answer" id="responseB" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseC">C.</label>\n        <input type="text" name="answer" id="responseC" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseD">D.</label>\n        <input type="text" name="answer" id="responseD" class="quizQuestionsForm">\n      </div>\n      <div id="formButtons">\n        <button class="initButton" id="createNextQuestion">Criar Próxima Pergunta</button>\n        <button class="initButton" id="finishQuizForm">Finalizar Criação do Quiz</button>\n        <button class="initButton" id="backToMainPage">Sair</button>\n      </div>\n    '

  const finalizar = document.getElementById('finishQuizForm');
  const nextQuestion = document.getElementById('createNextQuestion');
  const quit = document.getElementById('backToMainPage');

  quit.addEventListener("click", () => {
    quiz.innerHTML = '\n      <div id="initButtonsContainer">\n        <button id="loadQuiz" class="initButton">Carregar Quiz</button>\n        <button id="createQuiz" class="initButton">Criar Quiz</button>\n      </div>\n    '
    const createQuiz = document.getElementById('createQuiz');
    createQuiz.addEventListener("click", () => {
      createQuizForm();
    })
    const loadQuizButton = document.getElementById('loadQuiz');
    loadQuizButton.addEventListener("click", loadQuizButtonFunction)
  })
  
};

//FUNÇÃO INICIAL DA PAGINA PARA CRIAR O FORMULARIO
createQuiz.addEventListener("click", () => {
  createQuizForm();
})

//createQuizButton.addEventListener("click", () => {
//  createQuizForm();
//});

