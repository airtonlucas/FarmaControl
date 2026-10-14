const formulario = document.querySelector("form");
const tabelaClientes = document.getElementById("tabelaClientes");
const formCliente = document.getElementById("formCliente");

formCliente.addEventListener("submit", async function(event) {
    event.preventDefault();

    const cliente = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    };

    try{
        const resposta = await fetch(
            "http://localhost:8080/clientes" , {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(cliente)
            });

            if(!resposta.ok) {
                throw new Error("Erro ao cadastrar cliente")
            }

        const clienteCadastrado = await resposta.json();
        console.log("Cliente Cadastrado", clienteCadastrado);

        alert("Cliente Cadastrado no Sistema!");

        formCliente.reset();
        carregarClientes();


            }catch(erro) {
        console.error(erro);
        alert("Erro ao cadastrar cliente");
    }
});

        async function carregarClientes() {
    try{
        const resposta = await fetch(
       "http://localhost:8080/clientes",
        );

        if(!resposta.ok) {
        throw new Error("Erro ao buscar cliente");
        }

        const clientes = await resposta.json();
        console.log("Clientes inseridos!", clientes)

        tabelaClientes.innerHTML = "";

        clientes.forEach(function(cliente){

        const linha = document.createElement("tr");

        linha.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>

        <td>
        <button type="button" onclick="editarCliente(${cliente.id})">
        Editar</button>

        <button type="button" onclick="excluirCliente(${cliente.id})">
        Excluir</button>
        </td>
        `;
        tabelaClientes.appendChild(linha);
        })

    }catch(erro){
        console.error(erro);
        alert("Erro ao carregar Clientes")
    }
}
carregarClientes();

async function buscarClientePorID(id) {
    try{

        const url = `http://localhost:8080/clientes/${id}`

        console.log("ID Recebido", id);
        console.log("URL da Busca", url);

        const resposta = await fetch(url);
        console.log("Status da Resposta:", resposta.status)

        if(!resposta.ok) {
            throw new Error("Cliente não encontrado")
        }

        const cliente = await resposta.json();
        console.log("Cliente não encontrado", cliente)

        return cliente;

        }catch(erro) {
            console.error(erro);
            alert("Erro ao buscar cliente")

            return null;
        }
    }
   
    async function editarCliente(id) {
        console.log("Iniciando edição do cliente", id)

        const cliente = await buscarClientePorID(id);

        if(!cliente) {
            return;
        }
        console.log("Cliente para edição", cliente);

        document.getElementById("idCliente").value = cliente.id;
        document.getElementById("nome").value = cliente.nome;
        document.getElementById("cpf").value = cliente.cpf;
        document.getElementById("telefone").value = cliente.telefone;
        document.getElementById("email").value = cliente.email;

        console.log("Formulário preenchido para edição")
    }

    async function atualizarCliente(id,cliente) {
        try{
            const resposta = await fetch(
                `http://localhost:8080/clientes/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(cliente)
                }
            )

            if(!resposta.ok) {
                throw new Error("Erro ao atualizar cliente")
            }

            const clienteAtualizado = await resposta.json();

            console.log("Cliente atualizado", clienteAtualizado)
            alert("Cliente atualizado com sucesso!")

            carregarClientes();

            return clienteAtualizado;
        }catch(erro){
            console.error(erro);
            alert("Erro ao atualizar cliente");

            return null;
        }
    }
    
    async function atualizarClientePeloFormulario() {
        const id = document.getElementById("idCliente").value;

        if(!id) {
            alert("Selecione um cliente para atualizar.")
            return;
        }

        const cliente = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            telefone: document.getElementById("telefone").value,
            email:document.getElementById("email").value
        };

        await atualizarCliente(id,cliente);
    }

    async function excluirCliente(id) {
        const confirmar = confirm(
            "Tem certeza que deseja excluir esse cliente?"
        );

        if(!confirmar) {
            return;
        }

        try{
            const resposta = await fetch(
                `http://localhost:8080/clientes/${id}`,
                {
                    method: "DELETE",
                }
            );

            if(!resposta.ok) {
                throw new error("Erro ao excluir cliente")
            }
            alert("Cliente excluido com sucesso!")

            carregarClientes();

        }catch(erro){
            console.error(erro);
            alert("Erro ao excluir cliente")
        }
    }