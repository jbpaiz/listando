import { Produto } from '../model/produto';
import { Constantes } from './constantes';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constantes.PRODUTOS_CADASTRADOS_KEY) != null) {
      return;
    }

    localStorage.setItem(Constantes.PRODUTOS_CADASTRADOS_KEY, JSON.stringify([]));
  }
}
