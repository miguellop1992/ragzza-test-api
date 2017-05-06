import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private title = 'ragzza-api-test';
  private url = "https://ragzza-api-test.herokuapp.com/api/v1/clients";
  private list = [];
  private idDelete: string;
  private obj={};
  private msg=null;

  constructor(private http: Http) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.http.get(this.url)
      .toPromise()
      .then(res => this.list = res.json().content);
  }

  hide(id:string){
    $('#'+id).modal('hide');
  }

  delete() {
    this.http.delete(this.url + "/" + this.idDelete)
      .toPromise().then(res => {
        this.refresh();
        this.hide("delete");
      })
  }

  create(){
    this.http.post(this.url,this.obj)
      .toPromise().then(res => {
        this.refresh();
        this.hide("create");
      }).catch(res=> this.msg=res.json().message)
  }

  clear(){
    this.obj={};
    this.msg=null;
  }
}
