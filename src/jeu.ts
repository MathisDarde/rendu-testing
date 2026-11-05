const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];

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
    if (this.pointsJoueur1 === 3 && this.pointsJoueur2 === 3) {
      return "Égalité";
    }
    if (this.pointsJoueur1 > 0 && this.pointsJoueur1 === this.pointsJoueur2) {
      return `${ANNONCES[this.pointsJoueur1]}-A`;
    }
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }
}
