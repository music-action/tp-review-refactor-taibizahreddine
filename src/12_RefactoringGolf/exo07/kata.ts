/* eslint-disable */

const firstRow = 0;
export const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const noPlayer = ' ';

export class Game {
    private _lastPlayer = noPlayer;
    private _board: Board = new Board();

    // REFACTORING : La méthode accepte désormais un objet Tile unique
    public Play(move: Tile): void {
        this.validateFirstMove(move.Player);
        this.validatePlayer(move.Player);
        this.validatePositionIsEmpty(move);

        this.updateLastPlayer(move.Player);
        this.updateBoard(move);
    }

    private validateFirstMove(player: string) {
        if (this._lastPlayer == noPlayer) {
            if (player == playerO) {
                throw new Error('Invalid first player');
            }
        }
    }

    private validatePlayer(player: string) {
        if (player == this._lastPlayer) {
            throw new Error('Invalid next player');
        }
    }

    // Utilisation de l'objet move pour la validation
    private validatePositionIsEmpty(move: Tile) {
        if (this._board.isTilePlayedAt(move)) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastPlayer = player;
    }

    private updateBoard(move: Tile) {
        this._board.AddTileAt(move);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }
}

export class Tile {
    // Propriétés privées pour l'encapsulation
    constructor(private x: number, private y: number, private player: string) {}

    get Player() {
        return this.player;
    }

    get X() { return this.x; }
    get Y() { return this.y; }

    get isNotEmpty() {
        return this.Player !== noPlayer;
    }

    hasSamePlayerAs(other: Tile) {
        return this.Player === other.Player;
    }

    hasSameCoordinatesAs(other: Tile) {
        return this.x == other.x && this.y == other.y;
    }

    updatePlayer(newPlayer: string) {
        this.player = newPlayer;
    }
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let x = firstRow; x <= thirdRow; x++) {
            for (let y = firstColumn; y <= thirdColumn; y++) {
                this._plays.push(new Tile(x, y, noPlayer));
            }
        }
    }

    // Refactorisé pour accepter un objet Tile
    public isTilePlayedAt(tile: Tile) {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.isNotEmpty;
    }

    public AddTileAt(tile: Tile): void {
        this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.updatePlayer(tile.Player);
    }

    public findRowFullWithSamePlayer(): string {
        for (let row = firstRow; row <= thirdRow; row++) {
            if (this.isRowFull(row) && this.isRowFullWithSamePlayer(row)) {
                return this.playerAt(row, firstColumn);
            }
        }
        return noPlayer;
    }

    private playerAt(x: number, y: number) {
        return this.TileAt(x, y).Player;
    }

    private TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
    }

    private isRowFull(row: number) {
        return (
            this.isTilePlayedAt(new Tile(row, firstColumn, noPlayer)) &&
            this.isTilePlayedAt(new Tile(row, secondColumn, noPlayer)) &&
            this.isTilePlayedAt(new Tile(row, thirdColumn, noPlayer))
        );
    }

    private isRowFullWithSamePlayer(row: number) {
        const t1 = this.TileAt(row, firstColumn);
        const t2 = this.TileAt(row, secondColumn);
        const t3 = this.TileAt(row, thirdColumn);
        return t1.hasSamePlayerAs(t2) && t2.hasSamePlayerAs(t3);
    }
}