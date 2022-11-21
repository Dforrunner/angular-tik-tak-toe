import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})

export class SquareComponent {
  color: string;
  @Input() value: 'X' | 'O';
  @Input() winnerBox = false;

  ngOnChanges() {
    if (this.value === 'X')
      this.color = 'primary'
    else if(this.value === 'O')
      this.color = 'accent'
    
  }
}
