import { Component, ViewChild, ElementRef} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  squares: any[];
  xIsNext: boolean;
  isTie = false;
  moveCounter = 0;
  winner: string;
  winnerStack: string[] = [];
  oScrore = 0;
  xScrore = 0;
  winningSequence: any[];
  @ViewChild('winnerStackDiv') winngerStackDiv: ElementRef;

  constructor(private dialog: MatDialog) {}

  
  scrollScoreListLeft() {
    const el = this.winngerStackDiv.nativeElement;
    el.scrollTo({left: el.offsetWidth, behavior: 'smooth'});
  }
 
  saveWinner(w: string) {
    this.winnerStack.push(w)
    w === 'O' ? this.oScrore++ : this.xScrore++;

    setTimeout(() => {
      this.scrollScoreListLeft()
    }, 0)
  }

  ngOnInit(): void {
    this.newGame();
  }

  ngAfterViewInit(): void {
    this.scrollScoreListLeft()
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.moveCounter = 0;
    this.isTie = false;
    this.winningSequence = []
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (this.winner) return;
    
    if (!this.squares[idx]) {
      this.moveCounter++;
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();

    if (this.moveCounter > 8) {
      this.isTie = true;
      return;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {

        this.winningSequence = lines[i]
        const w = this.squares[a];
        this.saveWinner(w)
        return w;
      }
    }
  }
}
