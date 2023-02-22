import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/userService";
import {User} from "../entity/user";
import {Router} from "@angular/router";
import {LoginObject} from "../entity/loginObject";
import {LocalStorageService} from "../service/localStorageService";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAlreadyHaveAccount: boolean = true;
  isForgetPassword: boolean = false;
  loginObject!: LoginObject;
  user!: User;

  formLogin = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isForgetPassword: new FormControl('')
  })

  formRegister = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    middleName: new FormControl(''),
    birthdate: new FormControl(''),
  })

  constructor(private userService: UserService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  public onSignUpClick() {
    this.isAlreadyHaveAccount = false;
  }

  public onSignInClick() {
    this.isAlreadyHaveAccount = true;
  }

  public async onLoginUser() {

    //продумать логику забытого пароля, почта?
    if (this.formLogin.value.isForgetPassword == true) {
      console.log("You forgot password")
    }

    //собираем объект из формы
    this.loginObject = new LoginObject(this.formLogin.value.username, this.formLogin.value.password);
    //put user in storage
    await this.localStorageService.signIn(this.loginObject)
      .then(() => {
        console.log("end sign in and ..." );
        console.log("redirect");
        this.router.navigate(['/products'])
          .then(() => this.appComponent.ngOnInit())
      });
  }

  public onLogoutUser() {
    //надо удалять из localStorage данные
  }

  public onCreate() {

    //скрипт проверки паролей не работает почему то

    //плюс, я создаю юзера даже если одно поле отправлю, настроить валидацию и на бэке и на фронте

    const f = this.formRegister.value;

    this.user = new User(
      f.username, f.password, f.email, f.firstName,
      f.lastName, f.middleName, f.birthdate
    );

    this.createUser();
  }

  private createUser() {
    this.userService.createUser(this.user).subscribe(() => {
      return this.router.navigate(['/users-list']);
    })
  }

  private forgetPassword() {
    if (this.isForgetPassword) {
      console.log("You are noob --> forget password message")
    }
  }

}
