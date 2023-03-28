const express = require('express');
const app = express();
const moongose = require('mongoose');
const ClientSchema = require('./models/Client');
const CidadesSchema = require('./models/Cidades');

moongose.connect('mongodb://localhost:27017/cadastroCidadesEClientes', { useNewUrlParser: true, useUnifiedTopology: true });

const Client = new moongose.model('Client', ClientSchema);
const Cidade = new moongose.model('Cidades', CidadesSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cadastrar cidade
app.post('/cidades/',async (req, res) => {
    if (!req.body.cidade || !req.body.estado) {
        res.status(400).send('Cidade ou Estado não informado');
        return;
    }
    if(req.body.cidade.length > 200){
        res.status(400).send('Cidade não pode ser maior que 200 caracteres');
        return;
    }
    if(req.body.estado.length > 2){
        res.status(400).send('Estado não pode ser maior que 2 caracteres');
        return;
    }

    try {
        req.body.estado = req.body.estado.toUpperCase();
    const consultaCidade = await Cidade.findOne({ "name": req.body.cidade, "estado": req.body.estado })
        if(consultaCidade){
       res.status(409).send("Cidade ou Estado ja esta registrada");
        
        return;
    }
    const newCidade = await new Cidade({
        name: req.body.cidade,
        estado: req.body.estado
    });

    await newCidade.save().then(() => {
        res.status(201).send('Cidade cadastrada com sucesso');
    }).catch((err) => {
        res.status(500).send('Erro ao salvar');
    });
    } catch (error) {
        res.status(500).send('Erro ao cadastrar');
    }
    


});

// Cadastrar cliente
app.post('/clients/', async  (req, res) => {
    if (!req.body.name || !req.body.sexo || !req.body.dataNascimento || !req.body.idade || !req.body.cidadeAtual) {
        res.status(400).send('Nome, sexo, dataNascimento, idade ou cidadeAtual não informado');
        return;
    }
    if(req.body.name.length > 200){
        res.status(400).send('Nome não pode ser maior que 200 caracteres');
        return;
    }
    if(req.body.sexo.length > 1){
        res.status(400).send('Sexo não pode ser maior que 1 caracteres');
        return;
    }
    req.body.sexo = req.body.sexo.toUpperCase();
    if(req.body.sexo != 'M' && req.body.sexo != 'F' && req.body.sexo != 'O'){
        res.status(400).send('Sexo deve ser M ou F ou O');
        return;
    }
    const verificaDataNascimento = new Date(req.body.dataNascimento);
    if(verificaDataNascimento instanceof Date && isNaN(verificaDataNascimento)){
        res.status(400).send('Data de nascimento invalidada');
        return;
    }
    if(req.body.idade < 0 || req.body.idade.length > 15){
        res.status(400).send('Idade não pode ser menor que 0, e nao possui mais de 15 caracteres');
        return;
    }
    if(req.body.cidadeAtual.length > 200){
        res.status(400).send('Cidade atual não pode ser maior que 200 caracteres');
        return;
    }
    try {
        const consultaClient = await Client.findOne({ 
            "name": req.body.name,
            "sexo": req.body.sexo,
            "dataNascimento": req.body.dataNascimento,
            "idade": req.body.idade,
            "cidadeAtual": req.body.cidadeAtual
        })
        if(consultaClient){
        res.status(409).send('Cliente ja esta cadastrado');
        return;
    }

        const newCliente = await new Client({
           name: req.body.name,
           sexo: req.body.sexo,
           dataNascimento: req.body.dataNascimento,
           idade: req.body.idade,
           cidadeAtual: req.body.cidadeAtual,
       })
   
       await newCliente.save().then(() => {
           res.status(201).send('Cliente cadastrado com sucesso');
       }).catch((err) => {
           res.status(500).send('Erro ao salvar o cliente');
           console.log(err);
       });
        
    } catch (error) {
        res.status(500).send('Erro ao cadastrar cliente');
        console.log(error);
    }


});

app.get('/cidades/', (req, res) => {
    res.sendStatus(204);
});

// Consultar cidade pelo nome
app.get('/cidades/:cidade',async (req, res) => {
   if (!req.params.cidade || req.params.cidade == '') {
       res.status(400).send('Cidade não informada');
       return;
   }

   try {
       const consultaCidade = await Cidade.findOne({ "name": req.params.cidade })
       if(!consultaCidade){
         res.status(404).send("Cidade não esta registrada ou Não encontrada");
        return;
    }
    res.status(200).send( "Esta cidade registra: " + consultaCidade);

   } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao consultar cidade');
   }  

});

