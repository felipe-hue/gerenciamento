// Dados iniciais de vendas e unidades
const vendas = [
    { vendedor: 'Artcap', quantidadeVendas: 20, quantidadeUnidades: 200 },
    { vendedor: 'Seubone', quantidadeVendas: 45, quantidadeUnidades: 450 },
    { vendedor: 'Ravi', quantidadeVendas: 50, quantidadeUnidades: 500 },
    { vendedor: 'Leonardo', quantidadeVendas: 40, quantidadeUnidades: 400 },
    { vendedor: 'Shopbonés', quantidadeVendas: 40, quantidadeUnidades: 400 },
    { vendedor: 'Enecaps', quantidadeVendas: 40, quantidadeUnidades: 400 },
];

// Inicializa o gráfico (usando o Chart.js)
let ctx = document.getElementById('graficoVendedores').getContext('2d');
let graficoVendedores = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['Artcap', 'Seuboné', 'Ravi', 'Leonardo', 'Shopbonés', 'Enescaps'],
        datasets: [{
            label: 'Vendas',
            data: vendas.map(venda => venda.quantidadeVendas), // Dados de vendas dos vendedores
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Função para somar as vendas e unidades
function calcularTotalVendas() {
    let totalVendas = 0;
    let totalUnidades = 0;
    vendas.forEach(venda => {
        totalVendas += venda.quantidadeVendas; // Soma a quantidade de vendas
        totalUnidades += venda.quantidadeUnidades; // Soma a quantidade de unidades
    });
    return { totalVendas, totalUnidades };
}

// Função para atualizar o gráfico, total de vendas e unidades
function atualizarGraficoETotalVendas() {
    const { totalVendas, totalUnidades } = calcularTotalVendas();
    
    // Atualiza o total de vendas e unidades
    const totalVendasBox = document.getElementById('totalVendas');
    totalVendasBox.textContent = `${totalVendas} transações`; // Atualiza o texto do total de vendas

    const totalUnidadesBox = document.getElementById('totalUnidades');
    totalUnidadesBox.textContent = `${totalUnidades} unidades`; // Atualiza o texto do total de unidades

    // Atualiza o gráfico com os dados atualizados
    graficoVendedores.data.datasets[0].data = vendas.map(venda => venda.quantidadeVendas); // Atualiza os dados do gráfico
    graficoVendedores.update(); // Atualiza o gráfico
}

// Função para atualizar as vendas e unidades com base na entrada do usuário
function atualizarVendas() {
    vendas[0].quantidadeVendas = parseInt(document.getElementById('vendedorA').value); // Atualiza as vendas do Vendedor A
    vendas[0].quantidadeUnidades = parseInt(document.getElementById('unidadesA').value); // Atualiza as unidades do Vendedor A
    vendas[1].quantidadeVendas = parseInt(document.getElementById('vendedorB').value); // Atualiza as vendas do Vendedor B
    vendas[1].quantidadeUnidades = parseInt(document.getElementById('unidadesB').value); // Atualiza as unidades do Vendedor B
    vendas[2].quantidadeVendas = parseInt(document.getElementById('vendedorC').value); // Atualiza as vendas do Vendedor C
    vendas[2].quantidadeUnidades = parseInt(document.getElementById('unidadesC').value); // Atualiza as unidades do Vendedor C
    vendas[3].quantidadeVendas = parseInt(document.getElementById('vendedorD').value); // Atualiza as vendas do Vendedor D
    vendas[3].quantidadeUnidades = parseInt(document.getElementById('unidadesD').value); // Atualiza as unidades do Vendedor D
    
    // Atualiza o gráfico e o total de vendas
    atualizarGraficoETotalVendas();
}

// Chama a função para atualizar o total de vendas na página e o gráfico
atualizarGraficoETotalVendas();

// Adicionando evento para atualizar as vendas
document.getElementById('atualizarVendas').addEventListener('click', atualizarVendas);

// Função para exibir a aba correta
function mostrarAba(abaId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');

    // Exibe a seção correspondente à aba clicada
    const aba = document.getElementById(abaId);
    if (aba) {
        aba.style.display = 'block';
    }
}

// Adicionando os eventos de clique nas abas
document.getElementById('graficoTab').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarAba('graficoContent');
});

document.getElementById('produtosTab').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarAba('produtosContent');
});

document.getElementById('vendasTab').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarAba('vendasContent');
});

document.getElementById('clientesTab').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarAba('clientesContent');
});
function atualizarTotal() {
    const produtoSelect = document.getElementById('produtoVenda');
    const quantidadeInput = document.getElementById('quantidadeVenda');
    const priceDiv = document.querySelector('.price');

    // Obtém o valor do produto selecionado e a quantidade inserida
    const precoProduto = parseFloat(produtoSelect.value) || 0;
    const quantidade = parseInt(quantidadeInput.value) || 0;

    // Calcula o total
    const total = precoProduto * quantidade;

    // Atualiza o texto da div com o total formatado
    priceDiv.textContent = `Total a pagar: R$ ${total.toFixed(2)}`;
}

