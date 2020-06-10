export enum TipoPesquisaOrcamento
{
    Cliente,
    Vendedor,
    Orcamento
}

export class PesquisaOrcamentoViewModel {

    public Tipo: string //TipoPesquisaOrcamento

    public Termo: string 

    public Inicio: Date

    public Fim: Date 

}