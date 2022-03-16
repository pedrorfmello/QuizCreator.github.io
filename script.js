///////////////////////////////////////////////////////////////////////////////DECLARAÇÃO DAS VARIÁVEIS GLOBAIS
const create = document.createElement.bind(document);
const loadQuizButton = document.getElementById('loadQuiz');
const quiz = document.getElementById('quizDIV');
const createQuiz = document.getElementById('createQuiz');
let testeQuiz = [];
let score = 0;
let contador = 0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////FUNÇÃO QUE CARREGA OS QUIZES GRAVADOS NO LOCALSTORAGE
const playLoadedQuiz = (event) => {
  const quizName = (event.target).parentNode.parentNode.firstChild.innerHTML
  const quizObj = JSON.parse(localStorage.getItem(quizName))
  testeQuiz = quizObj;
  if (contador < testeQuiz.length) {
    quizStructure(contador);
    contador += 1;
  } else {
    quizEnd();
  }
}

const deleteLoadedQuiz = (event) => {
  const quizName = (event.target).parentNode.parentNode.firstChild.innerHTML
  localStorage.removeItem(quizName);
  if (localStorage.length === 0) {
    homePage();
  } else {
    loadQuizButtonFunction();
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////FUNÇÃO QUE CARREGA OS QUIZES GRAVADOS NO LOCALSTORAGE
const loadQuizButtonFunction = () => {
  if (localStorage.length === 0) {
    alert('Não há Quiz salvos');
  } else {
    quiz.innerHTML = '\n      <ol id="quizLoadList"></ol>\n      <button class="initButton" id="backToHome">Voltar</button>\n    '
    const allQuiz = Object.keys(localStorage);
    allQuiz.forEach((element) => {
      const listItemCount = document.getElementsByTagName('li').length
      if (listItemCount < 6){
        const quizList = document.querySelector('#quizLoadList');
        const deleteBtn = document.getElementById('deleteThisQuiz');
        const listItem = create('li');
        const delBtn = create('button');
        const playBtn = create('button');
        const div = create('div');
        const h4 = create('h4');

        div.id = "playAndDeleteBtnsDiv"
        h4.innerHTML = element;
        
        delBtn.innerHTML = "Excluir";
        delBtn.className = "initButton deleteItemStorageBtn";
        delBtn.id = "deleteItemBtn";

        playBtn.innerHTML = "Jogar";
        playBtn.className = "initButton playStoredQuiz";
        playBtn.id = "playStoredBtn";

        listItem.className = "loadObjectItemList";
        listItem.id = element;

        listItem.appendChild(h4);
        listItem.appendChild(div)
        div.appendChild(playBtn)
        div.appendChild(delBtn)
        
        playBtn.addEventListener("click", playLoadedQuiz);
        delBtn.addEventListener("click", deleteLoadedQuiz)
        
        quizList.appendChild(listItem);
      } else {
        return;
      }
    });
    const backToHome = document.getElementById('backToHome');
    backToHome.addEventListener("click", homePage);
  }
}

loadQuizButton.addEventListener("click", loadQuizButtonFunction);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////FUNÇÃO QUE RETORNA A PAGINA INICIAL DO QUIZ
const homePage = () => {
  quiz.innerHTML = '\n      <img src="src/quizLogo.png" alt="Quiz Logo">\n      <div id="initButtonsContainer">\n        <button id="loadQuiz" class="initButton">Carregar Quiz</button>\n        <button id="createQuiz" class="initButton">Criar Quiz</button>\n      </div>\n    ';
  const createQuiz = document.getElementById('createQuiz');
  createQuiz.addEventListener("click", createQuizForm);
  const loadQuizButton = document.getElementById('loadQuiz');
  loadQuizButton.addEventListener("click", loadQuizButtonFunction);
  testeQuiz = [];
  score = 0;
  contador = 0;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////FUNÇÃO QUE PEGA A QUESTÃO CRIADA NO FORMULÁRIO E ADICIONA AO ARRAY DO QUESTIONÁRIO
const createNextQuestion = () => {
  const questObj = {};
  const title = document.getElementById('quizTitleForm');
  const a_answ = document.getElementById('responseA');
  const b_answ = document.getElementById('responseB');
  const c_answ = document.getElementById('responseC');
  const d_answ = document.getElementById('responseD');
  const correctAnswer = document.getElementById('rightAnswer');

  if(title.value === '') {
    alert('Escreva a pergunta a ser feita na questão!')
  } else if (a_answ.value === '' || b_answ.value === '' || c_answ.value === '' || d_answ.value === '') {
    alert('Preencha todas as alternativas de resposta')
  } else {
    questObj.title = title.value;
    questObj.a = a_answ.value;
    questObj.b = b_answ.value;
    questObj.c = c_answ.value;
    questObj.d = d_answ.value;
    questObj.answer = correctAnswer.value;
  
    title.value = '';
    a_answ.value = '';
    b_answ.value = '';
    c_answ.value = '';
    d_answ.value = '';
    correctAnswer.value = 'a';
  
    testeQuiz.push(questObj);
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////FUNÇÃO DO BOTÃO CRIAR FORMULÁRIO E SUA VOLTA PARA A PAGINA PRINCIPAL
const createQuizForm = () => {
  quiz.innerHTML = '\n      <div class="formLine">\n        <label for="quizTitleForm">Questão</label>\n        <input type="text" name="title" id="quizTitleForm" placeholder="Insira aqui a pergunta da questão">\n      </div>\n      <div class="formLine">\n        <label for="responseA">A.</label>\n        <input type="text" name="answer" id="responseA" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseB">B.</label>\n        <input type="text" name="answer" id="responseB" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseC">C.</label>\n        <input type="text" name="answer" id="responseC" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="responseD">D.</label>\n        <input type="text" name="answer" id="responseD" class="quizQuestionsForm">\n      </div>\n      <div class="formLine">\n        <label for="rightAnswer">Resposta correta</label>\n        <select id="rightAnswer" name="rightAnswerQst" class="quizQuestionsForm">\n          <option value="a">A</option>\n          <option value="b">B</option>\n          <option value="c">C</option>\n          <option value="d">D</option>\n        </select>\n      </div>\n      <div id="formButtons">\n        <button class="initButton" id="createNextQuestion">Criar Próxima Pergunta</button>\n        <button class="initButton" id="finishQuizForm">Finalizar Criação do Quiz</button>\n        <button class="initButton" id="backToMainPage">Sair</button>\n      </div>\n    ';
  
  const finalizar = document.getElementById('finishQuizForm');
  const nextQuestion = document.getElementById('createNextQuestion');
  const quit = document.getElementById('backToMainPage');
  
  nextQuestion.addEventListener("click", createNextQuestion);
  finalizar.addEventListener("click", finishQuizFormFunction);
  quit.addEventListener("click", homePage);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////PAGINA INICIAL E SUAS FUNÇÕES
createQuiz.addEventListener("click", () => {
  testeQuiz = [];
  createQuizForm();
  score = 0;
  contador = 0;
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const quizStructure = (index) => {
  quiz.innerHTML = `\n      <h2>${testeQuiz[index].title}</h2>\n      <div id="a" class="quizAnswBtn">${testeQuiz[index].a}</div>\n      <div id="b" class="quizAnswBtn">${testeQuiz[index].b}</div>\n      <div id="c" class="quizAnswBtn">${testeQuiz[index].c}</div>\n      <div id="d" class="quizAnswBtn">${testeQuiz[index].d}</div>\n    `
  
  const correctAnswer = testeQuiz[index].answer;
  
  const optAQuiz = document.getElementById('a');
  const optBQuiz = document.getElementById('b');
  const optCQuiz = document.getElementById('c');
  const optDQuiz = document.getElementById('d');
  
  const verifyAnswer = (event) => {
    if (event.target.id === correctAnswer) {
      score += 1;
      quizEngine();
    } else {
      quizEngine();
    }
  };

  optAQuiz.addEventListener("click", verifyAnswer);
  optBQuiz.addEventListener("click", verifyAnswer);
  optCQuiz.addEventListener("click", verifyAnswer);
  optDQuiz.addEventListener("click", verifyAnswer);
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const playAgainFunction = () => {
  if (contador < testeQuiz.length) {
    quizStructure(contador);
    contador += 1;
  } else {
    quizEnd();
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const quizEnd = () => {
  if (score > testeQuiz.length) {
    score = testeQuiz.length;
  };
  quiz.innerHTML = `\n      <h2>Você acertou:</h2>\n      <div>\n        <h3>${score}/${testeQuiz.length}</h3>\n      </div>\n      <div id="endGameDiv">\n        <button class="initButton" id="playAgain">Tentar Novamente</button>\n        <button class="initButton" id="backToHomePage">Voltar ao Inicio</button>\n      </div>\n    `
  const playAgain = document.getElementById('playAgain');
  const backToHomePage = document.getElementById('backToHomePage');
  
  playAgain.addEventListener("click", playAgainFunction);
  backToHomePage.addEventListener("click", homePage);

  score = 0;
  contador = 0;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const finishQuizFormFunction = () => {
  const title = document.getElementById('quizTitleForm');
  const a_answ = document.getElementById('responseA');
  const b_answ = document.getElementById('responseB');
  const c_answ = document.getElementById('responseC');
  const d_answ = document.getElementById('responseD');
  const conditionEqual = title.value === '' && a_answ.value === '' && b_answ.value === '' && c_answ.value === '' && d_answ.value === '';
  const conditionDiff = title.value !== '' || a_answ.value !== '' || b_answ.value !== '' || c_answ.value !== '' || d_answ.value !== '';

  if (testeQuiz.length === 0 && conditionEqual) {
    alert('Crie ao menos uma pergunta')
  } else if (testeQuiz.length === 0 && conditionDiff) {
    createNextQuestion();
    saveLocalStorage();
  } else if (conditionEqual){
    saveLocalStorage();
  } else if (conditionDiff){
    createNextQuestion();
    saveLocalStorage();
  } else {
    saveLocalStorage();
  }
};

const quizEngine = () => {
  if (contador < testeQuiz.length) {
    quizStructure(contador);
    contador += 1;
  } else {
    quizEnd();
  }
};

const setArrayNameToLocalStorage = () => {
  quiz.innerHTML = '\n      <h2>Defina um nome para o seu Quiz</h2>\n      <input type="text" class="quizQuestionsForm" id="quizTitleSave" maxlength="30">\n      <div>\n        <button class="initButton" id="saveAndPlay">Salvar e Jogar</button>\n      </div>\n    '
  const saveAndPlay = document.getElementById('saveAndPlay');
  saveAndPlay.addEventListener("click", () => {
    const quizTitle = document.getElementById('quizTitleSave').value;
    localStorage.setItem(quizTitle, JSON.stringify(testeQuiz));

    if (contador < testeQuiz.length) {
      quizStructure(contador);
      contador += 1;
    } else {
      quizEnd();
    }
  })
}

const saveLocalStorage = () => {
  quiz.innerHTML = '\n      <h2>Gostaria de salvar esse Quiz antes de jogar?</h2>\n      <div id="localStorageDIV">\n        <button class="initButton" id="saveQuestLocalStorage">Sim</button>\n        <button class="initButton" id="dontSaveLocalStorage">Não</button>\n      </div>\n    '  
  const save = document.getElementById('saveQuestLocalStorage');
  const dontSave = document.getElementById('dontSaveLocalStorage');
  save.addEventListener("click", setArrayNameToLocalStorage)
  dontSave.addEventListener("click", () => {
    if (contador < testeQuiz.length) {
      quizStructure(contador);
      contador += 1;
    } else {
      quizEnd();
    }
  })
}
