import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface User{
  user_name:string,
  user_pwd:string,
  confirmPassword:string,
  name:string,
  remark:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:User={
    user_name:"",
    user_pwd:"",
    confirmPassword:"",
    name:"",
    remark:""
  }
  constructor(private http: HttpClient) { }

  login() {

   this.http.post('/login/login',this.user).subscribe((response:any) => {
    if(response.message=="success"){
      console.log("登录成功");

    }else{
      console.log("登录失败");

    }
  });
  }
  register(){
    if(this.user.confirmPassword==this.user.user_pwd){
    var obj={
      user_name:"",
      user_pwd:"",
      name:"",
      remark:""
    }
    obj.user_name=this.user.user_name
    obj.user_pwd=this.user.user_pwd
    obj.name=this.user.name
    obj.remark=this.user.remark

   this.http.post('/login/register',obj).subscribe((response:any) => {
    if(response.message=="success"){
      console.log("注册成功");

    }else{
      console.log("注册失败");

    }
  });
  return;
}
console.log("确认密码和密码不匹配");

  }
}
