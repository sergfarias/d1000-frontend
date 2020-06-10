import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
  ɵConsole,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { ROUTE_TRANSITION } from "../../../app.animation";
import escape from "lodash-es/escape";
import { ProductSearchComponent } from "../product-search/product-search.component";
import { ProdutosService } from "../../../services/produtos.service";
import { PesquisaProdutoModel } from "../../../models/produtos/PesquisaProdutoModel";
import { ClienteModel } from "app/models/clientes/ClienteModel";
import { ClientesService } from "app/services/clientes.service";
import { Subject, Observable } from "rxjs";
import { OrcamentoModel } from "app/models/orcamento/OrcamentoModel";
import { LocalStorageService } from "angular-2-local-storage";
import { OrcamentoService } from "app/services/orcamento.service";
import { MensagemService } from "app/shared/mensagem/mensagem.service";
import { AuthService } from "app/services/auth.service";
import { map } from "rxjs/operators";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

import { EscolaComponent } from "../escola/escola.component";
import { AlunoComponent } from "../aluno/aluno.component";
import { TurmaComponent } from "../turma/turma.component";

import { EscolaModel } from "../../../models/escolas/EscolaModel";

import { EscolasService } from "../../../services/escolas.service";
import { MatTableDataSource } from "@angular/material/table";
import { TurmaModel } from "app/models/turmas/TurmaModel";

@Component({
  selector: "home",
  templateUrl: "./home.html",
  styleUrls: ["./home.component.scss"],
  animations: [...ROUTE_TRANSITION],
  host: { "[@routeTransition]": "" },
})
export class StoreFrontBudgetComponent implements OnDestroy, OnInit {
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public produtos: ProdutosService,
    public escolas: EscolasService,
    public clientes: ClientesService,
    public msg: MensagemService,
    public orcamento: OrcamentoService,
    public change: ChangeDetectorRef,
    public local: LocalStorageService
  ) {}

  @ViewChild("pesquisa") pesquisaProd: ElementRef;
  displayedColumns = ['ID_TURMA', 'DESCRICAO', 'PERIODO']; //'ID_ESCOLA',
  dataSource = new MatTableDataSource<TurmaModel>([])

  /*  Flag de controle de modal */
  ModalOpen: boolean = false;

  setFocus(element) {
    if (!element || !element.nativeElement) return;
    element.nativeElement.select();
    element.nativeElement.focus();
  }

  /* Flags de controle de atividade */
  IsGravandoOrcamento: boolean = false;
  
 
  /* /////////////////////////////// */

  /**
   * Exibe a tela de pesquisa de produto.
   * @param Termo Nome/Código/EAN do produto a ser pesquisado
   */
  dialogProductSearch(Termo) {
    let config = new MatDialogConfig();

    config.id = "dialog-product-search";
    /* config.width = '820px'; */
    config.maxHeight = "600px";
    config.height = "580px";
    config.data = {
      TermoPesquisa: Termo,
    };
    const dialogRef = this.dialog.open(ProductSearchComponent, config);
    this.ModalOpen = true;
    dialogRef.afterClosed().subscribe((result) => {
      this.ModalOpen = false;

      if (!result || !result?.ID_ESCOLA) return;

      console.log(1);
      this.PesquisarTurma(result.ID_ESCOLA);

      console.log(result);
      this.change.markForCheck();
      this.ExibirProduto(result);
      this.change.markForCheck();
    });
  }

 
  dialogAluno() {
    const dialogRef = this.dialog.open(AlunoComponent, {
      id: "aluno",
    });
    this.ModalOpen = true;
    dialogRef.afterClosed().subscribe((r) => (this.ModalOpen = false));
  }

  dialogEscola() {
    const dialogRef = this.dialog.open(EscolaComponent, {
      id: "escola",
    });
    this.ModalOpen = true;
    dialogRef.afterClosed().subscribe((r) => (this.ModalOpen = false));
  }
 
  dialogTurma() {
    const dialogRef = this.dialog.open(TurmaComponent, {
      id: "turma",
    });
    this.ModalOpen = true;
    dialogRef.afterClosed().subscribe((r) => (this.ModalOpen = false));
  }
  
