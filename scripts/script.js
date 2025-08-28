
    const emojis = ["🍎","🍌","🍇","🍓","🍑","🍍","🥝","🍉"];

    let deck = [];
    let firstCard = null;
    let secondCard = null;
    let lock = false;
    let moves = 0;
    let matchedPairs = 0;

    const board = document.getElementById('board');
    const movesEl = document.getElementById('moves');
    const pairsEl = document.getElementById('pairs');
    const restartBtn = document.getElementById('restart');

    function startGame(){
      deck = shuffle([...emojis, ...emojis]);
      board.innerHTML = '';
      firstCard = secondCard = null;
      lock = false; moves = 0; matchedPairs = 0;
      movesEl.textContent = moves; pairsEl.textContent = matchedPairs;

      deck.forEach((value, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.dataset.index = idx;

        const inner = document.createElement('div');
        inner.className = 'inner';

        const front = document.createElement('div');
        front.className = 'face front';
        front.textContent = value;

        const back = document.createElement('div');
        back.className = 'face back';
        back.textContent = '❓';

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        board.appendChild(card);

        card.addEventListener('click', onCardClick);
      });
    }

    function onCardClick(e){
      const card = e.currentTarget;
      if(lock) return;
      if(card.classList.contains('flipped')) return;

      card.classList.add('flipped');

      if(!firstCard){
        firstCard = card;
        return;
      }

      secondCard = card;
      moves++;
      movesEl.textContent = moves;

      checkMatch();
    }

    function checkMatch(){
      const v1 = firstCard.dataset.value;
      const v2 = secondCard.dataset.value;

      if(v1 === v2){
        matchedPairs++;
        pairsEl.textContent = matchedPairs;
        firstCard.removeEventListener('click', onCardClick);
        secondCard.removeEventListener('click', onCardClick);
        firstCard = secondCard = null;

        if(matchedPairs === emojis.length){
          setTimeout(()=>alert(`Parabéns! Você encontrou todos os pares em ${moves} movimentos.`), 200);
        }
        return;
      }

      lock = true;
      setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = secondCard = null;
        lock = false;
      }, 700);
    }

    function shuffle(array){
      for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
      }
      return array;
    }

    restartBtn.addEventListener('click', startGame);
    startGame();
  