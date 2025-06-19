document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#reservaForm");
    const mensagemErro = document.getElementById("mensagemErro");
    const dataInput = document.getElementById("dataReserva");
    const telefoneInput = document.getElementById("telefoneReserva");

    // Máscara para telefone
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length > 0) {
            value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
        }
        
        e.target.value = value;
    });

    // Configurar data mínima como hoje
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataMinima = `${ano}-${mes}-${dia}`;
    dataInput.setAttribute('min', dataMinima);

    function ajustarEspacoFooter() {
        const cards = document.querySelectorAll('.card-reserva-confirmada');
        const alturaFooter = document.querySelector('footer').offsetHeight;
        const espacoNecessario = cards.length * 200 + alturaFooter + 100;
        document.querySelector('.wrapper').style.paddingBottom = `${espacoNecessario}px`;
    }

    function renderReservaCard(reserva) {
        const cardsContainer = document.getElementById("cards-reservas");
        
        const card = document.createElement("div");
        card.className = "card-reserva-confirmada";
        card.innerHTML = `
            <div class="mensagem-reserva">Reserva confirmada!</div>
            <div class="dados-reserva">
                <p><strong>Nome:</strong> ${reserva.nome}</p>
                <p><strong>Telefone:</strong> ${reserva.telefone}</p>
                <p><strong>Data:</strong> ${reserva.data}</p>
                <p><strong>Horário:</strong> ${reserva.horario}</p>
                <p><strong>Mesas:</strong> ${reserva.mesas}</p>
                <p><strong>Pessoas:</strong> ${reserva.pessoas}</p>
            </div>
        `;
        
        cardsContainer.appendChild(card);
        ajustarEspacoFooter();
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
        
        setTimeout(() => {
            mensagemErro.classList.remove('d-block');
            mensagemErro.classList.add('d-none');
        }, 5000);
    }

    function mostrarReservas() {
        const reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        const cardsContainer = document.getElementById("cards-reservas");
        cardsContainer.innerHTML = "";
        
        if (reservas.length > 0) {
            reservas.forEach(reserva => {
                renderReservaCard(reserva);
            });
        }
    }

    mostrarReservas();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nomeReserva").value.trim();
        const telefone = telefoneInput.value.trim();
        const data = dataInput.value;
        const horarioValor = document.getElementById("horaReserva").value;
        const horario = getHorarioTexto(horarioValor);
        const mesas = document.getElementById("qtdMesas").options[document.getElementById("qtdMesas").selectedIndex].text;
        const pessoas = document.getElementById("qtdPessoas").options[document.getElementById("qtdPessoas").selectedIndex].text;

        // Validação dos campos
        if (!nome || !telefone || !data || !horarioValor || !mesas || !pessoas) {
            mostrarMensagemErro("Por favor, preencha todos os campos do formulário.");
            return;
        }

        // Validação do telefone (mínimo 14 caracteres = (XX) XXXXX-XXXX)
        if (telefone.length < 14) {
            mostrarMensagemErro("Por favor, informe um telefone válido.");
            return;
        }

        const dataSelecionada = new Date(data);
        const hojeObj = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        if (dataSelecionada < hojeObj) {
            mostrarMensagemErro("Não é possível fazer reservas para datas passadas.");
            return;
        }

        if (verificarDisponibilidade(data, horario)) {
            mostrarMensagemErro("Desculpe, este horário já está reservado. Escolha outro horário.");
            return;
        }

        const reserva = { 
            nome, 
            telefone, 
            data, 
            horario, 
            mesas, 
            pessoas 
        };

        let reservas = JSON.parse(localStorage.getItem("reservasCucina") || "[]");
        reservas.push(reserva);
        localStorage.setItem("reservasCucina", JSON.stringify(reservas));

        renderReservaCard(reserva);
        form.reset();
        mensagemErro.classList.add('d-none');
    });

    // Event listeners para ajustes de layout
    window.addEventListener('load', ajustarEspacoFooter);
    window.addEventListener('resize', ajustarEspacoFooter);

    // CORREÇÃO DO MENU SANDUÍCHE (PARTE PRINCIPAL)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarContent');
    
    // 1. Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // 2. Fechar menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const isClickInsideNavbar = navbarCollapse.contains(event.target);
        const isClickOnToggler = navbarToggler.contains(event.target);
        
        // Se o menu está aberto e o clique foi fora do menu e fora do botão toggler
        if (navbarCollapse.classList.contains('show') && 
            !isClickInsideNavbar && 
            !isClickOnToggler) 
        {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});