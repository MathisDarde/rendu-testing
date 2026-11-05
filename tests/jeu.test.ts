import { describe, expect, it } from "vitest";
import { Jeu } from "../src/jeu";

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

    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Trente-Quinze");
  });
});
