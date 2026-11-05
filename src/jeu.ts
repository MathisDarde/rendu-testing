const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) {
      this.pointsJoueur1++;
    } else {
      this.pointsJoueur2++;
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

  private vainqueur(): string | undefined {
    if (this.pointsJoueur1 > QUARANTE) {
      return this.joueur1;
    }
    if (this.pointsJoueur2 > QUARANTE) {
      return this.joueur2;
    }
    return undefined;
  }
}
