import { describe, expect, it } from "vitest";
import { MatchEnUnSet } from "../src/match-en-un-set";
import { ClassementFactice } from "./doubles/classement";

function marquer(match: MatchEnUnSet, joueur: string, nombreDePoints: number): void {
  for (let i = 0; i < nombreDePoints; i++) {
    match.pointPour(joueur);
  }
}

function gagnerDesJeux(match: MatchEnUnSet, joueur: string, nombreDeJeux: number): void {
  marquer(match, joueur, 4 * nombreDeJeux);
}

// Dummy : le constructeur exige un classement, mais ces tests ne portent que
// sur le score du match et le classement n'y joue aucun rôle. Un dummy suffit :
// pas de valeur à renvoyer (stub) ni d'appel à vérifier (spy).
describe("Match en un set", () => {
  it("au début du match, aucun joueur n'a de jeu", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    expect(match.jeux()).toBe("0-0");
  });

  it("le score du jeu en cours suit les points marqués", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    match.pointPour("Alice");

    expect(match.scoreDuJeu()).toBe("Quinze-Zéro");
  });

  it("gagner un jeu donne un jeu au vainqueur et en relance un nouveau", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    gagnerDesJeux(match, "Alice", 1);

    expect(match.jeux()).toBe("1-0");
    expect(match.scoreDuJeu()).toBe("Zéro-Zéro");
  });

  it("les jeux s'annoncent dans l'ordre joueur 1 puis joueur 2", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    gagnerDesJeux(match, "Bob", 2);
    gagnerDesJeux(match, "Alice", 1);

    expect(match.jeux()).toBe("1-2");
  });

  it("pendant le match, le score donne les jeux puis le score du jeu en cours", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    gagnerDesJeux(match, "Alice", 2);
    gagnerDesJeux(match, "Bob", 1);
    marquer(match, "Alice", 2);
    marquer(match, "Bob", 1);

    expect(match.score()).toBe("2-1, Trente-Quinze");
  });

  it("le premier joueur à 4 jeux gagne le match, sans 2 jeux d'écart", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    gagnerDesJeux(match, "Alice", 3);
    gagnerDesJeux(match, "Bob", 3);
    gagnerDesJeux(match, "Alice", 1);

    expect(match.score()).toBe("Victoire Alice 4-3");
  });

  it("la victoire annonce d'abord les jeux du vainqueur", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    gagnerDesJeux(match, "Alice", 1);
    gagnerDesJeux(match, "Bob", 4);

    expect(match.score()).toBe("Victoire Bob 4-1");
  });
});
