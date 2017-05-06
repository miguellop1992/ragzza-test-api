import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private url = "https://ragzza-api-test.herokuapp.com/api/v1/clients/";
  private obj = {};
  private msg: { code: string; body: string };

  private res = (res) => {
    let json = res.json();
    this.msg = {
      code: json.code,
      body: json.message
    };
  };

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.route.params
      .switchMap((params) => this.http.get(this.url = this.url + params['id']))
      .subscribe(res => this.obj = res.json().content);
  }

  submit() {
    this.http.put(this.url, this.obj)
      .toPromise()
      .then(this.res)
      .catch(this.res);
  }
}
