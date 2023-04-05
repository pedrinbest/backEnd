import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ProdutoService } from '../services/produto.service';
// Pedro Lucas
// Douglas Marinho
@Component({
  selector: 'app-produto-add-edit',
  templateUrl: './produto-add-edit.component.html',
  styleUrls: ['./produto-add-edit.component.scss'],
})
export class ProdutoAddEditComponent implements OnInit {
  produtoForm: FormGroup;

  status: string[] = [
    'Ativo',
    'Inativo',
  ];

  constructor(
    private _fb: FormBuilder,
    private _produtoService: ProdutoService,
    private _dialogRef: MatDialogRef<ProdutoAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.produtoForm = this._fb.group({
      produto: '',
      descricao: '',
      preco: '',
      quantidade: '',
      status: this.status[0],
    });
  }

  ngOnInit(): void {
    this.produtoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.produtoForm.valid) {
      if (this.data) {
        this._produtoService
          .update(this.data.id, this.produtoForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Produto Atualizdo');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._produtoService.add(this.produtoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produto Cadastrado');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
