// Inicializa o AOS para animações de rolagem
AOS.init({
    duration: 1000, // duração da animação
    once: true,     // animação acontece apenas uma vez
});

// Seleciona o formulário de sugestões pelo id
const form = document.getElementById("formSugestao");

// Seleciona a lista onde as sugestões serão adicionadas
const lista = document.getElementById("listaSugestoes");

// Adiciona um "ouvinte" para quando o formulário for enviado
form.addEventListener("submit", function (e) {
    e.preventDefault(); // não recarrega a página

    // Pega os valores digitados nos campos "nome" e "sugestao"
    const nome = document.getElementById("nome").value;
    const sugestao = document.getElementById("sugestao").value;

    // Verifica se os dois campos têm algum valor
    if (nome && sugestao) {
        // Cria um novo item de lista (<li>)
        const li = document.createElement("li");

        // Adiciona a classe do Bootstrap para estilização de lista
        li.className = "list-group-item";

        // Define o conteúdo do item como "nome: sugestão"
        li.textContent = `${nome}: ${sugestao}`;

        // Adiciona o item à lista existente
        lista.appendChild(li);

        // Limpa os campos do formulário após enviar
        form.reset();
    }
});

