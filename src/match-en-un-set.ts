import type { Classement } from "./classement";
import { Jeu } from "./jeu";

// Les jeux d'un match ne sont pas envoyés au classement du tournoi :
// seul le résultat du match l'est.
class AucunClassement implements Classement {
  enregistrer(): void {}
}

export class MatchEnUnSet {
  private jeuEnCours: Jeu;
  private jeuxJoueur1 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, new AucunClassement());
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
    if (this.jeuEnCours.vainqueur() === this.joueur1) {
      this.jeuxJoueur1++;
      this.jeuEnCours = new Jeu(this.joueur1, this.joueur2, new AucunClassement());
    }
  }

  scoreDuJeu(): string {
    return this.jeuEnCours.score();
  }

  jeux(): string {
    return `${this.jeuxJoueur1}-0`;
  }
}
