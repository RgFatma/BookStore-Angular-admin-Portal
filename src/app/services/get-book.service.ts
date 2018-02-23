import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GetBookService {

  constructor(private http:Http) { }

  getBook(id:number){
    let url = "http://localhost:8181/book/"+id;
  	let headers = new Headers ({
      'Content-Type' : 'application/json',
  		'x-auth-Token' : localStorage.getItem("xAuthToken")
  	});

  	return this.http.get(url,{headers: headers});
  }


}
