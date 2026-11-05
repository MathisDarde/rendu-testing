import { describe, expect, it } from "vitest";
import type { Classement } from "../src/classement";
import { Jeu } from "../src/jeu";

// Dummy : le constructeur exige un classement, mais ces tests ne portent que
// sur le score et le classement n'y joue aucun rôle. Un dummy suffit : pas
// besoin d'un stub (rien à renvoyer) ni d'un spy (aucun appel à vérifier).
class ClassementFactice implements Classement {
  enregistrer(): void {}
}

class ClassementEspion implements Classement {
  readonly enregistrements: { vainqueur: string; perdant: string }[] = [];

  enregistrer(vainqueur: string, perdant: string): void {
    this.enregistrements.push({ vainqueur, perdant });
  }
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

describe("Jeu et classement du tournoi", () => {
  // Spy : on veut vérifier, après le match, ce que le jeu a envoyé au
  // classement. enregistrer() ne renvoie rien, donc un stub n'apporterait rien ;
  // le spy note les appels et on fait les assertions à la fin, dans le test.
  it("à la fin du match, le résultat est enregistré avec le vainqueur en premier", () => {
    const classement = new ClassementEspion();
    const jeu = new Jeu("Alice", "Bob", classement);

    marquer(jeu, "Alice", 1);
    marquer(jeu, "Bob", 4);

    expect(classement.enregistrements).toEqual([
      { vainqueur: "Bob", perdant: "Alice" },
    ]);
  });

  // Spy : ici on vérifie une absence d'appel. Le spy garde la trace de tous
  // les appels reçus, ce qui permet de constater qu'il n'y en a eu aucun ;
  // un dummy ne permettrait pas de le vérifier.
  it("le résultat n'est pas enregistré tant que le match n'est pas fini", () => {
    const classement = new ClassementEspion();
    const jeu = new Jeu("Alice", "Bob", classement);

    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);

    expect(classement.enregistrements).toEqual([]);
  });

  // Spy : on compte les appels reçus par le classement pendant tout le match,
  // y compris quand on tente de marquer après la victoire. Seul un double qui
  // enregistre les appels (spy) permet de vérifier qu'il n'y en a qu'un.
  it("le résultat n'est enregistré qu'une seule fois", () => {
    const classement = new ClassementEspion();
    const jeu = new Jeu("Alice", "Bob", classement);
    marquer(jeu, "Alice", 4);

    expect(() => jeu.pointPour("Alice")).toThrow();
    expect(classement.enregistrements).toHaveLength(1);
  });
});
