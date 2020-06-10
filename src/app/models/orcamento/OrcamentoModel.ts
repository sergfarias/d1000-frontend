import { ClienteModel } from "../clientes/ClienteModel";
import { PesquisaProdutoModel } from "../produtos/PesquisaProdutoModel";
import { PrecoModel } from "../produtos/PrecoModel";
import { OrcamentoViewModel } from "./OrcamentoViewModel";
import { OrcamentoItemViewModel } from "./OrcamentoItemViewModel";

export class OrcamentoModel {

  public ID_ORC: number;
  public ID_FILIAL: number;
  public DadosCliente: ClienteModel;
  public Produtos: PesquisaProdutoModel[] = [];
  public ItensCarrinho: number = 0;
  public TotalProdutos: number = 0;
  public TotalDesconto: number = 0;
  public TotalOrcamento: number = 0;

  public Totalizar() {
    this.ItensCarrinho = 0;
    this.TotalProdutos = 0;
    this.TotalDesconto = 0;
    this.TotalOrcamento = 0;

    this.Produtos.forEach((prod) => {
      this.ItensCarrinho += prod.QTDE;
      this.TotalProdutos += prod.VLR_TABELA * prod.QTDE;
      this.TotalDesconto += prod.VLR_DESC * prod.QTDE;
      this.TotalOrcamento += prod.TOT_IT;
    });
  }

  public ToViewModel(): OrcamentoViewModel {
    let model: OrcamentoViewModel = new OrcamentoViewModel();
    this.Produtos.forEach((prod, index) => {
     
    });

    return model;
  }

  public static FromViewModel(view: OrcamentoViewModel): OrcamentoModel {
    let model: OrcamentoModel = new OrcamentoModel();
    view.Itens.forEach((item, index) => {
      let prod = item.Dados;
      let preco = new PrecoModel();
      preco.TP_NIVEL           = 0;
      preco.PRODUTO_CONTROLADO = 0;
      preco.DS_TIPO_RECEITA    = "";
      preco.DS_COR_RECEITA     = "";
      prod.Preco = preco;
      model.Produtos.push(prod);
      model.Totalizar();
    });
    return model;
  }

}