function atualizarTotal() {
    const produtoSelect = document.getElementById("produtoVenda");
    const quantidadeInput = document.getElementById("quantidadeVenda");
    const priceDiv = document.querySelector(".price");

    const preco = parseFloat(produtoSelect.value) || 0;
    const quantidade = parseInt(quantidadeInput.value) || 0;

    const total = preco * quantidade;
    priceDiv.textContent = `Total a pagar: R$ ${total.toFixed(2)}`;
}

// Manipulador de envio do formulário
const formVenda = document.getElementById("formVenda");
formVenda.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const vendedor = document.getElementById("vendedor").value;
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produtoVenda");
    const quantidade = document.getElementById("quantidadeVenda").value;
    const formaPagamento = document.getElementById("formaPagamento").value;

    const produtoNome = produto.options[produto.selectedIndex].text;
    const preco = parseFloat(produto.value) || 0;
    const total = preco * (parseInt(quantidade) || 0);

    // Adiciona a nota na lista
    const notesList = document.querySelector(".notes");
    const newNote = document.createElement("li");
    newNote.textContent = `Vendedor: ${vendedor}, Cliente: ${cliente}, Produto: ${produtoNome}, Quantidade: ${quantidade}, Total: R$ ${total.toFixed(2)}, Forma de Pagamento: ${formaPagamento}`;
    notesList.appendChild(newNote);

    // Limpa os campos após a submissão
    formVenda.reset();
    document.querySelector(".price").textContent = "Total a pagar: R$ 0,00";
});
// Referência ao formulário e ao select de produtos na aba de vendas
const formProduto = document.getElementById("formProduto");
const selectProdutoVenda = document.getElementById("produtoVenda");

// Manipulador de submissão do formulário de produtos
formProduto.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os dados do produto
    const nomeProduto = document.getElementById("nomeProduto").value;
    const precoProduto = parseFloat(document.getElementById("precoProduto").value) || 0;
    const quantidadeProduto = parseInt(document.getElementById("quantidadeProduto").value) || 0;
    const descricaoProduto = document.getElementById("descricaoProduto").value;

    // Verifica se os campos estão preenchidos corretamente
    if (!nomeProduto || precoProduto <= 0 || quantidadeProduto <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cria uma nova opção para o select na aba de vendas
    const novaOpcao = document.createElement("option");
    novaOpcao.value = precoProduto; // O valor da opção será o preço do produto
    novaOpcao.setAttribute("data-quantidade", quantidadeProduto); // Define a quantidade como atributo
    novaOpcao.textContent = `${nomeProduto} - R$ ${precoProduto.toFixed(2)} (${quantidadeProduto} disponíveis)`;

    // Adiciona a nova opção ao select
    selectProdutoVenda.appendChild(novaOpcao);

    // Exibe uma mensagem de sucesso
    alert(`Produto "${nomeProduto}" cadastrado com sucesso!`);

    // Limpa os campos do formulário
    formProduto.reset();
});
// Função para exibir o popup
function mostrarPopup(mensagem) {
    const container = document.getElementById("notification-container");

    // Cria a notificação
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerText = mensagem;

    // Adiciona ao container
    container.appendChild(popup);

    // Remove o popup após 3 segundos
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Função para validar e registrar os formulários
function registrarFormulario(formId, mensagemSucesso) {
    const form = document.getElementById(formId);

    if (!form) return; // Verifica se o formulário existe

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio do formulário

        // Validação genérica: todos os campos obrigatórios preenchidos
        const inputs = form.querySelectorAll("input[required], select[required]");
        let preenchido = true;

        // Verifica se todos os campos obrigatórios estão preenchidos
        inputs.forEach(input => {
            if (!input.value.trim()) {
                preenchido = false;
            }
        });

        // Verifica se todos os campos estão preenchidos corretamente
        if (preenchido) {
            // Exibe a mensagem de sucesso se todos os campos estão preenchidos
            
            mostrarPopup(mensagemSucesso);
            // Aqui você pode adicionar a lógica para salvar os dados
            form.reset(); // Reseta os campos do formulário
        } else {
            // Exibe a mensagem de erro se algum campo obrigatório não estiver preenchido
            mostrarPopup(mensagemSucesso);
        }
    });
}

// Registrar todos os formulários com mensagens personalizadas
registrarFormulario("formVenda", "Venda cadastrada com sucesso!");
registrarFormulario("formProduto", "Produto cadastrado com sucesso!");
registrarFormulario("formCliente", "Cliente cadastrado com sucesso!");

