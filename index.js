const movements = [];
const buttons = [];
const useMovement = [];

let isUserTurn = false;


function init() {

  buttons.push({
    key: 'red',
    element: document.getElementById('red')
  });
  buttons.push({
    key: 'blue',
    element: document.getElementById('blue')
  });
  buttons.push({
    key: 'green',
    element: document.getElementById('green')
  });
  buttons.push({
    key: 'yellow',
    element: document.getElementById('yellow')
  });

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].element.onclick = function() {
      if (isUserTurn) {
        animateButton(buttons[i].key);
        addUserMovement(buttons[i].key);
        if (!checkStatus()) {
          console.log('you loose');
          looseAnimation().then(() => {
            reset();
          });
        } else {
          if (useMovement.length === movements.length) {
            // next level
            useMovement.length = 0;
            isUserTurn = false;
            setTimeout(() => {
              animateAllPreviousSteps().then(() => {
                addMovement().then(() => {
                  isUserTurn = true;
                });
              });
            }, 2000);
          }
        }
      } else {
        console.log('wait for your turn');
      }
    };
  }
  // initial movement on init
  addMovement().then(() => {
    isUserTurn = true;
  });
}

function addUserMovement(move) {
  useMovement.push(move);
}
function reset() {
  movements.length = 0;
  useMovement.length = 0;
  for (var i = 0; i < buttons.length; i++) {
    animateButton(buttons[i].key)
  }
  setTimeout(() => {
    addMovement();
  }, 2000);
}


function addMovement() {
  const next = Math.floor(Math.random() * buttons.length);
  movements.push(buttons[next].key);
  return animateButton(buttons[next].key);
}

function checkStatus() {
  let valid = true;
  if(useMovement[useMovement.length - 1] !== movements[useMovement.length - 1]) {
    valid = false;
  }

  return valid;
}

function animateButton(key) {
  return new Promise((resolve) => {
    let buttonReference;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].key === key) {
        buttonReference = buttons[i];
        break;
      }
    }

    buttonReference.element.classList.add('active');
    setTimeout(() => {
      buttonReference.element.classList.remove('active');
      setTimeout(() => {
        resolve();
      }, 200);
    }, 500);
  });
}

function animateAllPreviousSteps([current, ...tail] = movements) {
  return animateButton(current).then(() => {
    if (tail.length) {
      return animateAllPreviousSteps(tail);
    } else {
      return Promise.resolve();
    }
  });
}
function looseAnimation() {
  return new Promise((resolve) => {
    for (var i = 0; i < buttons.length; i++) {
      animateButton(buttons[i].key);
    }
    setTimeout(() => {
      for (var i = 0; i < buttons.length; i++) {
        animateButton(buttons[i].key);
      }
    }, 500);
    setTimeout(() => {
      for (var i = 0; i < buttons.length; i++) {
        animateButton(buttons[i].key);
      }
    }, 2000);
    setTimeout(() => {
      resolve();
    }, 5000);
  })
}
init();