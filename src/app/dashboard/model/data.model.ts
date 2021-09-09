export interface Data {
  id: number;
  opisPsa: string;
  cip: boolean;
  vlasnikCipa: string;
  stanjePsa: string;
  aktivnosti: string;
  brCipa: string;
  ime: string;
  udomljen: boolean;
  datumUdomljenja: string;
  udomitelj: string;
  mjestoUdomljenja: string;
  uginuo: boolean;
  datumUginuca: string;
  lokacija: string;
  kastriran: boolean;
  provjeraUdomljenja: string;
  provjeraNapomena: string;
  datumProvjere: string;
  latitude?: number;
  longitude?: number;
}
