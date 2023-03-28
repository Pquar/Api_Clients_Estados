# PROJETO DE API

## COMO RODAR O PROJETO

 Clone este repositório Execute o comando abaixo para instalar as dependências do projeto executando o comando abaixo na raiz do projeto:
```bash
npm install
```

Apos ser concluída a instalação execute o comando abaixo para rodar o projeto:
```bash
node index.js
```
O projeto estará rodando na porta 3000 localmente em (http://localhost:3000/) e o banco de dados na porta 27017 com mongodb(nome do banco: cadastroCidadesEClientes)

## ROTAS DO PROJETO 


### Cadastrar cidade

| Rota | Método | Descrição |
| --- | --- | --- |
| localhost:3000/cidades/ | POST | Cadastra Cidade e Estado. <hr> Obrigatórios: Cidade e estado <hr> As informações devem ser passadas no body da aplicação <hr> A mesma "Cidade e Estado" não podem ser adicionados mais de um vez <hr> O Estado tem que ser passado por sigla com dois dígitos |  

Exemplo de body para cadastro de cidade e estado no formato de json: 
```json
{
    "cidade": "São Paulo",
    "estado": "SP"
}
```
exemplo de resposta: 
```
Cidade cadastrada com sucesso
```
| respostas | Descrição |
| ---  | --- |
| 400 | Cidade ou Estado não informado |
| 400 | Cidade não pode ser maior que 200 caracteres |
| 400 | Estado não pode ser maior que 2 caracteres |
| 409 | Cidade ou Estado ja esta registrada |
| 500 | Erro ao salvar |
| 500 | Erro ao cadastrar |
| 201 | Cidade cadastrada com sucesso |



### Cadastrar cliente
| Rota | Método | Descrição |
| --- | --- | --- |
| localhost:3000/clients/ | POST | Cadastra Clientes. <hr> Obrigatórios: nome, sexo, data Nascimento, idade, cidadeAtual   <hr> As informações devem serem passador no body da aplicação <hr> Os mesmos dados não podem ser adicionados mais de um vez|  

Exemplo de body para cadastro de cidade e estado no formato de json: 
```json
{
    "name": "nome",
    "sexo": "m",
    "dataNascimento": "2024-03-27T15:30:00.000Z",
    "idade": "23",
    "cidadeAtual": "cidadeAtual"
}
```
| respostas | Descrição |
| ---  | --- |
| 400 | Nome, sexo, dataNascimento, idade ou cidadeAtual não informado |
| 400 | Nome não pode ser maior que 200 caracteres |
| 400 | Sexo não pode ser maior que 1 caracteres|
| 400 | Sexo deve ser M ou F ou O |
| 400 | Idade não pode ser menor que 0, e nao possui mais de 15 caracteres |
| 400 | Cidade atual não pode ser maior que 200 caracteres |
| 409 | Cliente ja esta cadastrado |
| 500 | Erro ao cadastrar cliente |
| 500 | Erro ao salvar o cliente |
| 201 | Cliente cadastrado com sucesso |
### Consultar cidade pelo nome
| Rotas | Método | Descrição |
| --- | --- | --- |
| localhost:3000/cidades/:parâmetro | GET | Consulta cidade pelo nome <hr> Obrigatórios: nomeCidade <hr> As informações devem serem passador na url da aplicação |
| localhost:3000/cidades/ | GET | Nome da cidade não informado<br> Resposta: (204) Nome da cidade não informado|

Exemplo de url para consulta de cidade pelo nome: 
```
localhost:3000/cidades/Balneario%20Camboriu
```
resposta se tudo ocorrer bem:
```
Esta cidade registra: {
_id: new ObjectId("6421e73df7dd0c923adca934"),
name: 'Balneario Camboriu',
estado: 'Santa Catarina',
__v: 0
}
```

>Obs: Retorna a primeira cidade encontrada com o nome informado

| respostas | Descrição |
| ---  | --- |
| 400 | Nome da cidade não informado |
| 404 | Cidade não esta registrada ou Não encontrada |
| 200 | Cidade encontrada com sucesso + os dados|
| 500 | Erro ao consultar cidade |

### Consultar cidade pelo estado

| Rotas | Método | Descrição |
| --- | --- | --- |
| localhost:3000/uf/:parâmetro | GET | Consulta cidade pelo estado <hr> Obrigatórios: estado <hr> As informações devem serem passador na url da aplicação |
| localhost:3000/uf/ | GET | Resposta: (204) Estado não informado |

Exemplo de url para consulta de cidade pelo estado: 
```
localhost:3000/uf/SC
```

resposta se tudo ocorrer bem:
```json
{
    "_id": "6422e20d1e80a1e7674d6961",
    "name": "Balneario Camboriiu",
    "estado": "SC",
    "__v": 0
}
```
>Obs: Retorna a primeira cidade encontrada com o estado informado

| respostas | Descrição |
| ---  | --- |
| 400 | Estado não informado |
| 404 | Pesquisa de Cidades pelo Estado não esta registrada ou Não encontrada |
| 200 | Cidade encontrada com sucesso: + consulta Cidades Pelo Estado|
| 500 | Erro ao consultar estados |
### Consultar cliente pelo nome

| Rotas | Método | Descrição |
| --- | --- | --- |
| localhost:3000/clients/:parâmetro | GET | Consulta cliente pelo nome <hr> Obrigatórios: nome <hr> As informações devem serem passadas na url da aplicação |
| localhost:3000/clients/ | GET | Resposta: (204) Informe o nome do cliente |

Exemplo de url para consulta de cliente pelo nome: 
```
localhost:3000/clients/Ang
```

resposta se tudo ocorrer bem:
```
    {
    "_id": "6421f253d6f81d35296dded5",
    "name": "Ang",
    "sexo": "M",
    "dataNascimento": "2023-03-27T15:30:00.000Z",
    "idade": 22,
    "cidadeAtual": "cidadeAtual",
    "__v": 0
}
```
>Obs: Retorna o primeiro cliente encontrado com o nome informado

| respostas | Descrição |
| ---  | --- |
| 400 | Nome do cliente não informado |
| 404 | Cliente não esta registrado ou Não encontrado |
| 200 | Dados do Cliente pela Consulta do nome|
| 500 | Erro ao consultar cliente pelo nome |

### Consultar cliente pelo Id

| Rota | Método | Descrição |
| --- | --- | --- |
| localhost:3000/clients/id/:parâmetro | GET | Consulta cliente pelo Id <hr> Obrigatórios: Id <hr> As informações devem serem passadas na url da aplicação |
| localhost:3000/clients/id/ | GET | Resposta: (204) Informe o Id do cliente |

Exemplo de url para consulta de cliente pelo Id: 
```
localhost:3000/clients/id/6421f253d6f81d35296dded5
```

resposta se tudo ocorrer bem:
```
    {
    "_id": "6421f253d6f81d35296dded5",
    "name": "Ang",
    "sexo": "M",
    "dataNascimento": "2023-03-27T15:30:00.000Z",
    "idade": 22,
    "cidadeAtual": "cidadeAtual",
    "__v": 0
}
```
>Obs: Retorna o primeiro cliente encontrado com o Id informado 
| respostas | Descrição |
| ---  | --- |
| 400 | Id não informado |
| 400 | Id informado não é valido |
| 404 | Cliente não esta registrado ou Não encontrado |
| 200 | Dados do Cliente pela Consulta do Id|
| 500 | Erro ao consultar cliente pelo Id |

### Remover cliente

| Rota | Método | Descrição |
| --- | --- | --- |
| localhost:3000/clients/:parâmetro | DELETE | Remove cliente pelo Id <hr> Obrigatórios: Id <hr> As informações devem serem passadas na url da aplicação |

Exemplo de url para remoção de cliente pelo Id: 
```
localhost:3000/clients/6421f253d6f81d35296dded5
```

resposta se tudo ocorrer bem:
```
    Cliente removido com sucesso
```

| respostas | Descrição |
| ---  | --- |
| 400 | Id não informado |
| 400 | Id informado não é valido |
| 404 | Cliente não esta registrado ou Não encontrado |
| 204 | Cliente removido com sucesso |
| 500 | Erro ao remover cliente |

### Alterar o nome do cliente

| Rota | Método | Descrição |
| --- | --- | --- |
| localhost:3000/clients/:parâmetro | PUT | Altera o nome do cliente pelo Id <hr> Obrigatórios: Id <hr> Deve ser passado na url da aplicação o id para encontrar o cliente e as alterações deve ser passadas no body da aplicação <br> 1 ou mais campos podem ser alterados (name, sexo, dataNascimento, idade, cidadeAtual) se não for passado nenhum campo e retorna um Bad Request |

Exemplo de url para alteração de nome do cliente pelo Id: 
```
localhost:3000/clients/6421f253d6f81d35296dded5
```
body da requisição:
>obs: pode ser passado um ou mais campos para alteração
```json
{
    "name": "Ang"
}
```
ou
```json
{
    "name": "Ang",
    "sexo": "M",
    "dataNascimento": "2023-03-27T15:30:00.000Z",
    "idade": 22,
    "cidadeAtual": "cidadeAtual"
}
```


resposta se tudo ocorrer bem:
```
   Dados do cliente alterado com sucesso
```

| respostas | Descrição |
| ---  | --- |
| 400 | Id não informado |
| 400 | Id informado não é valido |
| 404 | Cliente não esta registrado ou Não encontrado |
| 400 | Nenhum dado informado para alteração |
| 200 | Dados do cliente alterado com sucesso |
| 500 | Erro ao alterar dados do cliente |
