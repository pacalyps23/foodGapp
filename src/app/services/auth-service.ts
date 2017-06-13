import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  fname: string;
  lname: string;
  email: string;
  phone: string;

  constructor(fname: string, lname: string, email: string, phone: string) {
    this.fname = fname;
    this.phone = phone;
    this.email = email;
    this.lname = lname;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  data: any;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }


  public login(credentials) {
    if (credentials.email === null || credentials.password === null)
    {
      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {
        this.http.get('../../assets/data/users.json')
        .map((response) => response.json())
        .subscribe((data) => {
            for(let user of data)
            {
              if(credentials.password === user.password && credentials.email === user.email)
              {
                this.currentUser = new User(user.fname, user.lname, user.email, user.phone);
                observer.next(true);
                observer.complete();
              }
            }
            observer.next(false);
            observer.complete();
          });
        });
      }
    }



  public register(credentials)
  {
     if (credentials.email === null || credentials.password === null)
     {
       return Observable.throw("Please insert credentials");
     }
     else if(credentials.password !== credentials.password2)
     {
       return Observable.throw("Password doesn't match");
     }
     else
     {//ready for backend storage
       return Observable.create(observer => {
        observer.next(true);
        observer.complete();
       });
     }
   }

   public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
   return Observable.create(observer => {
     this.currentUser = null;
     observer.next(true);
     observer.complete();
   });
 }

}
