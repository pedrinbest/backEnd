import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoAddEditComponent } from './produto-add-edit/produto-add-edit.component';
import { ProdutoService } from './services/produto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
// Pedro Lucas
// Douglas Marinho
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  view = false
  displayedColumns: string[] = [
    'id',
    'produto',
    'descricao',
    'preco',
    'quantidade',
    'status',
    'acoes'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _produtoService: ProdutoService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(ProdutoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }

  getList() {
    this._produtoService.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    this._produtoService.delete(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Produto Deletado!', 'done');
        this.getList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ProdutoAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }
  openEditFormView(data: any) {
    this.view = true
    const dialogRef = this._dialog.open(ProdutoAddEditComponent, {
      data,
    });
    dialogRef.componentInstance.produtoForm.disable();
    
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
          
        }
      },
    });
  }
}
