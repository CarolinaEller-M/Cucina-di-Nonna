const menus = {
    pratos: [
        { name: "Carpaccio de Filé Mignon com Rúcula", price: "R$ 67,90" },
        { name: "Ravioli de Queijo Brie com Molho Trufado", price: "R$ 74,50" },
        { name: "Camarão ao Alho e Óleo com Farofa de Banana", price: "R$ 89,00" },
        { name: "Pizza da Casa (brotinho)", price: "R$ 25,90" },
        { name: "Bife Ancho com Purê de Mandioquinha", price: "R$ 78,90" },
        { name: "Lasanha de Berinjela com Queijo de Cabra", price: "R$ 63,50" }
    ],
    drinks: [
        { name: "Aperol Spritz", price: "R$ 32,00" },
        { name: "Dry Martini (com azeitonas)", price: "R$ 29,90" },
        { name: "Margarita de Maracujá", price: "R$ 27,50" },
        { name: "Old Fashioned", price: "R$ 34,00" },
        { name: "Chopp Artesanal (700ml)", price: "R$ 15,00" },
        { name: "Bloody Mary", price: "R$ 28,50" }
    ],
    vinhos: [
        { name: "Vinho Tinto Cabernet Sauvignon (Chile)", price: "R$ 145,00" },
        { name: "Vinho Branco Chardonnay (Argentina)", price: "R$ 115,00" },
        { name: "Vinho Rosé Provença (França)", price: "R$ 130,00" },
        { name: "Espumante Moscato (Italia)", price: "R$ 99,00" },
        { name: "Vinho Syrah Orgânico (Vale dos Vinhedos)", price: "R$ 160,00" },
        { name: "Porto Tawny 10 Anos (Portugal)", price: "R$ 180,00" }
    ]
};

function openModal(menuType) {
    const modal = document.getElementById('menuModal');
    const title = document.getElementById('modalTitle');
    const menuList = document.getElementById('menuList');
    
    title.textContent = `Cardápio de ${menuType.charAt(0).toUpperCase() + menuType.slice(1)}`;
    menuList.innerHTML = '';
    
    menus[menuType].forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        `;
        menuList.appendChild(li);
    });
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('menuModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('menuModal');
    if (event.target == modal) {
        closeModal();
    }
}