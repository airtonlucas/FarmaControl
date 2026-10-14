const formulario = document.querySelector("form");
const tabelaVenda = document.getElementById("tabelaVenda");
const formVenda = document.getElementById("formVenda");

async function salvarVenda(venda) {
        
    try {
        const resposta = await fetch(
            "http://localhost:8080/vendas",
            {
                method:"POST",

                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(venda)
            }
        );

        if(!resposta.ok) {
            throw new Error("Erro ao cadastrar venda");
        }

        const vendaSalva = await resposta.json();

        console.log("Venda Cadastrada com sucesso!:", vendaSalva)

        alert("Venda Cadastrada com sucesso!");

        document.getElementById("formVenda").reset();

        carregarVendas();

    } catch(erro) {
        console.error(erro);

        console.log("Erro ao cadastrar Venda")

        return null;
    }
} 

formVenda.addEventListener("submit", async function(event) {
    event.preventDefault();

    const dataInput = document.getElementById("dataVenda").value;

    const [data,hora] = dataInput.split("T");

    const [ano,mes,dia] = data.split("_");

    const dataFormatada = `${dia}-${mes}-${ano} ${hora}:00`;


    const venda = {
        clienteID: Number(
            document.getElementById("clienteID").value 
        ),
        dataVenda: dataFormatada,
        
        valorTotal: Number(
            document.getElementById("valorTotal").value
        )
    };
    console.log("Venda enviada", venda)
    await salvarVenda(venda);

});

async function carregarVendas() {
    try{
        const resposta = await fetch(
            "http://localhost:8080/vendas",
        );
        if(!resposta.ok){
            throw new Error("Erro ao buscar vendas");
        }

        const vendas = await resposta.json();

        console.log("Vendas inseridas", vendas)

        tabelaVenda.innerHTML = "";

        vendas.forEach(function(venda){

            const linha = document.createElement("tr");

            linha.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.clienteID}</td>
            <td>${venda.dataVenda}</td>
            <td>${venda.valorTotal}</td>
            
            <td>
            <button type="button" onclick="editarVenda(${venda.id})">
            Editar</button>
            
            <button type="button" onclick="excluirVenda(${venda.id})">
            Excluir</button>
            `;

            tabelaVenda.appendChild(linha);
        })
    }catch(erro){
        console.error(erro);
        alert("Erro ao carregar Vendas")
    }
}

carregarVendas();

async function buscarVendaPorId(id) {
    try{
        const url = `http://localhost:8080/vendas/${id}´`
        console.log("ID Recebido", id)
        console.log("URL da busca", url)

        const resposta = await fetch(url);
        console.log("Status da Resposta", resposta.status)

        if(!resposta.ok) {
            throw new Error("Venda não encontrada")
        }

        const venda = await resposta.json();
        console.log("Venda não encontrada", venda)

        return venda;

    }catch(erro) {
        alert("Erro ao buscar Venda")

        return null;
    }
}

async function editarVenda(id) {
    console.log("Iniciando edição da Venda", id)

    const venda = await buscarVendaPorId(id);

    if(!venda) {
        return;
    }

    console.log("Venda para edição", venda)

    document.getElementById("id").value = venda.id;
    document.getElementById("clienteID").value = venda.clienteID;
    document.getElementById("dataVenda").value = venda.dataVenda;
    document.getElementById("valorTotal").value = venda.valorTotal;

    console.log("Formulário preenchido para edição")
}

async function atualizarVenda(id,venda) {

    try{
        const resposta = await fetch(
            `http://localhost:8080/vendas/${id}`,
            {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(venda)
            }
        )

        if(!resposta.ok) {
            throw new Error("Erro ao atualizar Venda")
        }

        const vendaAtualizada = await resposta.json();

        console.log("Venda atualizada", vendaAtualizada)
        alert("Venda atualizada com sucesso!")

        carregarVendas();

        return vendaAtualizada;

    }catch(erro) {
        console.error(erro);
        alert("Erro ao atualizar Venda")

        return null;
    }
}

async function atualizarVendaPeloFormulario() {
    const id = document.getElementById("idVenda").value;

    if(id) {
        alert("Selecione uma venda para ser atualizada.")
        return;
    }

    const venda = {
        clienteID: Number(document.getElementById("clienteID").value),

        dataVenda: document.getElementById("dataVenda").value,
        
        valorTotal: Number(document.getElementById("valorTotal").value)
    }

    await atualizarVenda(id, venda);
}

async function excluirVenda(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir essa Venda?"
    );

    if(!confirmar) {
        return;
    }

    try{
        const resposta = await fetch(
            `http://localhost:8080/vendas/${id}`,
            {
                method:"DELETE"
            }
        );

        if(!resposta.ok) {
            throw new Error("Erro ao excluir Venda")
        }

        alert("Venda excluída com sucesso!")

        carregarVendas();

    } catch(erro) {
        console.error(erro);

        alert("Erro ao excluir Venda")
    }
}
carregarVendas();