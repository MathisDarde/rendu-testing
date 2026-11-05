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
  private jeuxJoueur2 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = this.nouveauJeu();
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
    const vainqueurDuJeu = this.jeuEnCours.vainqueur();
    if (vainqueurDuJeu === this.joueur1) {
      this.jeuxJoueur1++;
    } else if (vainqueurDuJeu === this.joueur2) {
      this.jeuxJoueur2++;
    }
    if (vainqueurDuJeu) {
      this.jeuEnCours = this.nouveauJeu();
    }
  }

  score(): string {
    return `${this.jeux()}, ${this.scoreDuJeu()}`;
  }

  scoreDuJeu(): string {
    return this.jeuEnCours.score();
  }

  jeux(): string {
    return `${this.jeuxJoueur1}-${this.jeuxJoueur2}`;
  }

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, new AucunClassement());
  }
}
