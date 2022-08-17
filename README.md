# storeManagerNodeApiExample

API restful básica com CRUD no MySql. Fornece rotas para simular o gerenciamento de produtos, vendas, compras e estoque de uma loja.

## Stacks utilizadas até o momento

- NodeJs
- Express
- Mocha - Chai - Sinon
- Docker
- SQL (MySql)


## Próximos passos

- Adicionar transactions para as rotas que modificam mais de uma tabela no BD
- Criar as validações de dados de entrada do usuário para as rotas: /sales e /purchases
- Criar uma rota para visualizar os produtos em estoque e o faturamento com as vendas
- Desenvolver rotas autenticadas através de JWT
- Testes de integração


## Orientações

  - Clone o repositório e entre na pasta do projeto

  - Crie um container do projeto:
  ```sh
    docker-compose up -d
  ```

  - Entre no bash do container:
  ```sh
    docker exec -it store_manager_ex bash
  ```

  - Instale as dependências, caso existam:
  ```sh
    npm install
  ```
  

 ## Scripts

  - Criar o banco de dados, gerar as tabelas e publicar as stored procedures:
  ```sh
    npm run publish
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run dev
  ```


# Rotas

## Produtos

<details close>
  <summary><strong>[GET] /products</strong></summary>

  - Listar todos os produtos
</details>

<details close>
  <summary><strong>[GET] /products/:id</strong></summary>

  - Listar um produto específico
</details>

<details close>
  <summary><strong>[POST] /products</strong></summary>

  - Criar um produto
    - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "title": "Produto",
        "sale_price": 99.90,
        "active_flag": 1  // [OPCIONAL] Aceita 1 OU 0 como valores; DEFAULT 1
      }
    ```
</details>

<details close>
  <summary><strong>[PUT] /products/:id</strong></summary>

  - Atualizar um produto específico
    - Deve ser enviado ao menos um atributo dentre os disponíveis na rota POST:

    ```json
      {
        "sale_price": 89.90
      }
    ```
</details>

<details close>
  <summary><strong>[DELETE] /products/:id</strong></summary>

  - Deletar um produto específico
</details>


## Vendas

<details close>
  <summary><strong>[GET] /sales</strong></summary>

  - Listar todos as vendas
</details>

<details close>
  <summary><strong>[GET] /sales/:id</strong></summary>

  - Listar uma venda específica
</details>

<details close>
  <summary><strong>[POST] /sales</strong></summary>

  - Criar uma venda
    - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "payment_type": "DINHEIRO",
        "products":	[
          {
            "product_id": 1,
            "quantity": 1
          },
          {
            "product_id": 2,
            "quantity": 2
          }
        ]
      }
    ```
</details>


## Compras (para o estoque)

<details close>
  <summary><strong>[GET] /purchases</strong></summary>

  - Listar todas as compras
</details>

<details close>
  <summary><strong>[GET] /purchases/:id</strong></summary>

  - Listar uma compra específica
</details>

<details close>
  <summary><strong>[POST] /purchases</strong></summary>

  - Criar uma compra
    - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "product_id": 1,
        "quantity": 2,
        "un_cost": 78.50
      }
    ```
</details>

<details close>
  <summary><strong>[PUT] /purchases/:id</strong></summary>

  - Atualizar uma compra específica
    - Deve ser enviado ao menos um atributo dentre os disponíveis na rota POST:

    ```json
      {
        "quantity": 5
      }
    ```
</details>
