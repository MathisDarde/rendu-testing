import { describe, expect, it } from "vitest";
import { Jeu } from "../src/jeu";

function marquer(jeu: Jeu, joueur: string, nombreDePoints: number): void {
  for (let i = 0; i < nombreDePoints; i++) {
    jeu.pointPour(joueur);
  }
}

describe("Jeu", () => {
  it("le score initial est Zéro-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("un point pour le joueur 1 donne Quinze-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("les points s'annoncent dans l'ordre joueur 1 puis joueur 2", () => {
    const jeu = new Jeu("Alice", "Bob");

    marquer(jeu, "Alice", 2);
    marquer(jeu, "Bob", 1);

    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("trois points s'annoncent Quarante", () => {
    const jeu = new Jeu("Alice", "Bob");

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
      const jeu = new Jeu("Alice", "Bob");

      marquer(jeu, "Alice", points);
      marquer(jeu, "Bob", points);

      expect(jeu.score()).toBe(scoreAttendu);
    },
  );

  it("à Quarante partout, le score est Égalité", () => {
    const jeu = new Jeu("Alice", "Bob");

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);

    expect(jeu.score()).toBe("Égalité");
  });
});
