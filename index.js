const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const lista = ['Java', 'Kotlin', 'Android']

// Endpoint Read All [GET] /personagem
app.get ('/personagem', function (req, res) {
  res.send(lista.filter(Boolean))
})

// Endpoint Read By ID [GET] /personagem/:id

app.get('/personagem/:id', function (req, res) {
  // Acessamos o parâmetro de rota ID
  const id = req.params.id

  // Acessa o item na lista usando o ID - 1
  const item  = lista[id - 1]

  // Se o usuario buscar um id invalido, retorna o erro 404
  if (!item) {
    return res.status(404).send('Item não encontrado')
  }

  //Enviamos o item como resposta
  res.send(item)
})


// Sinaliza para o Express que estamos usando JSON no body
app.use(express.json())

// Endpoint Create [POST] /personagem
app.post ('/personagem', function(req, res) {
  // Acessamos o body da requisição
  const body = req.body

  // Acessamos a propriedade 'nome' do body
  const novoItem = body.nome

  // Checar s eo nome está presente no body
  if (!novoItem) {
    res.status(400).send('Corpo da requisição deve contar a propriedade `nome`.')
  }

  // Checa se o novoItem está na lista ou não
  if (lista.includes(novoItem)){
    return res.status(409).send('O Item já existe na lista')
  }

  // Adicionamos na lista
  lista.push(novoItem)

  // Exibimos uma mensagem de sucesso
  res.status(201).send("Item adicionado com sucesso: " + novoItem)
})

// Endpoint Updade [PUT] /personagem/:id

app.put('/personagem/:id', function (req, res) {
  //Acessamos o ID dos parametros de rota
  const id = req.params.id

  // Se o usuario buscar um id invalido, retorna o erro 404
  if (!lista[id]) {
    return res.status(404).send('Item não encontrado')
  }

  // Acessamos o Body da requisição
  const body = req.body

  // Acessamos a propriedade 'nome do body
  const novoItem = body.nome

  // Checar s eo nome está presente no body
  if (!novoItem) {
    res.status(400).send('Corpo da requisição deve contar a propriedade `nome`.')
  }

  // Checa se o novoItem está na lista ou não
  if (lista.includes(novoItem)){
    return res.status(409).send('O Item já existe na lista')
  }

  // Atualizamos na lista o novoItem pelo ID - 1
  lista[id - 1] = novoItem

  // Enviamos uma mensagem de sucesso
  res.send('Item atualizado com sucesso: '+ id + ' - ' + novoItem)
})

// Endpoint Delete [DELETE] /personagem/:id
app.delete('/personagem/:id', function (req, res) {
 // Acessamos o parâmetro de rota
 const id = req.params.id

 // Se o usuario buscar um id invalido, retorna o erro 404
 if (!lista[id]) {
  return res.status(404).send('Item não encontrado')
}

 // Remover o item da lista usando o ID - 1
 delete lista[id - 1]

 // Enviamos uma mensagem de sucesso
 res.send('Item removido com sucesso ' + id)


  res.send('Delete')
})

app.listen(3000)