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
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }
}
