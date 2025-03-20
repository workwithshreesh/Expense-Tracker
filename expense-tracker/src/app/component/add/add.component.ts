import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  ExpenseForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private ExpensesService:ExpenseService
  ) {}

  ngOnInit(): void {
    this.ExpenseForm = this.fb.group({
      expenseName: ['', [Validators.required, Validators.minLength(3)]],
      expenseAmount: ['', Validators.required],
      expenseDate: ['',Validators.required],
      expenseDescription: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  addExpense(): void {
    if (this.ExpenseForm.valid) {
      const userId = localStorage.getItem("userId")
      const data = this.ExpenseForm.value
      console.log('Expense Data:', data);
      this.ExpensesService.postExpenseData(data,userId).subscribe(data=>{
        console.log(data)
        alert('Expense added successfully!');
        this.ExpenseForm.reset()
      })
    } else {
      console.log('Form is invalid');
      this.ExpenseForm.markAllAsTouched();
    }
  }


}
