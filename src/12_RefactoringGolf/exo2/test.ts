import { Game } from "./kata";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("should not allow player O to play first", () => {
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow player x to play twice in a row", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("X", 1, 0);
    }).toThrow();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    expect(() => {
      game.Play("X", 0, 0);
    }).toThrow();
  });
    it('should declare player X as winner if it plays three in first column', () => {
        game.Play('X', 0, 0); // Ligne 0, Col 0
        game.Play('O', 0, 1); // Ligne 0, Col 1
        game.Play('X', 1, 0); // Ligne 1, Col 0
        game.Play('O', 1, 1); // Ligne 1, Col 1
        game.Play('X', 2, 0); // Ligne 2, Col 0 (Victoire en colonne !)

        const winner = game.Winner();

        // Ce test va échouer car Winner() renverra ' ' au lieu de 'X'
        expect(winner).toBe('X');
    });

  it("should declare player X as winner if it plays three in top row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 0, 1);
    game.Play("O", 1, 1);
    game.Play("X", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in top row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);
    game.Play("O", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in middle row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in middle row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 2, 1);
    game.Play("O", 1, 1);
    game.Play("X", 2, 2);
    game.Play("O", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in bottom row", () => {
    game.Play("X", 2, 0);
    game.Play("O", 0, 0);
    game.Play("X", 2, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in bottom row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 2, 0);
    game.Play("X", 1, 1);
    game.Play("O", 2, 1);
    game.Play("X", 0, 1);
    game.Play("O", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });
});
