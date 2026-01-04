/* eslint-disable */

// Remplacement des constantes par un Enum pour éviter l'obsession des primitives
export enum Position {
    First = 0,
    Second = 1,
    Third = 2,
}

const playerO = 'O';
const noPlayer = ' ';

export class Game {
    private _lastPlayer = noPlayer;
    private _board: Board = new Board();

    // Les paramètres x et y utilisent maintenant le type Position
    public Play(player: string, x: Position, y: Position): void {
        this.validateFirstMove(player);
        this.validatePlayer(player);
        this.validatePositionIsEmpty(x, y);

        this.updateLastPlayer(player);
        this.updateBoard(new Tile(x, y, player));
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

    private validatePositionIsEmpty(x: Position, y: Position) {
        if (this._board.isTilePlayedAt(x, y)) {
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(player: string) {
        this._lastPlayer = player;
    }

    private updateBoard(tile: Tile) {
        this._board.AddTileAt(tile);
    }

    public Winner(): string {
        return this._board.findRowFullWithSamePlayer();
    }
}

class Tile {
    // x et y sont désormais de type Position
    constructor(private x: Position, private y: Position, private player: string) {}

    get Player() { return this.player; }
    get isNotEmpty() { return this.Player !== noPlayer; }

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
        // Utilisation de l'Enum pour l'initialisation
        const positions = [Position.First, Position.Second, Position.Third];
        for (const x of positions) {
            for (const y of positions) {
                this._plays.push(new Tile(x, y, noPlayer));
            }
        }
    }

    public isTilePlayedAt(x: Position, y: Position) {
        return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
    }

    public AddTileAt(tile: Tile): void {
        this.findTileAt(tile)!.updatePlayer(tile.Player);
    }

    public findRowFullWithSamePlayer(): string {
        const p = Position;
        if (this.isRowFull(p.First) && this.isRowFullWithSamePlayer(p.First)) {
            return this.playerAt(p.First, p.First);
        }
        if (this.isRowFull(p.Second) && this.isRowFullWithSamePlayer(p.Second)) {
            return this.playerAt(p.Second, p.First);
        }
        if (this.isRowFull(p.Third) && this.isRowFullWithSamePlayer(p.Third)) {
            return this.playerAt(p.Third, p.First);
        }
        return noPlayer;
    }

    private findTileAt(tile: Tile) {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
    }

    private playerAt(x: Position, y: Position) {
        return this.TileAt(x, y)!.Player;
    }

    private TileAt(x: Position, y: Position): Tile {
        return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
    }

    private isRowFull(row: Position) {
        return (
            this.isTilePlayedAt(row, Position.First) &&
            this.isTilePlayedAt(row, Position.Second) &&
            this.isTilePlayedAt(row, Position.Third)
        );
    }

    private isRowFullWithSamePlayer(row: Position) {
        const p = Position;
        return (
            this.hasSamePlayer(row, p.First, row, p.Second) &&
            this.hasSamePlayer(row, p.Second, row, p.Third)
        );
    }

    private hasSamePlayer(x: Position, y: Position, otherX: Position, otherY: Position) {
        return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
    }
}