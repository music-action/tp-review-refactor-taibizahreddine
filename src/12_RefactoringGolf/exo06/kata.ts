/* eslint-disable */

// Utilisation de termes explicites pour le domaine
const FIRST_ROW = 0;
export const SECOND_ROW = 1;
const THIRD_ROW = 2;
const FIRST_COLUMN = 0;
const SECOND_COLUMN = 1;
const THIRD_COLUMN = 2;

const MARK_O = 'O';
const EMPTY_MARK = ' ';

export class TicTacToe { // "Game" devient "TicTacToe"
    private _lastMark = EMPTY_MARK; // symbol -> Mark
    private _grid: Grid = new Grid(); // board -> Grid

    public makeMove(mark: string, row: number, column: number): void { // Play -> makeMove
        this.validateFirstMove(mark);
        this.validatePlayer(mark);
        this.validateCellIsEmpty(row, column);

        this.updateLastPlayer(mark);
        this.placeMarkInGrid(mark, row, column);
    }

    private validateFirstMove(mark: string) {
        if (this._lastMark == EMPTY_MARK) {
            if (mark == MARK_O) {
                throw new Error('Invalid first player');
            }
        }
    }

    private validatePlayer(mark: string) {
        if (mark == this._lastMark) {
            throw new Error('Invalid next player');
        }
    }

    private validateCellIsEmpty(row: number, column: number) {
        if (this._grid.cellAt(row, column).isOccupied) { // isNotEmpty -> isOccupied
            throw new Error('Invalid position');
        }
    }

    private updateLastPlayer(mark: string) {
        this._lastMark = mark;
    }

    private placeMarkInGrid(mark: string, row: number, column: number) {
        this._grid.addMarkAt(mark, row, column);
    }

    public getWinner(): string { // Winner -> getWinner
        return this._grid.findWinningRowMark();
    }
}

class Cell { // Tile -> Cell
    constructor(private row: number, private column: number, private mark: string) {}

    get markValue() {
        return this.mark;
    }

    get isOccupied() {
        return this.mark !== EMPTY_MARK;
    }

    hasSameMarkAs(other: Cell) {
        return this.mark === other.mark;
    }

    hasSameCoordinatesAs(row: number, column: number) {
        return this.row === row && this.column === column;
    }

    updateMark(newMark: string) {
        this.mark = newMark;
    }
}

class Grid { // Board -> Grid
    private _cells: Cell[] = [];

    constructor() {
        for (let x = FIRST_ROW; x <= THIRD_ROW; x++) {
            for (let y = FIRST_COLUMN; y <= THIRD_COLUMN; y++) {
                this._cells.push(new Cell(x, y, EMPTY_MARK));
            }
        }
    }

    public cellAt(row: number, column: number): Cell {
        return this._cells.find((c: Cell) => c.hasSameCoordinatesAs(row, column))!;
    }

    public addMarkAt(mark: string, row: number, column: number): void {
        this.cellAt(row, column).updateMark(mark);
    }

    public findWinningRowMark(): string { // findRowFullWithSamePlayer -> findWinningRowMark
        for (let row = FIRST_ROW; row <= THIRD_ROW; row++) {
            if (this.isRowComplete(row) && this.isRowUniform(row)) {
                return this.cellAt(row, FIRST_COLUMN).markValue;
            }
        }
        return EMPTY_MARK;
    }

    private isRowComplete(row: number) {
        return (
            this.cellAt(row, FIRST_COLUMN).isOccupied &&
            this.cellAt(row, SECOND_COLUMN).isOccupied &&
            this.cellAt(row, THIRD_COLUMN).isOccupied
        );
    }

    private isRowUniform(row: number) {
        return (
            this.cellAt(row, FIRST_COLUMN).hasSameMarkAs(this.cellAt(row, SECOND_COLUMN)) &&
            this.cellAt(row, THIRD_COLUMN).hasSameMarkAs(this.cellAt(row, SECOND_COLUMN))
        );
    }
}