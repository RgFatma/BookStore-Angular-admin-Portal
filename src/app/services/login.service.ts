import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http:Http) { 
		console.log("constructeur nav-bar");
	}
  

  sendCredential(username: String,password: String){
  
    let url = "http://localhost:8181/token";
  	let encodedCredentials = btoa(username+":"+password);
  	let basicHeader = "Basic "+encodedCredentials;
  	let headers = new Headers ({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});
	}
	
	checkSession(){
    let url = "http://localhost:8181/checkSession";
  	let headers = new Headers ({
  		'x-auth-Token' : localStorage.getItem("xAuthToken"),
  	});

  	return this.http.get(url, {headers: headers});
	}

	logout(){
    let url = "http://localhost:8181/user/logout";
  	let headers = new Headers ({
  		'x-auth-Token' : localStorage.getItem("xAuthToken"),
  	});

  	return this.http.post(url,'',{headers: headers});
	}
}
