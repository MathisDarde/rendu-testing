import type { Classement } from "./classement";
import { Jeu } from "./jeu";

// Les jeux d'un match ne sont pas envoyés au classement du tournoi :
// seul le résultat du match l'est.
class AucunClassement implements Classement {
  enregistrer(): void {}
}

export class MatchEnUnSet {
  private jeuEnCours: Jeu;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, new AucunClassement());
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  scoreDuJeu(): string {
    return this.jeuEnCours.score();
  }

  jeux(): string {
    return "0-0";
  }
}
