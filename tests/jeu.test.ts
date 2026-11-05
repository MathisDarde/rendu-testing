import { describe, expect, it } from "vitest";
import type { Classement } from "../src/classement";
import { Jeu } from "../src/jeu";

// Dummy : le constructeur exige un classement, mais ces tests ne portent que
// sur le score et le classement n'y joue aucun rôle. Un dummy suffit : pas
// besoin d'un stub (rien à renvoyer) ni d'un spy (aucun appel à vérifier).
class ClassementFactice implements Classement {
  enregistrer(): void {}
}

function marquer(jeu: Jeu, joueur: string, nombreDePoints: number): void {
  for (let i = 0; i < nombreDePoints; i++) {
    jeu.pointPour(joueur);
  }
}

describe("Jeu", () => {
  it("le score initial est Zéro-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("un point pour le joueur 1 donne Quinze-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("les points s'annoncent dans l'ordre joueur 1 puis joueur 2", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    marquer(jeu, "Alice", 2);
    marquer(jeu, "Bob", 1);

    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("trois points s'annoncent Quarante", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 2);

    expect(jeu.score()).toBe("Quarante-Trente");
  });

  it.each([
    ["Quinze-A", 1],
    ["Trente-A", 2],
  ])(
    "à égalité de points, le score s'annonce « X-A » : %s",
    (scoreAttendu, points) => {
      const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

      marquer(jeu, "Alice", points);
      marquer(jeu, "Bob", points);

      expect(jeu.score()).toBe(scoreAttendu);
    },
  );

  it("à Quarante partout, le score est Égalité", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);

    expect(jeu.score()).toBe("Égalité");
  });

  it("le joueur qui marque à Quarante gagne le match", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 1);
    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("à Égalité, le point suivant gagne le match, sans avantage", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");
  });

  it("on ne peut plus marquer de point une fois le match gagné", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());
    marquer(jeu, "Alice", 4);

    expect(() => jeu.pointPour("Bob")).toThrow("Le match est terminé");
  });

  it("marquer un point pour un joueur qui ne joue pas le match est refusé", () => {
    const jeu = new Jeu("Alice", "Bob", new ClassementFactice());

    expect(() => jeu.pointPour("Charlie")).toThrow("Joueur inconnu : Charlie");
  });
});
