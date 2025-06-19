document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#reservaForm");
    const section = document.querySelector("#tabela");
    const mensagemErro = document.getElementById("mensagemErro");
    const dataInput = document.getElementById("dataReserva");

    // Configurar a data mínima como hoje
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataMinima = `${ano}-${mes}-${dia}`;
    dataInput.setAttribute('min', dataMinima);

    function ajustarEspacoFooter() {
        const cards = document.querySelectorAll('.card-reserva-confirmada');
        const alturaFooter = document.querySelector('footer').offsetHeight;
        // Calcula o espaço necessário baseado na quantidade de cards e altura do footer
        const espacoNecessario = cards.length * 200 + alturaFooter + 100;
        
        // Ajusta o padding inferior do wrapper
        document.querySelector('.wrapper').style.paddingBottom = `${espacoNecessario}px`;
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
        ajustarEspacoFooter(); // Chama a função para ajustar o espaço após adicionar o card
    }

    function getHorarioTexto(valor) {
        const select = document.getElementById('horaReserva');
        const opt = select.querySelector(`option[value="${valor}"]`);
        return opt ? opt.textContent : valor;
    }

    function verificarDisponibilidade(data, horario) {
        const reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        return reservas.some(r => r.data === data && r.horario === horario);
    }

    function mostrarMensagemErro(mensagem) {
        mensagemErro.textContent = mensagem;
        mensagemErro.classList.remove('d-none');
        mensagemErro.classList.add('d-block');
        
        // Ocultar mensagem após 5 segundos
        setTimeout(() => {
            mensagemErro.classList.remove('d-block');
            mensagemErro.classList.add('d-none');
        }, 5000);
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

        const data = dataInput.value;
        const horarioValor = document.getElementById("horaReserva").value;
        const horario = getHorarioTexto(horarioValor);
        const mesas = document.getElementById("qtdMesas").options[document.getElementById("qtdMesas").selectedIndex].text;
        const pessoas = document.getElementById("qtdPessoas").options[document.getElementById("qtdPessoas").selectedIndex].text;

        // Verificar se todos os campos foram preenchidos
        if (!data || !horarioValor || !mesas || !pessoas) {
            mostrarMensagemErro("Por favor, preencha todos os campos do formulário.");
            return;
        }

        // Verificar se a data é passada
        const dataSelecionada = new Date(data);
        const hojeObj = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        if (dataSelecionada < hojeObj) {
            mostrarMensagemErro("Não é possível fazer reservas para datas passadas.");
            return;
        }

        // Verificar disponibilidade
        if (verificarDisponibilidade(data, horario)) {
            mostrarMensagemErro("Desculpe, este horário já está reservado para esta data. Por favor, escolha outro horário.");
            return;
        }

        const reserva = { data, horario, mesas, pessoas };

        let reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        reservas.push(reserva);
        localStorage.setItem("reservasCucina", JSON.stringify(reservas));

        renderReservaCard(reserva);

        form.reset();
        mensagemErro.classList.add('d-none');
    });

    // Inicializar o espaço quando a página carregar
    window.addEventListener('load', ajustarEspacoFooter);
    // Ajustar também quando a janela for redimensionada
    window.addEventListener('resize', ajustarEspacoFooter);

    // Fechar o menu ao clicar em um link (SOLUÇÃO CORRIGIDA)
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarContent');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Verifica se o menu está aberto (em telas pequenas)
            if (navbarCollapse.classList.contains('show')) {
                // Cria uma instância do collapse do Bootstrap
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                // Fecha o menu
                bsCollapse.hide();
            }
        });
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickOnToggler = document.querySelector('.navbar-toggler').contains(event.target);
        
        if (!isClickInsideNavbar && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});