document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const section = document.querySelector("#tabela");

    function getOrCreateCardContainer() {
        let container = document.getElementById("container-card-reserva");
        if (!container) {
            container = document.createElement("div");
            container.id = "container-card-reserva";
            container.className = "container-card-reserva";
            section.appendChild(container);
        }
        return container;
    }

function renderReservaCard(reserva) {
    const cardsContainer = document.getElementById("cards-reservas");
    
    const card = document.createElement("div");
    card.className = "card-reserva-confirmada";
    card.innerHTML = `
        <div class="mensagem-reserva">Reserva confirmada!</div>
        <div class="dados-reserva">
            <p><strong>Data:</strong> ${reserva.data}</p>
            <p><strong>Horário:</strong> ${reserva.horario}</p>
            <p><strong>Mesas:</strong> ${reserva.mesas}</p>
            <p><strong>Pessoas:</strong> ${reserva.pessoas}</p>
        </div>
    `;
    
    cardsContainer.appendChild(card);
}


    function getHorarioTexto(valor) {
        const select = document.querySelector('select[aria-label="qtdepessoas"]');
        const opt = select.querySelector(`option[value="${valor}"]`);
        return opt ? opt.textContent : valor;
    }

    function mostrarUltimaReserva() {
        const reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        const cardsContainer = document.getElementById("cards-reservas");
        cardsContainer.innerHTML = ""; // Limpar container antes de adicionar
        
        if (reservas.length > 0) {
            reservas.forEach(reserva => {
                renderReservaCard(reserva);
            });
        }
    }

    mostrarUltimaReserva();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = document.getElementById("dataReserva").value;
        const horarioValor = document.querySelector('select[aria-label="qtdepessoas"]').value;
        const horario = getHorarioTexto(horarioValor);
        const mesas = document.getElementById("qtdMesas").options[document.getElementById("qtdMesas").selectedIndex].text;
        const pessoas = document.getElementById("qtdPessoas").options[document.getElementById("qtdPessoas").selectedIndex].text;

        const reserva = { data, horario, mesas, pessoas };

        let reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        reservas.push(reserva);
        localStorage.setItem("reservasCucina", JSON.stringify(reservas));

        renderReservaCard(reserva);

        form.reset();
    });
});