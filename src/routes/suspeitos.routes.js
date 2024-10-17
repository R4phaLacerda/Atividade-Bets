import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: 'João Vitor Porto Sales',
    profissao: 'Estudantes',
    envolvimentoApostas: 'Sim',
    nivelApostas: 'Alto'
  } 
]

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, envolvimentoApostas, nivelApostas } = req.body;

  // Validação dos campos nome e profissao
  if (!nome || !profissao) {
    return res.status(400).send({
      message: 'Nome e profissão são obrigatórios algum deles está faltando.',
    });
  }

  // Validação de nivelAposta
  if (nivelAposta != 'Baixo' || nivelAposta != 'Médio' || nivelAposta != 'Alto') {
    return res.status(400).send({
      message:
        'O nível de suspeita deve ser classificado como baixo, médio ou alto.',
    });
  }

  // Criação de um novo suspeito
  const novosuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    envolvimentoApostas,
    nivelAposta
  };

  // Adiciona o novo suspeito ao array de suspeitos
  suspeitos.push(novosuspeito);

  return res.status(201).json({
    message: "suspeito cadastrado com sucesso!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((acusado) => acusado.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  return res.status(200).json(suspeito);
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, profissao, nivelAposta, segundo, propostas } = req.body;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((acusado) => acusado.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e profissao
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou o profissao não foi preenchido, criança aleatória!",
    });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.nivelAposta = nivelAposta;
  suspeito.segundo = segundo;
  suspeito.propostas = propostas;

  return res.status(200).json({
    message: "suspeito atualizado com sucesso!",
    suspeito,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((acusado) => acusado.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  // Remove o suspeito do array de suspeitos
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "suspeito removido com sucesso!",
    suspeito,
  });
});

export default suspeitosRoutes;