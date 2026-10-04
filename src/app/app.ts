import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  weight = signal<number | null>(null);
  height = signal<number | null>(null);

  bmi = signal<number | null>(null);
  category = signal('');
  error = signal('');

  calculate() {
    const w = this.weight();
    const h = this.height();

    if (!w || !h || w <= 0 || h <= 0) {
      this.error.set('Please enter a valid weight and height.');
      this.bmi.set(null);
      this.category.set('');
      return;
    }

    this.error.set('');
    const m = h / 100;
    const value = +(w / (m * m)).toFixed(1);
    this.bmi.set(value);

    if (value < 18.5) this.category.set('Underweight');
    else if (value < 25) this.category.set('Normal weight');
    else if (value < 30) this.category.set('Overweight');
    else this.category.set('Obese');
  }
}