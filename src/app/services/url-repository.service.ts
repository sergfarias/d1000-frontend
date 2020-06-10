import { Injectable } from '@angular/core';


//const API_URL = environment.apiUrl;
//const API_URL = "http://172.16.100.170";
const API_URL = "https://localhost:44355"; // escola
const API_URL2 = "https://localhost:44356"; // aluno
const API_URL3 = "https://localhost:44395"; // base

@Injectable({
  providedIn: 'root'
})

export class UrlRepositoryService {
  constructor() {}

  public Url = {
    apiUrl: API_URL
  };

  //public Authentication = {
  //  Login: API_URL + '/ws/users/authenticate'
  //};

  public Produtos = {
    Detalhes: API_URL + '/produtos',
    PesquisaTermo: API_URL + '/prod/produtos/pesquisa',
    PesquisaCodigo: API_URL + '/prod/produtos/pesquisa/codigo',
    Preco: API_URL + '/preco/codigo',
    Equivalentes: API_URL + '/prod/produtos/equivalentes',
    Descontos: API_URL + '/preco/api/descontos/possiveis',
    Estoque: API_URL + '/prod/produtos/estoque',
    DescontoCargo: API_URL + '/preco/api/descontos/cargo'
  };

  public Clientes = {
    Detalhes: API_URL2 + "/cli/clientes",
    PesquisaTermo: API_URL2 + "/alunos/pesquisa/termo", ///cli
    PesquisaCodigo: API_URL2 + "/alunos/pesquisa/codigo",
    CadastroCliente: API_URL2 + "/alunos/cadastro/cliente",
    AtualizaCliente: API_URL2 + "/alunos/atualiza/cliente",
    Pesquisa: API_URL2 + "/alunos/pesquisa/cliente",
    PesquisaClienteFidelidade: API_URL2 + '/alunos/pesquisa/clientefidelidade',
    PesquisaClienteContato: API_URL2 + '/alunos/pesquisa/clientecontato',
    UltimasCompras: API_URL2 + '/preco/api/cliente/ultimascompras',
    Estatistica: API_URL2 + '/preco/api/cliente/estatistica',
  };


  public Alunos = {
    //Detalhes: API_URL2 + "/cli/clientes",
    PesquisaTermo: API_URL2 + "/alunos/pesquisa/termo", ///cli
    PesquisaCodigo: API_URL2 + "/alunos/pesquisa/codigo",
    CadastroAluno: API_URL2 + "/alunos/cadastro/aluno",
    AtualizaAluno: API_URL2 + "/alunos/atualiza/aluno",
    Pesquisa: API_URL2 + "/alunos/pesquisa/aluno",
    PesquisaClienteFidelidade: API_URL2 + '/alunos/pesquisa/clientefidelidade',
    PesquisaClienteContato: API_URL2 + '/alunos/pesquisa/clientecontato',
  };

  public Escolas = {
    Detalhes: API_URL + "/cli/clientes",
    PesquisaTermo: API_URL + "/escolas/pesquisa/termo", ///cli
    PesquisaCodigo: API_URL + "/escolas/pesquisa/codigo",
    CadastroEscola: API_URL + "/escolas/cadastro/escola",
    AtualizaEscola: API_URL + "/escolas/atualiza/escola",
    Pesquisa: API_URL + "/escolas/pesquisa/cliente",
    PesquisaTurma: API_URL + "/escolas/pesquisa/turma",
    PesquisaClienteFidelidade: API_URL + '/escolas/pesquisa/clientefidelidade',
    PesquisaClienteContato: API_URL + '/escolas/pesquisa/clientecontato',
  };

  public Base = {
    UFLogradouro: API_URL3 + '/base/dropdown/uflogradouro', ///base
    OrgaoExpedidor: API_URL3 + '/base/dropdown/orgaoexpedidor',
    TipoSexo: API_URL3 + '/base/dropdown/tiposexo',
    PesquisaLogradouro: API_URL3 + '/base/pesquisa/logradouro',
    TipoContato: API_URL3 + '/base/dropdown/tipocontato',
    PesquisaEscolaLogradouroGrid: API_URL3 + '/base/pesquisa/escolalogradourogrid',
    PesquisaAlunoLogradouroGrid: API_URL3 + '/base/pesquisa/alunologradourogrid',
    PesquisaLograClienteGrid: API_URL3 + '/base/pesquisa/logradouroclientegrid'
  };


}
