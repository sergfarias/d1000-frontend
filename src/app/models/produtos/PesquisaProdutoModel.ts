import { PrecoModel } from "./PrecoModel";

export class PesquisaProdutoModel {
    
    public ID_PROD: number;
    public DS_PROD: string;
    public ID_STS_PROD: number;
    public NOME_FABRICANTE: string;
    public DS_LINHA: string;
    public DS_CATEG: string;
    public DS_PRINC_ATIVO: string;
    public QTDE_EST: number;
    public VALOR_TABELA: number;
    public VALOR_OFERTA: number;
    public PROJETOS_PBM                                 : any[];

    // Dados de Preço do Produto
    public Preco: PrecoModel;
    public QTDE: number;
    public VLR_TABELA: number;
    public PERC_DESC: number;
    public VLR_DESC: number;
    public TOT_IT: number;

    // Dados de PBM
    public FLAG_PBM: number;
    public ID_OPERADORA: number;
    public CD_PROJETO: string;
    public DS_PROJETO: string;

 }