import { Game, Tile } from "./kata";

describe("TicTacToe game", () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    // 1. Règle du premier joueur
    test("should not allow player O to play first", () => {
        expect(() => {
            game.Play(new Tile(0, 0, "O"));
        }).toThrow("Invalid first player");
    });

    // 2. Règle de l'alternance des joueurs
    it("should not allow player X to play twice in a row", () => {
        game.Play(new Tile(0, 0, "X"));
        expect(() => {
            game.Play(new Tile(1, 0, "X"));
        }).toThrow("Invalid next player");
    });

    // 3. Règle de la position (dernière jouée)
    it("should not allow a player to play in last played position", () => {
        game.Play(new Tile(0, 0, "X"));
        expect(() => {
            game.Play(new Tile(0, 0, "O"));
        }).toThrow("Invalid position");
    });

    // 4. Règle de la position (n'importe quelle case déjà prise)
    it("should not allow a player to play in any played position", () => {
        game.Play(new Tile(0, 0, "X"));
        game.Play(new Tile(1, 0, "O"));
        expect(() => {
            game.Play(new Tile(0, 0, "X"));
        }).toThrow("Invalid position");
    });

    // 5. Victoire X - Ligne du haut (Top Row)
    it("should declare player X as winner if it plays three in top row", () => {
        game.Play(new Tile(0, 0, "X"));
        game.Play(new Tile(1, 0, "O"));
        game.Play(new Tile(0, 1, "X"));
        game.Play(new Tile(1, 1, "O"));
        game.Play(new Tile(0, 2, "X"));

        expect(game.Winner()).toBe("X");
    });

    // 6. Victoire O - Ligne du haut (Top Row)
    it("should declare player O as winner if it plays three in top row", () => {
        game.Play(new Tile(1, 0, "X"));
        game.Play(new Tile(0, 0, "O"));
        game.Play(new Tile(1, 1, "X"));
        game.Play(new Tile(0, 1, "O"));
        game.Play(new Tile(2, 2, "X"));
        game.Play(new Tile(0, 2, "O"));

        expect(game.Winner()).toBe("O");
    });

    // 7. Victoire X - Ligne du milieu (Middle Row)
    it("should declare player X as winner if it plays three in middle row", () => {
        game.Play(new Tile(1, 0, "X"));
        game.Play(new Tile(0, 0, "O"));
        game.Play(new Tile(1, 1, "X"));
        game.Play(new Tile(0, 1, "O"));
        game.Play(new Tile(1, 2, "X"));

        expect(game.Winner()).toBe("X");
    });

    // 8. Victoire O - Ligne du milieu (Middle Row)
    it("should declare player O as winner if it plays three in middle row", () => {
        game.Play(new Tile(0, 0, "X"));
        game.Play(new Tile(1, 0, "O"));
        game.Play(new Tile(2, 1, "X"));
        game.Play(new Tile(1, 1, "O"));
        game.Play(new Tile(2, 2, "X"));
        game.Play(new Tile(1, 2, "O"));

        expect(game.Winner()).toBe("O");
    });

    // 9. Victoire X - Ligne du bas (Bottom Row)
    it("should declare player X as winner if it plays three in bottom row", () => {
        game.Play(new Tile(2, 0, "X"));
        game.Play(new Tile(0, 0, "O"));
        game.Play(new Tile(2, 1, "X"));
        game.Play(new Tile(0, 1, "O"));
        game.Play(new Tile(2, 2, "X"));

        expect(game.Winner()).toBe("X");
    });

    // 10. Victoire O - Ligne du bas (Bottom Row)
    it("should declare player O as winner if it plays three in bottom row", () => {
        game.Play(new Tile(0, 0, "X"));
        game.Play(new Tile(2, 0, "O"));
        game.Play(new Tile(1, 1, "X"));
        game.Play(new Tile(2, 1, "O"));
        game.Play(new Tile(0, 1, "X"));
        game.Play(new Tile(2, 2, "O"));

        expect(game.Winner()).toBe("O");
    });
});