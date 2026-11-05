import { describe, expect, it } from "vitest";
import { MatchEnUnSet } from "../src/match-en-un-set";
import { ClassementFactice } from "./doubles/classement";

// Dummy : le constructeur exige un classement, mais ces tests ne portent que
// sur le score du match et le classement n'y joue aucun rôle. Un dummy suffit :
// pas de valeur à renvoyer (stub) ni d'appel à vérifier (spy).
describe("Match en un set", () => {
  it("au début du match, aucun joueur n'a de jeu", () => {
    const match = new MatchEnUnSet("Alice", "Bob", new ClassementFactice());

    expect(match.jeux()).toBe("0-0");
  });
});
