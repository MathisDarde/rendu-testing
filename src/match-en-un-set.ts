import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4;

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
    if (this.vainqueur()) {
      throw new Error("Le match est terminé");
    }
    this.jeuEnCours.pointPour(joueur);
    const vainqueurDuJeu = this.jeuEnCours.vainqueur();
    if (vainqueurDuJeu === this.joueur1) {
      this.jeuxJoueur1++;
    } else if (vainqueurDuJeu === this.joueur2) {
      this.jeuxJoueur2++;
    }
    const vainqueurDuMatch = this.vainqueur();
    if (vainqueurDuMatch) {
      this.classement.enregistrer(vainqueurDuMatch.nom, vainqueurDuMatch.perdant);
    } else if (vainqueurDuJeu) {
      this.jeuEnCours = this.nouveauJeu();
    }
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      return `Victoire ${vainqueur.nom} ${vainqueur.jeux}-${vainqueur.jeuxAdversaire}`;
    }
    return `${this.jeux()}, ${this.scoreDuJeu()}`;
  }

  scoreDuJeu(): string {
    return this.jeuEnCours.score();
  }

  jeux(): string {
    return `${this.jeuxJoueur1}-${this.jeuxJoueur2}`;
  }

  private vainqueur():
    | { nom: string; perdant: string; jeux: number; jeuxAdversaire: number }
    | undefined {
    if (this.jeuxJoueur1 === JEUX_POUR_GAGNER) {
      return {
        nom: this.joueur1,
        perdant: this.joueur2,
        jeux: this.jeuxJoueur1,
        jeuxAdversaire: this.jeuxJoueur2,
      };
    }
    if (this.jeuxJoueur2 === JEUX_POUR_GAGNER) {
      return {
        nom: this.joueur2,
        perdant: this.joueur1,
        jeux: this.jeuxJoueur2,
        jeuxAdversaire: this.jeuxJoueur1,
      };
    }
    return undefined;
  }

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, new AucunClassement());
  }
}
