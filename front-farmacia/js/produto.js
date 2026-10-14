const formulario = document.querySelector("form");
const tabelaProdutos = document.getElementById("tabelaProdutos");
const formProduto = document.getElementById("formProduto");

formProduto.addEventListener("submit", async function(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        preco:parseFloat(document.getElementById("preco").value),
        quantidadeEstoque:parseInt (
            document.getElementById("quantidadeEstoque").value),
        dataValidade: document.getElementById("dataValidade").value,
        codigoBarras: document.getElementById("codigoBarras").value
    };

    try {
        const resposta = await fetch(
            "http://localhost:8080/produtos", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(produto)
    });

    if(!resposta.ok){
        throw new Error("Erro ao cadastrar produto");
    }

    const produtoCadastrado = await resposta.json();

    console.log("Produto cadastrado:", produtoCadastrado);

    alert("Produto cadastrado com sucesso!");

    formProduto.reset();

    carregarProdutos();

    } catch(erro){
        console.error(erro);
        alert("Erro ao cadastrar produto");
    }
});

async function carregarProdutos() {
    try{
        const resposta = await fetch(
            "http://localhost:8080/produtos"
        );

        if(!resposta.ok){
            throw new Error("Erro ao buscar produtos")
        }

        const produtos = await resposta.json();

        console.log("Produtos recebidos:", produtos);

        tabelaProdutos.innerHTML = "";

        produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td> 
        <td>${produto.preco}</td> 
        <td>${produto.quantidadeEstoque}</td> 
        <td>${produto.dataValidade}</td> 
        <td>${produto.codigoBarras}</td>  

        <td>
            <button type="button" onclick="editarProduto(${produto.id})">
            Editar</button>
            <button type="button" onclick="excluirProduto(${produto.id})">
            Excluir</button>
        </td>
        `; 
        tabelaProdutos.appendChild(linha);
    });

    } catch(erro){
        console.error(erro);
        alert("Erro ao carregar produtos");
    }
}
carregarProdutos();

async function buscarProdutoporID(id){
    try{
        const url = `http://localhost:8080/produtos/${id}`;
        console.log("ID recebido", id)
        console.log("URL da busca:", url);

        const resposta = await fetch(url);
        console.log("Status da resposta:", resposta.status)
             
        if(!resposta.ok) {
            throw new Error("Produto não encontrado")
        }

        const produto = await resposta.json();
        console.log("Produto encontrado", produto)

        return produto;

    }catch(erro) {
        console.error(erro);
        alert("Erro ao buscar produto")

        return null;
    } 
}
buscarProdutoporID(4);

async function editarProduto(id) {
    console.log("Iniciando edição do produto:", id)

    const produto = await buscarProdutoporID(id);

    if(!produto) {
        return;
    }
    console.log("Produto para edição", produto);

    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidadeEstoque").value = produto.quantidadeEstoque;
    document.getElementById("dataValidade").value = produto.dataValidade;
    document.getElementById("codigoBarras").value= produto.codigoBarras;

    console.log("Formulário preenchido para edição")
}

async function atualizarProduto(id, produto) {
    try{
        const resposta = await fetch(
         `http://localhost:8080/produtos/${id}`,
            {
                 method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(produto)
            }
        )
        
        if(!resposta.ok) {
            throw new Error("Erro ao atualizar produto");
        }

        const produtoAtualizado = await resposta.json();

        console.log("Produto atualizado", produtoAtualizado);
        alert("Produto atualizado com sucesso!")

        carregarProdutos();

        return produtoAtualizado;

    }catch(erro){
        console.error(erro);
        alert("Erro ao atualizar produto");

        return null;
    }
}

async function excluirProduto(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );

    if(!confirmar) {
        return;
    }

    try{

    const resposta = await fetch(
        `http://localhost:8080/produtos/${id}`,
        {
            method: "DELETE",
        }
    );

    if(!resposta.ok) {
        throw new Error("Erro ao excluir produto")
    }
    alert("Produto excluído com sucesso!");

    carregarProdutos();

    }catch(erro){
        console.error(erro);

        alert("Erro ao excluir produto");
    }
}
carregarProdutos();