// BUTTON RESET
document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
    // por enquanto só recarrega a página
    location.reload();

}

// BUTTON AVALIAR
document.addEventListener("DOMContentLoaded", () => {
    const avaliarBtn = document.getElementById("avaliar");
    const avaliarModal = new bootstrap.Modal(document.getElementById('avaliarModal'));

    avaliarBtn.addEventListener("click", () => {
        avaliarModal.show(); // abre o modal
    });
});

//JOGA DA MEMORIA

// Lista de imagens (cada carta duas vezes)
const imagens = [
    "/assetss/black_cat.png",
    "/assetss/diamond_heart.png",
    "/assetss/maneki.png",
    "/assetss/estrela.png",
    "/assetss/orange_cat.png",
    "/assetss/pata_gato.png",
    "/assetss/novelo.png",
    "/assetss/cat_profile.png"
];

// Variáveis de controle do jogo
let baralho = [];           // baralho embaralhado
let primeiraCarta = null;   // primeira carta clicada
let segundaCarta = null;    // segunda carta clicada
let trava = false;          // trava temporária para evitar cliques rápidos
let movimentos = 0;         // contagem de movimentos
let paresEncontrados = 0;   // número de pares encontrados

const tabuleiro = document.getElementById('tabuleiro');
const spanMovimentos = document.getElementById('movimentos');  // estatísticas na tela
const spanPares = document.getElementById('pares');
const botaoReiniciar = document.getElementById('reiniciar');

// Função para iniciar/reiniciar o jogo
function startGame() {
    // Criar baralho duplicando as imagens e embaralhando
    baralho = embaralhar([...imagens, ...imagens]);

    // Resetar tabuleiro e variáveis
    tabuleiro.innerHTML = '';
    primeiraCarta = null;
    segundaCarta = null;
    trava = false;
    movimentos = 0;
    paresEncontrados = 0;
    spanMovimentos.textContent = movimentos;
    spanPares.textContent = paresEncontrados;

    // Criar cartas
    baralho.forEach((imgSrc, idx) => {
        const carta = document.createElement('div');
        carta.className = 'card';
        carta.dataset.valor = imgSrc; // guarda qual imagem é
        carta.dataset.indice = idx;

        const inner = document.createElement('div');
        inner.className = 'inner';

        // Frente da carta 
        const frente = document.createElement('div');
        frente.className = 'face front';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Carta";
        frente.appendChild(img);

        // Verso da carta
        const verso = document.createElement('div');
        verso.className = 'face back';

        // Monta a carta
        inner.appendChild(frente);
        inner.appendChild(verso);
        carta.appendChild(inner);
        tabuleiro.appendChild(carta);

        // Evento de clique na carta
        carta.addEventListener('click', onCardClick);
    });
}

// Função chamada ao clicar em uma carta
function onCardClick(e) {
    const carta = e.currentTarget;

    // Se estiver travado ou carta já virada, ignora clique
    if (trava || carta.classList.contains('flipped')) return;

    // Vira a carta
    carta.classList.add('flipped');

    // Se for a primeira carta clicada, só guarda referência
    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }

    // Segunda carta clicada
    segundaCarta = carta;
    movimentos++;                  // incrementa movimentos
    spanMovimentos.textContent = movimentos;

    // Verifica se formam par
    verificarPar();
}

// Verifica se as duas cartas viradas formam um par
function verificarPar() {
    if (primeiraCarta.dataset.valor === segundaCarta.dataset.valor) {
        // Encontrou par
        paresEncontrados++;
        spanPares.textContent = paresEncontrados;

        // Remove eventos para não clicar de novo
        primeiraCarta.removeEventListener('click', onCardClick);
        segundaCarta.removeEventListener('click', onCardClick);

        primeiraCarta = segundaCarta = null;

        // Se todos os pares encontrados, alerta vitória
        if (paresEncontrados === imagens.length) {
            setTimeout(() => alert(`Parabéns! Você encontrou todos os pares em ${movimentos} movimentos.\nClique no botão ao lado para reiniciar o jogo :)`), 200);
        }
        return;
    }

    // Se não for par, vira as cartas de volta após 700ms
    trava = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flipped');
        segundaCarta.classList.remove('flipped');
        primeiraCarta = segundaCarta = null;
        trava = false;
    }, 700);
}

// Função para embaralhar array
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // troca posições
    }
    return array;
}

// Botão Reiniciar da sidebar
botaoReiniciar.addEventListener('click', startGame);

// Inicia o jogo quando a página carrega
startGame();

//Música
const audio = document.getElementById("musica");//add id musica
const btnSom = document.getElementById("som");//add id som
const iconSom = document.getElementById("iconSom");// add id img som

audio.volume = 0.2; // volume baixo


// Só começa a tocar quando clicar no botão
btnSom.addEventListener("click", () => { //evento tocar
  if (audio.paused) {
    audio.play();
    iconSom.src = "assetss/play.png"; //img
  } else {
    audio.pause();
    iconSom.src = "assetss/pause.png"; //img
  }
});

