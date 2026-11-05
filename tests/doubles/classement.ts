import type { Classement } from "../../src/classement";

export class ClassementFactice implements Classement {
  enregistrer(): void {}
}

export class ClassementEspion implements Classement {
  readonly enregistrements: { vainqueur: string; perdant: string }[] = [];

  enregistrer(vainqueur: string, perdant: string): void {
    this.enregistrements.push({ vainqueur, perdant });
  }
}
