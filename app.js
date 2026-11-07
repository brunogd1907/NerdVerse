// Substitua pelas credenciais do seu projeto Supabase
const SUPABASE_URL = "https://bujnpvtipquimwhtokwj.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1am5wdnRpcHF1aW13aHRva3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5OTc1MjEsImV4cCI6MjEwOTU3MzUyMX0.JbVn3fbv1_WQLjzgP9pWt5Vg9s7JrKC0u9GAigrMOOE';

// Inicializar cliente Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let cart = [];

// Função para buscar produtos do Supabase
async function fetchProducts() {
    const grid = document.getElementById('product-grid');
    
    try {
        const { data: products, error } = await _supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        if (!products || products.length === 0) {
            grid.innerHTML = '<p class="loading">Nenhum produto encontrado no banco de dados.</p>';
            return;
        }

        // Renderizar produtos na tela
        grid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-desc">${product.description || ''}</p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${Number(product.price).toFixed(2)}</span>
                        <button class="btn-buy" onclick="addToCart('${product.name}', ${product.price})">Comprar</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        grid.innerHTML = `<p class="loading" style="color: #ff5555;">Erro ao carregar produtos. Verifique suas chaves do Supabase.</p>`;
    }
}

// Simulação simples de carrinho de compras
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    document.getElementById('cart-count').innerText = cart.length;
    alert(`"${productName}" foi adicionado ao carrinho!`);
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', fetchProducts);