app.get('/uf/', (req, res) => {
    res.sendStatus(204);
});
// Consultar cidade pelo estado
app.get('/uf/:estados',async (req, res) => {
    
    if (!req.params.estados) {
        res.status(400).send('Estado não informada');
        return;
    }
    
    try {
        const consultaCidadesPeloEstado = await Cidade.findOne({ "estado": req.params.estados })
        if(!consultaCidadesPeloEstado){
          res.status(404).send("Pesquisa de Cidades pelo Estado não esta registrada ou Não encontrada");
         return;
     }
     res.status(200).send(consultaCidadesPeloEstado);
 
    } catch (error) {
     console.log(error);
     res.status(500).send('Erro ao consultar estados');
    }  


});

app.get('/clients/', (req, res) => {
    res.sendStatus(204);
});

// Consultar cliente pelo nome
app.get('/clients/:name',async (req, res) => {
    if(!req.params.name){
        res.status(400).send('Nome não informado');
        return;
    }
    try {
        const consultaClientPeloNome = await Client.findOne({ "name": req.params.name})
        if(!consultaClientPeloNome){
            res.status(404).send("Cliente não esta registrado ou Não encontrado");
            return;
        }
        res.status(200).send(consultaClientPeloNome);
    } catch (error) {
        res.status(500).send('Erro ao consultar cliente pelo nome');
        console.log(error);
    }
    

});

app.get('/clients/id/', (req, res) => {
    res.sendStatus(204);
});

// Consultar cliente pelo Id
app.get('/clients/id/:id',async (req, res) => {
    if(!req.params.id){
        res.status(400).send('Id não informado');
        return;
    }
    try {
        if(!moongose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).send('Id informado não é valido');
            return;
        }
        const consultaClientPeloId = await Client.findById({ "_id": req.params.id})
        if(!consultaClientPeloId){
            res.status(404).send("Cliente não esta registrado ou Não encontrado");
            return;
        }
        res.status(200).send(consultaClientPeloId);
        
    } catch (error) {
        res.status(500).send('Erro ao consultar cliente pelo Id');
        console.log(error);
    }

});
// Remover cliente
app.delete('/clients/id/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).send('Id não informado');
        return;
    }
    try {
        if(!moongose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).send('Id informado não é valido');
            return;
        }
        if(!await Client.findById({ _id: req.params.id})){
            res.status(404).send('Cliente não esta registrado ou Não encontrado');
            return;
        }
        await Client.findByIdAndDelete({ _id: req.params.id})
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Erro ao remover cliente');
        console.log(error);
    }
    
    
});
// Alterar o nome do cliente
app.put('/clients/id/:id',async (req, res) => {
    if(!req.params.id){
        res.status(400).send('Id não informado');
        return;
    }

    try {
        if(!moongose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).send('Id informado não é valido');
            return;
        }
        const consultaClient = await Client.findById({ _id: req.params.id})
        if(!consultaClient){
            res.status(404).send('Cliente não esta registrado ou Não encontrado');
            return;
        }
        if(!req.body.name && !req.body.sexo && !req.body.dataNascimento && !req.body.idade && !req.body.cidadeAtual){
            res.status(400).send('Nenhum dado informado para alteração');
            return;
        }

        if(!req.body.name){
           req.body.name = consultaClient.name;
        }
        if(!req.body.sexo){
            req.body.sexo = consultaClient.sexo;
            }
        if(!req.body.dataNascimento){
            req.body.dataNascimento = consultaClient.dataNascimento;
            }
        if(!req.body.idade){
            req.body.idade = consultaClient.idade;
            }
        if(!req.body.cidadeAtual){
            req.body.cidadeAtual = consultaClient.cidadeAtual;
            }


       await Client.findByIdAndUpdate({ _id: req.params.id}, { 
        name: req.body.name,
        sexo: req.body.sexo,
        dataNascimento: req.body.dataNascimento,
        idade: req.body.idade,
        cidadeAtual: req.body.cidadeAtual, 
    })
       res.status(200).send("Dados do cliente alterado com sucesso");
    } catch (error) {
        res.status(500).send('Erro ao alterar dados do cliente');
        console.log(error);
    }


});


app.listen(3000, () => {
    console.log('Rodando na porta 3000');
});
