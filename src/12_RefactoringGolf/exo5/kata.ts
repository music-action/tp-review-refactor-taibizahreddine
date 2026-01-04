/* eslint-disable */

// Constantes globales (Scope conservé selon l'Exo 04)
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
    private _lastSymbol = emptyPlay;
    private _board: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.validateFirstMove(symbol);
        this.validatePlayer(symbol);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(symbol);
        this.updateBoard(symbol, x, y);
    }

    private validateFirstMove(player: string) {
        if (this._lastSymbol == emptyPlay) {
            if (player == playerO) {
                throw new Error('Invalid first player');
            }
        }
    }

    private validatePlayer(player: string) {
        if (player == this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private validatePositionIsEmpty(x: number, y: number) {
        // REFACTORING : Tell, Don't Ask. we don't fouille plus dans le Board/Tile
        if (this._board.isTilePlayedAt(x, y)) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastSymbol = player;
    }

    private updateBoard(player: string, x: number, y: number) {
        this._board.AddTileAt(player, x, y);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }
}

// REFACTORING : Passage d'interface à classe pour encapsuler la logique
class Tile {
    constructor(public X: number, public Y: number, public Symbol: string) {}

    // La tuile sait si elle est jouée ou non
    public isPlayed(): boolean {
        return this.Symbol !== emptyPlay;
    }

    // La tuile sait se comparer à une autre tuile
    public hasSameSymbolAs(other: Tile): boolean {
        return this.Symbol === other.Symbol;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = firstRow; i <= thirdRow; i++) {
            for (let j = firstColumn; j <= thirdColumn; j++) {
                // Utilisation du constructeur de la classe Tile
                this._plays.push(new Tile(i, j, emptyPlay));
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this.TileAt(x, y).Symbol = symbol;
    }

    // Méthode pour masquer les détails de la tuile au Game
    public isTilePlayedAt(x: number, y: number): boolean {
        return this.TileAt(x, y).isPlayed();
    }

    public findRowFullWithSamePlayer(): string {
        if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
            return this.TileAt(firstRow, firstColumn).Symbol;
        }

        if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
            return this.TileAt(secondRow, firstColumn).Symbol;
        }

        if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
            return this.TileAt(thirdRow, firstColumn).Symbol;
        }

        return emptyPlay;
    }

    private isRowFull(row: number): boolean {
        // REFACTORING : On utilise tile.isPlayed() au lieu d'accéder à .Symbol
        return (
            this.TileAt(row, firstColumn).isPlayed() &&
            this.TileAt(row, secondColumn).isPlayed() &&
            this.TileAt(row, thirdColumn).isPlayed()
        );
    }

    private isRowFullWithSameSymbol(row: number): boolean {
        const t1 = this.TileAt(row, firstColumn);
        const t2 = this.TileAt(row, secondColumn);
        const t3 = this.TileAt(row, thirdColumn);

        // REFACTORING : On délègue la comparaison aux tuiles (hasSameSymbolAs)
        return t1.hasSameSymbolAs(t2) && t3.hasSameSymbolAs(t2);
    }
}