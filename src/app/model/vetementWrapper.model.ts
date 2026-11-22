import { Vetement } from './vetement.model';

export class VetementWrapper {
  _embedded!: { vetements: Vetement[] };
}