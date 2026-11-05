import type { Classement } from "./classement";

export class MatchEnUnSet {
  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {}

  jeux(): string {
    return "0-0";
  }
}
