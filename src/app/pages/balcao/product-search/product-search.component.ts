import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
  HostListener,
  ViewChildren,
  ViewContainerRef,
  ElementRef,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { ProdutosService } from "../../../services/produtos.service";
import { PesquisaProdutoModel } from "../../../models/produtos/PesquisaProdutoModel";
import { ScrollbarService } from "app/core/scrollbar/scrollbar.service";
import { PrecoModel } from "app/models/produtos/PrecoModel";
import { Event } from "@angular/router";

import { EscolasService } from "../../../services/escolas.service";
import { EscolaModel } from "../../../models/escolas/EscolaModel";

@Component({
  selector: "product-result",
  templateUrl: "./product-search.component.html",
  styleUrls: ["./product-search.component.scss"],
})
export class ProductSearchComponent implements OnInit {
  displayedColumns = [
    "ID_ESCOLA",
    "NM_ESCOLA",
   
  ];


  //"NOME_FABRICANTE",
  //"TOT_IT",
  //"QTDE_EST",

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialogRef<ProductSearchComponent>,
    public produtos: ProdutosService,
    public escolas: EscolasService,
    public change: ChangeDetectorRef,
    public scroll: ScrollbarService
  ) {
    if (data.TermoPesquisa) this.TermoPesquisa = data.TermoPesquisa;
  }

  // Listener global de eventos do teclado
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (this.IsLoading) return;

    if (event.key == "ArrowUp" && !this.IsLoading) {
      if (this.selectedRowIndex > 0)
        this.highlight(
          this.dataSource.data[this.selectedRowIndex - 1],
          --this.selectedRowIndex
        );

      event.preventDefault();
      //event.cancelBubble = true;
    } else if (event.key == "ArrowDown" && !this.IsLoading) {
      if (
        (event.srcElement as HTMLElement)?.id == "txtTermo" &&
        this.dataSource.data.length > 0
      ) {
        this.selectedRowIndex = 0;
        this.highlight(this.dataSource.data[0], 0);
        return;
      }

      if (this.selectedRowIndex < this.dataSource.data.length - 1)
        this.highlight(
          this.dataSource.data[this.selectedRowIndex + 1],
          ++this.selectedRowIndex
        );

      event.preventDefault();
      //event.cancelBubble = true;
    } else if (event.key == "Enter" && !this.IsLoading) {
      if ((event.srcElement as HTMLElement)?.id == "txtTermo") {
        this.Pesquisar();
        return;
      }

      this.SelecionarProduto(this.dataSource.data[this.selectedRowIndex]);
      event.cancelBubble = true;
    }
  }

  closeDialog() {
    const dialogRef = this.dialog.close({});
  }

  TipoConsulta: string = "1";

  // Termo a ser pesquisado
  TermoPesquisa: string = "";

  // Índice do item selecionado na lista
  selectedRowIndex: any;

  // Produto em foto
  focusedItem: EscolaModel;

  // Produtos Equivalentes
  //public ProdutosEquivalentes: PesquisaProdutoModel[] = [];
  //public CarregandoEquivalentes: boolean;
  //public CarregandoPrecos: boolean;
  //public CarregandoPrecosPesquisa: boolean;

  // Lista de dados
  dataSource = new MatTableDataSource<EscolaModel>([]);
  @ViewChild("termo") termo: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren("produto", { read: ViewContainerRef }) containers;

  // Controle de carregamento
  IsLoading: boolean = false;

  /* Exibe detalhes do produto - Receita */
  showWindow: boolean;
  showWindowContent: string;
  showWindowOpacity: string;

  showInfo() {
    this.showWindow = !this.showWindow;
    this.showWindowContent = this.showWindow ? "visible" : "hidden";
    this.showWindowOpacity = this.showWindow ? "1" : "0";
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    if (this.TermoPesquisa != "") this.Pesquisar();

    setTimeout(() => this.termo.nativeElement.focus(), 250);
  }

  ngAfterViewInit() {
    let scroller = this.scroll.get("pesquisaProdutoScroller").scrollbar;

    //scroller.options.damping = 0.01;
    scroller.options.thumbMinSize = 1;
    scroller.options.continuousScrolling = false;
  }





  Pesquisar(event = null) {
    this.IsLoading = true;

    //this.ProdutosEquivalentes = [];
    this.dataSource = new MatTableDataSource<EscolaModel>([]);

    this.escolas
      .PesquisarEscola(this.TermoPesquisa)
      .subscribe(
        (resp) => {
          this.IsLoading = false;

          //let produtos = resp
          //  .filter((prod) => prod.ID_STS_PROD != 1)
          //  .sort((a, b) => {
          //    if (a.DS_PROD < b.DS_PROD) return -1;
          //    else if (a.DS_PROD > b.DS_PROD) return 1;
          //    else return 0;
          //  });

          this.dataSource = new MatTableDataSource<EscolaModel>(
            resp
          );

          if (this.dataSource.data.length > 0) {
            this.selectedRowIndex = 0;
            this.focusedItem = this.dataSource.data[this.selectedRowIndex];

            this.highlight(this.focusedItem, this.selectedRowIndex);
          }

          //this.CarregarPrecoPesquisa()

          this.change.markForCheck();
        },
        (erro) => {
          this.IsLoading = false;
          //TODO: Tratar erro
        }
      );
  }

  

  SelecionarProduto(Produto: EscolaModel) {
    this.dialog.close(Produto);
  }

  highlight(row: any, index: number) {
    this.selectedRowIndex = index;
    this.focusedItem = row;

    setTimeout(() => {
      if (this.containers.toArray().length > 0) {
        let rowContainer = this.containers.toArray()[index].element.nativeElement;
        rowContainer.focus();
      }
    }, 150);
  
    this.change.markForCheck();

    /* Garantir que o item selecionado não esteja fora do scroll */
    let item = this.containers.toArray()[index];

    if(item) {
      let scroller = this.scroll.scrollbars["pesquisaProdutoScroller"].scrollbar;
      let elem = item.element.nativeElement;

      if(!scroller.isVisible(elem)) {
        scroller.scrollIntoView(elem);
      }
    }

    console.log(this.scroll.scrollbars);

    //this.CarregarProdutosEquivalentes();
  }

  

}
