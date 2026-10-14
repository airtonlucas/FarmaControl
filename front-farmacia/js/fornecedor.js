const formulario = document.querySelector("form");
const tabelaFornecedor = document.getElementById("tabelaFornecedor");
const formFornecedor = document.getElementById("formFornecedor");

formFornecedor.addEventListener("submit", async function(event){
    event.preventDefault();

    const fornecedor = {
        nome: document.getElementById("nome").value,
        cnpj: document.getElementById("cnpj").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value 
    };

    try{
        const resposta = await fetch(
            "http://localhost:8080/fornecedores" ,{
                method: "POST" ,
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(fornecedor)
            });

            if(!resposta.ok) {
                throw new Error("Erro ao cadastrar fornecedor")
            }

            const fornecedorCadastrado = await resposta.json();

            console.log("Fornecedor Cadastrado", fornecedorCadastrado)

            alert("Fornecedor Cadastrado no Sistema!")

            formFornecedor.reset();

            carregarFornecedor();

    }catch(erro){
        console.error(erro)
        alert("Erro ao cadastrar fornecedor")
    }
});

async function carregarFornecedor() {
    try{
        const resposta = await fetch(
            "http://localhost:8080/fornecedores"
        );

        if(!resposta.ok) {
            throw new Error("Erro ao buscar fornecedor")
        }

        const fornecedores = await resposta.json();

        console.log("Fornecedores inseridos", fornecedores);

        tabelaFornecedor.innerHTML = "";

        fornecedores.forEach(function(fornecedor){

            const linha = document.createElement("tr");

            linha.innerHTML = `
            <td>${fornecedor.id}</td>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.telefone}</td>
            <td>${fornecedor.email}</td>
            
            <td>
        <button type ="button" onclick="editarFornecedor(${fornecedor.id})">
        Editar</button>
        <button type="button" onclick="excluirFornecedor(${fornecedor.id})">
        Excluir</button>
        </td>
        `;

            tabelaFornecedor.appendChild(linha);   
        })

    }catch(erro){
        console.error(erro);
        alert("Erro ao carregar Fornecedor")
    }
}
carregarFornecedor();

async function buscarFornecedorPorID(id) {
    try{
        const url = `http://localhost:8080/fornecedores/${id}`
        console.log("ID Recebido", id);
        console.log("URL da busca", url);

        const resposta = await fetch(url);
        console.log("Status da resposta", resposta.status)

        if(!resposta.ok) {
            throw new Error("Fornecedor não encontrado")
        }

        const fornecedor = await resposta.json();
        console.log("Fornecedor não encontrado", fornecedor)

        return fornecedor;

    }catch(erro){
        console.error(erro)
        alert("Erro ao buscar fornecedor")

        return null;
    }
}

async function editarFornecedor(id) {
    console.log("Iniciando edição do fornecedor", id)

    const fornecedor = await buscarFornecedorPorID(id);

    if(!fornecedor) {
        return;
    }

    console.log("Fornecedor para edição", fornecedor)

    document.getElementById("id").value = fornecedor.id;
    document.getElementById("nome").value = fornecedor.nome;
    document.getElementById("cnpj").value = fornecedor.cnpj;
    document.getElementById("telefone").value = fornecedor.telefone;
    document.getElementById("email").value = fornecedor.email;

    console.log("Formulário preenchido para edição")
}

async function atualizarFornecedor(id, fornecedor) {
    try{
        const resposta = await fetch(
            `http://localhost:8080/fornecedores/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(fornecedor)
            }
        )

        if(!resposta.ok){
            throw new Error("Erro ao atualizar fornecedor")
        }

        const fornecedorAtualizado = await resposta.json();

        console.log("Fornecedor atualizado", fornecedorAtualizado)
        alert("Fornecedor atualizado com sucesso!")

        carregarFornecedor();

        return fornecedorAtualizado;
        
    }catch(erro){
        console.error(erro);
        alert("Erro ao atualizar fornecedor")

        return null;
    }
}

async function atualizarFornecedorPeloFormulario() {
    const id = document.getElementById("idFornecedor").value;

    if(id) {
        alert("Selecione um fornecedor para atualizar.")
        return;
    }

    const fornecedor = {
        nome: document.getElementById("nome").value,
        cnpj: document.getElementById("cnpj").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    };

    await atualizarFornecedor(id,fornecedor);
}

async function excluirFornecedor(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir esse fornecedor?"  
    );

    if(!confirmar) {
        return;
    }

    try{
        const resposta = await fetch(
            `http://localhost:8080/fornecedores/${id}`, 
            {
                method: "DELETE"
            }    
        );

        if(!resposta.ok) {
            throw new Error("Erro ao excluir fornecedor")
        }
        alert("Fornecedor excluído com sucesso!")

        carregarFornecedor();

    }catch(erro) {
        console.error(erro);

        alert("Erro ao excluir fornecedor")
    }
}
carregarFornecedor();