// DADOS DOS CHEFS COMEÇO
const culinaryDishes = {
    "dishes": [
        {
            "title": "Emmanuel Bassoleil",
            "image": "public/img/chef1.webp",
            "description": "Chef francês radicado no Brasil, conhecido por sua culinária francesa contemporânea com toques brasileiros."
        },
        {
            "title": "Bel Coelho",
            "image": "public/img/chef2.webp",
            "description": "Bel Coelho, sempre teve uma afinidade especial com a cozinha. Chef brasileira que valoriza ingredientes locais e sustentabilidade em seus pratos."
        },
        {
            "title": "Henrique Fogaça",
           "image": "public/img/chef3.jpg",
            "description": "Chef, empresário e jurado do programa MasterChef Brasil.Fogaça tem uma carreira musical como vocalista e compositor da banda de hardcore Oitão."
        },
        {
            "title": "Helena Rizzo",
            "image": "public/img/chef4.webp",
            "description": "Chef e jurada do MasterChef Brasil, conhecida por sua culinária inovadora e autoral.Ela é considerada uma das melhores chefs mulheres do mundo e foi eleita a melhor chef feminina do ano pela Revista Restaurant em 2014."
        }
    ]
};
// DADOS DOS CHEFS FIM

// CARREGAR CARDS DOS CHEFS COMEÇO
function loadCulinaryDishes() {
    const container = document.getElementById('culinary-dishes-container');
    
    if (container) {
        container.innerHTML = '';
        
        culinaryDishes.dishes.forEach((dish, index) => {
            const dishHtml = `
            <div class="col container mt-5">
                <div class="dish-card h-100">
                    <div class="dish-img-container">
                        <img src="${dish.image}" class="card-img-top" alt="${dish.title}">
                    </div>
                    <div class="card-body text-center p-3">
                        <h5 class="card-title mb-2">${dish.title}</h5>
                        <p class="card-text mb-3">${dish.description}</p>
                        <button class="card-btn btn btn-outline-dark w-100">Confira</button>
                    </div>
                </div>
            </div>`;
            
            container.insertAdjacentHTML('beforeend', dishHtml);
        });
    }
}
// CARREGAR CARDS DOS CHEFS FIM

// INICIALIZAÇÃO E EVENTOS COMEÇO
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do vídeo de fundo
    const video = document.getElementById('background-video');
    if(video) {
        video.play().catch(error => {
            console.log("Autoplay bloqueado");
        });
    }

    // Observador para animações de fade-in
    const fadeItems = document.querySelectorAll('.fade-in-item');
    const slideButtons = document.querySelectorAll('.btn-slide-left, .btn-slide-right');
    
    if(fadeItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                    
                    setTimeout(() => {
                        slideButtons.forEach(btn => {
                            btn.style.animationPlayState = 'running';
                        });
                    }, 1500);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeItems.forEach(item => {
            item.style.opacity = '0';
            observer.observe(item);
        });
        
        slideButtons.forEach(btn => {
            btn.style.opacity = '0';
        });
    }

    // Ajuste de altura para dispositivos móveis
    function adjustHomeHeight() {
        const home = document.getElementById('home');
        if(window.innerWidth < 768 && home) {
            home.style.minHeight = window.innerHeight + 'px';
        }
    }
    
    window.addEventListener('resize', adjustHomeHeight);
    adjustHomeHeight();

    // Carrega os cards dos chefs
    loadCulinaryDishes();
    
    // Observador para animações de entrada lateral
    const slideItems = document.querySelectorAll('.slide-in-left, .slide-in-right');
    if(slideItems.length > 0) {
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    slideObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        slideItems.forEach(item => {
            item.style.opacity = '0';
            slideObserver.observe(item);
        });
    }
});
// INICIALIZAÇÃO E EVENTOS FIM