/**
   * Busca um produto utilizando o termo de pesquisa.
   */
  PesquisarProduto() {
    /*  Verificar se o cliente foi informado */
    if (this.TermoPesquisa.replace(/\s/g, "") === "") return;

    /*  Pesquisar produto */
    if (isNaN(parseInt(this.TermoPesquisa))) {
      /*  Exibir tela de pesquisa de produtos */
      this.dialogProductSearch(this.TermoPesquisa);
    } else {
      /*  Pesquisar produto por EAN/Código Interno */
      this.escolas.PesquisarEscola(this.TermoPesquisa).subscribe(
        (resp) => {
          if (resp.length == 0) {
            /*  Exibir mensagem informando que o produto não foi localizado */
            this.msg.warning("Produto não localizado.");
          } else {
            this.ExibirProduto(resp[0]);
            this.PesquisarTurma(resp[0].ID_ESCOLA);
          }

          this.change.markForCheck();
        },
        (erro) => {
          /* TODO: Tratar erros */
        }
      );
    }
  }


  
  PesquisarTurma(ID_ESCOLA) {
    // Pesquisar produto por EAN/Código Interno ou descrição
    this.escolas.PesquisarTurma(ID_ESCOLA).subscribe(
     resp => {
         //if(resp.length == 0) {
         //   this.mensagem.enviar('Produto não encontrado.', false);
        // }
        // else {
        //  if(resp.length > 1) {
        //     this.dialogProductSearch(this.TermoPesquisa);
        //  }
        //  else{
             this.dataSource = new MatTableDataSource<TurmaModel>(resp);
         // }
      //}
    },
    erro => {
     //TODO: Tratar erros
    }
   )
 }


  /*  Implementações do componente */
  ngOnInit() {
    let orcamento = this.CarregarOrcamento();

    if (!orcamento) {
      this.Orcamento = new OrcamentoModel();
    } else {
      this.Orcamento = orcamento;

      /*  Atualizar dados do cliente */
      if (!ClienteModel.IsEmpty(this.Orcamento.DadosCliente)) {
        this.ExibirCliente(this.Orcamento.DadosCliente);
      }
    }

  }

  /* /////////////////////////////// */

  ngOnDestroy() {
    if (this.Orcamento.Produtos.length > 0) {
      //this.SalvarOrcamento();
    }
  }

  /*  Modelo do Orçamento */
  public Orcamento: OrcamentoModel;
  public TermoPesquisa: string = "";
  public DadosProduto;
  /* Composição de Preço do Produto */
  public PrecoTabela: number;
  public PrecoOferta: number;
  public PercDesconto: number;
  public ValorDesconto: number;
  public Subtotal: number;

  /* Listener global de eventos do teclado */
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (this.ModalOpen) return;

    if (event.ctrlKey && event.which == 13) {
      //this.IncluirProduto();
    } else if (event.key === "F1") {
      //this.dialogIdSeller();
    } else if (event.key === "F6") {
      //this.dialogBudgetSearch();
    }
  }

  /**
   * Limpa os dados do produto atualmente em foco.
   */
  LimparProduto() {
    this.TermoPesquisa = "";
    this.DadosProduto = null;
    this.PrecoTabela = null;
    this.PrecoOferta = null;
    this.PercDesconto = null;
    this.ValorDesconto = null;
    this.Subtotal = null;
    this.change.markForCheck();
  }

  /**
   * Exibe os dados do produto na tela.
   * @param Produto Produto a ser exibido na tela.
   */
  ExibirProduto(Produto: EscolaModel) {
    this.LimparProduto();
    /*  Exibir produto na tela */
    this.DadosProduto = Produto;
    this.TermoPesquisa = Produto.NM_ESCOLA;
  }

  /**
   * Exibe os dados do cliente na tela e o atribui ao orçamento atual.
   * @param Cliente Cliente a ser exibido na tela.
   */
  ExibirCliente(Cliente: ClienteModel) {
    this.Orcamento.DadosCliente = Cliente;
    this.change.markForCheck();
  }

  

  Desc_keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]|,/;
  const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      //if ((event.currentTarget as HTMLElement).id == "vlrDesc")
        //this.ValorDescValidado = false;
    }
  }
  
  /**
   * Inclui um produto específico no grid
   */
  public IncluirProdutoGrid(dadosProduto: PesquisaProdutoModel) {
    let produto: PesquisaProdutoModel = new PesquisaProdutoModel();

    produto = Object.assign(produto, dadosProduto);
    produto.TOT_IT = (produto.VLR_TABELA - produto.VLR_DESC) * produto.QTDE;

    /*  Verificar se o produto já existe na lista */
    let prod = this.Orcamento.Produtos.filter(
      (p) => p.ID_PROD == dadosProduto.ID_PROD
    );

    if (prod.length > 0) {
      let index = this.Orcamento.Produtos.indexOf(prod[0]);
      this.Orcamento.Produtos[index] = produto;
    } else this.Orcamento.Produtos.push(produto);

    //this.TotalizarOrcamento();
    this.LimparProduto();

    this.setFocus(this.pesquisaProd);

    /*  Salvar orçamento */
   // this.SalvarOrcamento();

    this.change.markForCheck();
  }

  /**
   * Remove um produto do carrinho do orçamento.
   * @param Produto Produto a ser removido da lista do orçamento.
   */
  public RemoverProduto(Produto: PesquisaProdutoModel) {
    if (!Produto) return;

    this.msg
      .confirmar(
        `Deseja excluir o produto \"${Produto.DS_PROD}\" da lista?`,
        "Sim",
        "Não"
      )
      .subscribe((resp) => {
        if (!resp) return;

        this.Orcamento.Produtos = this.Orcamento.Produtos.filter(
          (p) => p.ID_PROD != Produto.ID_PROD
        );

      });
  }

  /**
   * Exibe um produto já incluído na lista de volta na tela.
   * @param Produto Produto a ser exibido na tela.
   */
  public CarregarProduto(
    Produto: PesquisaProdutoModel,
    Confirmar: boolean = true
  ) {
    //if (Produto.Pbm) {
    //  this.msg.enviar(
    //    "Este produto possui uma autorização de PBM e não pode ser alterado."
     // );
     // return;
    //}

    /*  Verificar se já há um produto em foco na tela. */
    if (this.DadosProduto && Confirmar) {
      this.msg
        .confirmar("Deseja alterar este produto?", "Sim", "Não")
        .subscribe((resp) => {
          if (!resp) return;

          this.CarregarProduto(Produto, false);
        });

      return;
    }

    this.DadosProduto = Produto;
    this.TermoPesquisa = Produto.DS_PROD;

  }

 
 
  /**
   * Carrega um orçamento armazenado no LocalStorage do navegador.
   * @returns Um objeto do tipo OrcamentoModel ou null caso não haja orçamento armazenado no LocalStorage.
   */
  public CarregarOrcamento(): OrcamentoModel {
    let stored: OrcamentoModel = this.local.get("d1000.Orcamento");
    let orcamento: OrcamentoModel = new OrcamentoModel();

    if (stored) {
      orcamento = Object.assign(orcamento, stored);
    }

    return orcamento;
  }

  
  /**
   * Limpa o estado de armazenamento de orçamento no LocalStorage do navegador.
   */
  public LimparCache() {
    this.local.set("d1000.Orcamento", null);
  }

  /* End Carrinho */
}
