export interface User {
  idUser?: number;
  documentType: string;      // ✅ Nuevo campo
  documentNumber: string;               // ✅ Este campo NO DEBE FALTAR
  name: string;
  surnames: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  adress: string;
  gender: string;
  state: boolean;
  registrationDate?: string;
  profilePhoto?: string;
}
