export class Usuario {
  static fromFirebase({ correo, uid, usuario }) {
    return new Usuario(uid, usuario, correo);
  }

  constructor(
    public uid: string,
    public usuario: string,
    public correo: string
  ) {}
}
