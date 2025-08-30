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