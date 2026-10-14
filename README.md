FarmaControl — Sistema de Gerenciamento de Farmácia

Sobre o projeto

O FarmaControl é uma aplicação desenvolvida para auxiliar no gerenciamento das operações de uma farmácia. O projeto foi criado com o objetivo de praticar e consolidar conhecimentos em desenvolvimento backend com Java, construção de APIs REST, integração com banco de dados e desenvolvimento de interfaces web.

A aplicação permite gerenciar informações de produtos, clientes, fornecedores, vendas e itens de venda.

Funcionalidades

Cadastro, consulta, atualização e exclusão de produtos.

Gerenciamento de clientes.

Gerenciamento de fornecedores.

Registro e consulta de vendas.

Gerenciamento de itens de venda.

Integração entre a aplicação backend e o banco de dados.

Interface web para interação com as funcionalidades do sistema.

Tecnologias utilizadas

Backend

Java 21

Spring Boot

Spring Data JPA / Hibernate

Maven

Banco de dados

PostgreSQL

Frontend

HTML5

CSS3

JavaScript

Ferramentas

IntelliJ IDEA

Visual Studio Code

Postman

Git e GitHub

Estrutura do projeto

src/ — código-fonte da aplicação Java e componentes do backend.

front-farmacia/ — arquivos da interface web.

pom.xml — configuração de dependências e build do Maven.

Como executar o projeto

Pré-requisitos

Java 21 instalado.

PostgreSQL instalado e em execução.

Maven ou o Maven Wrapper incluído no projeto.

Configuração do banco de dados

Crie um banco de dados PostgreSQL chamado Farmacia.

Configure a variável de ambiente DB_PASSWORD com a senha do usuário do banco.

Confira as configurações de conexão em src/main/resources/application.properties.

A senha do banco deve ser configurada localmente por variável de ambiente e não deve ser incluída no código-fonte ou no GitHub.

Executando a aplicação

Na pasta raiz do projeto, execute:

./mvnw spring-boot:run

No Windows, utilizando o Prompt de Comando:

mvnw.cmd spring-boot:run

Após iniciar o backend, acesse a interface frontend conforme a configuração utilizada no projeto.

Objetivos de aprendizado

Este projeto foi desenvolvido para praticar:

Programação orientada a objetos com Java.

Desenvolvimento de APIs REST com Spring Boot.

Operações CRUD.

Persistência de dados com PostgreSQL e JPA.

Integração entre frontend e backend.

Organização e versionamento de código com Git e GitHub.

Autor Airton Lucas

Airton Lucas

Projeto desenvolvido para fins de aprendizado e portfólio profissional.
