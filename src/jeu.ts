import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (this.vainqueur()) {
      throw new Error("Le match est terminé");
    }
    if (joueur === this.joueur1) {
      this.pointsJoueur1++;
    } else if (joueur === this.joueur2) {
      this.pointsJoueur2++;
    } else {
      throw new Error(`Joueur inconnu : ${joueur}`);
    }

    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = vainqueur === this.joueur1 ? this.joueur2 : this.joueur1;
      this.classement.enregistrer(vainqueur, perdant);
    }
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      return `Victoire ${vainqueur}`;
    }
    if (this.pointsJoueur1 === QUARANTE && this.pointsJoueur2 === QUARANTE) {
      return "Égalité";
    }
    if (this.pointsJoueur1 > 0 && this.pointsJoueur1 === this.pointsJoueur2) {
      return `${ANNONCES[this.pointsJoueur1]}-A`;
    }
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }

  vainqueur(): string | undefined {
    if (this.pointsJoueur1 > QUARANTE) {
      return this.joueur1;
    }
    if (this.pointsJoueur2 > QUARANTE) {
      return this.joueur2;
    }
    return undefined;
  }
}
