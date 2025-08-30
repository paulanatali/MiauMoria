 AOS.init({
    duration:1000,
    once:true,
});
 const form = document.getElementById("formSugestao");
                const lista = document.getElementById("listaSugestoes");

                form.addEventListener("submit", function (e) {
                    e.preventDefault();
                    const nome = document.getElementById("nome").value;
                    const sugestao = document.getElementById("sugestao").value;

                    if (nome && sugestao) {
                        const li = document.createElement("li");
                        li.className = "list-group-item";
                        li.textContent = `${nome}: ${sugestao}`;
                        lista.appendChild(li);
                        form.reset();
                    }
                });

