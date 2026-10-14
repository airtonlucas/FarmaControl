const formulario = document.querySelector("form")
const tabelaItemVenda = document.getElementById("tabelaItemVenda");
const formItemVenda = document.getElementById("formItemVenda");

async function salvarItemVenda(itemVenda) {
    try{
        const resposta = await fetch(
            "http://localhost:8080/item-vendas",
            {
                method: "POST",

                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(itemVenda)
            }
        );

        if(!resposta.ok) {
            throw new Error("Erro ao cadastrar Item de Venda");
        }

        const ItemVendaSalvo = await resposta.json();

        console.log("Item de Venda Cadastrado com sucesso!", ItemVendaSalvo)

        alert("Item de Venda Cadastrado com sucesso!");

        document.getElementById("formItemVenda").reset();
        carregarItensVenda();
        
    }catch(erro) {
        alert("Erro ao Cadastrar Item de Venda")
    }
}

formItemVenda.addEventListener("submit", async function(event){
    event.preventDefault();

    const id = document.getElementById("idItemVenda").value;

    const itemVenda = {
        vendaId: Number(
            document.getElementById("vendaId").value
        ),

        produtoId: Number(
            document.getElementById("produtoId").value
        ),

        quantidade: Number(
            document.getElementById("quantidade").value
        ),
        precoUnitario: Number(
            document.getElementById("precounitario").value
        )
    };

    if(id) {
        await atualizarItemVenda(id,itemVenda)
    }else{
        await salvarItemVenda(itemVenda)
    }
    console.log("Item Enviado", itemVenda)
})

async function carregarItensVenda() {
    try{
        const resposta = await fetch(
            "http://localhost:8080/item-vendas",
        );
        if(!resposta.ok) {
            throw new Error("Erro ao buscar Item de Venda");
        }

        const itemVenda = await resposta.json();

        console.log("Itens Inseridos.", itemVenda)

        tabelaItemVenda.innerHTML = "";
        
        itemVenda.forEach(function(itemVenda) {

            const linha = document.createElement("tr");

            linha.innerHTML = `
            <td>${itemVenda.id}</td>
            <td>${itemVenda.vendaId}</td>
            <td>${itemVenda.produtoId}</td>
            <td>${itemVenda.quantidade}</td>
            <td>${itemVenda.precoUnitario}</td>
            
            <td>
            <button type="button" onclick="editarItemVenda(${itemVenda.id})">
            Editar</button>
            
            <button type="button" onclick="excluirItemVenda(${itemVenda.id})">
            Excluir</button>
            `;
            tabelaItemVenda.appendChild(linha);
        })

    }catch(erro) {
        console.error(erro);
        alert("Erro ao carregar Item de Venda")
    }
}
carregarItensVenda();

async function buscarItemVendaPorID(id) {
    try{
        const url = `http://localhost:8080/item-vendas/${id}`
        console.log("ID recebido", id)
        console.log("URL da Busca", url)

        const resposta = await fetch(url);
        console.log("Status da Resposta", resposta.status)

        if(!resposta.ok) {
            throw new Error("Item de Venda não encontrado.")
        }

        const itemvenda = await resposta.json();
        console.log("Item de Venda encontrado.")

        return itemvenda;
        
    }catch(erro) {
        alert("Erro ao buscar Item de Venda")

        return null;
    }
}

async function editarItemVenda(id) {
    console.log("Iniciando edição do item", id)

    try{
        const resposta = await fetch(
            `http://localhost:8080/item-vendas/${id}`
        );
        if(!resposta.ok) {
            throw new Error("Erro ao buscar Item de Venda")
        }

        const itemVenda = await resposta.json();
        console.log("Item para edição.", itemVenda)

    document.getElementById("vendaId").value = itemVenda.vendaId;
    document.getElementById("produtoId").value = itemVenda.produtoId;
    document.getElementById("quantidade").value = itemVenda.quantidade;
    document.getElementById("precounitario").value = itemVenda.precoUnitario;
    document.getElementById("idItemVenda").value = itemVenda.id;

    console.log("Formulário preenchido para edição.")

    }catch(erro){
    console.error(erro);
    alert("Erro ao carregar Item de Venda")

    }
}

async function atualizarItemVenda(id, itemVenda) {
    try{
        const resposta = await fetch(
            `http://localhost:8080/item-vendas/${id}`,
            {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(itemVenda)
            }
        )

        if(!resposta.ok) {

        const erroServidor = await resposta.text()

        console.error("Erro retornado pelo servidor.", erroServidor);

       throw new Error("Erro ao atualizar Item de Venda");
        }

        const itemVendaAtualizado = await resposta.json();

        console.log("Item atualizado", itemVendaAtualizado);

        alert("Item atualizado com sucesso!")

        carregarItensVenda();

        return itemVendaAtualizado;

    }catch(erro) {
        console.error(erro);
        alert("Erro ao atualizar Item de Venda.")

        return null;
    }
}
 

async function atualizarItemVendaPeloFormulario() {
    const id = document.getElementById("idItemVenda").value;

    if(!id) {
        alert("Selecione um Item para ser atualizado.")
        return;
    }

    const itemvenda = {
    vendaId: Number(document.getElementById("vendaId").value),

     produtoId: document.getElementById("produtoId").value,

    quantidade: Number(document.getElementById("quantidade").value),

    precoUnitario: Number(document.getElementById("precounitario").value)
    };

    console.log("Enviando atualização:",itemvenda)
    console.log("ID do Item.", id)

    await atualizarItemVenda(id,itemvenda);
}

async function excluirItemVenda(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este Item?"
    );

    if(!confirmar) {
        return;
    }

    try{
        const resposta = await fetch(
            `http://localhost:8080/item-vendas/${id}`,
            {
                method: "DELETE"
            }
        );

        if(!resposta.ok) {
         throw new Error("Erro ao excluir Item.")
        }

    }catch(erro) {
    console.error(erro);

    alert("Erro ao excluir Item. ")  
    }
}