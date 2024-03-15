export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}
