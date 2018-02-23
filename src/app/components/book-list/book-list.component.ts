import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';

import { Book } from '../../models/book';
import { LoginService } from '../../services/login.service';
import { GetBookListService } from '../../services/get-book-list.service';
import { RemoveBookService } from '../../services/remove-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private selectedBook: Book;
  private checked : boolean;
  private bookList : Book[];
  private allChecked :boolean;
  private removeBookList :Book[]= new Array();

  constructor(private router:Router,private getBookListService: GetBookListService,
  public dialog: MatDialog,private removeBookService: RemoveBookService) {
   }
  

  ngOnInit() {
    this.getBookList();
  }

  getBookList(){
    this.getBookListService.getBookList().subscribe(
      res=>{
          console.log(res.json());
          this.bookList=res.json();
      },
      error=>{
          console.log(error);
      }
    );
  }

  onSelect(book:Book){
    this.selectedBook=book;
    this.router.navigate(['/viewBook',this.selectedBook.id]);
  }

  updateRemoveBookList(checked:boolean, book: Book){
    if(checked){
      this.removeBookList.push(book);
    }else{
      this.removeBookList.splice(this.removeBookList.indexOf(book),1);
    }
  }

  updateSelected(checked:boolean){
    if(checked){
      this.allChecked=true;
      this.removeBookList=this.bookList.slice() ;
    }else{
      this.allChecked=false;
      this.removeBookList=[];
    }
  }

  removeSelectedBooks(){
    let dialogRef = this.dialog.open(DialogResultExampleDialog); 
    dialogRef.afterClosed().subscribe(
      result=>{
        console.log(result);
        if(result=="yes"){
          for(let book of this.removeBookList){
            this.removeBookService.sendBook(book.id).subscribe(
            res=>{
                console.log(res);
                this.getBookList();
            },
            error=>{
              console.log(error);
            }
          );
          
        }
            location.reload();
        }
      }
    );
  }

  openDialog(book: Book){
    let dialogRef = this.dialog.open(DialogResultExampleDialog); 
    dialogRef.afterClosed().subscribe(
      result=>{
        console.log(result);
        if(result=="yes"){
            this.removeBookService.sendBook(book.id).subscribe(
              res=>{
                  console.log(res);
                  this.getBookList();
              },
              error=>{
                console.log(error);
              }
            );
      
        }
      }
    );

  }


}

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: 'dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) { }
   // @Inject(MAT_DIALOG_DATA) public data: any

  onNoClick(): void {
    this.dialogRef.close();
  }

}