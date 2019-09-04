export class Usuario {

  constructor(
      public nombre: string,
      public email: string,
      public password: string,
      public img?: string,
      public role?: StaticRange,
      public google?: boolean,
      public _id?: string
    ) {
  }
}
