export class Jeu {
  private pointsJoueur1 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

  pointPour(joueur: string): void {
    this.pointsJoueur1++;
  }

  score(): string {
    if (this.pointsJoueur1 === 1) {
      return "Quinze-Zéro";
    }
    return "Zéro-Zéro";
  }
}
