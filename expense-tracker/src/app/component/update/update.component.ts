import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  constructor(private fb: FormBuilder,
    private ExpensesService:ExpenseService
  ) {}

  expenses: any[] = [];
  selectedExpense: any = { _id: '', Expensename: '', ExpenseAuthor: '' };
  ExpenseID:any
  private modalInstance: any;

  ExpenseForm!: FormGroup;
    
 
  
    

  ngOnInit(): void {

    this.ExpenseForm = this.fb.group({
      expenseName: ['', [Validators.required, Validators.minLength(3)]],
      expenseAmount: ['', Validators.required],
      expenseDate: ['',Validators.required],
      expenseDescription: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.getAllExpense();

  }

  getAllExpense() {
        const userId = localStorage.getItem("userId")
    this.ExpensesService.getAllExpenseData(userId).subscribe(
      (data: any) => {
        this.expenses = Array.isArray(data.message) ? data.message : [];
        console.log('Expenses API Response:', this.expenses);
      }
    );
  }

  // Open modal with selected Expense data
  openUpdateModal(Expense: any) {
    this.ExpenseID = Expense._id
    this.ExpenseForm.patchValue({
      expenseName: Expense.expenseName,
      expenseAmount: Expense.expenseAmount,
      expenseDate: Expense.expenseDate,
      expenseDescription: Expense.expenseDescription,
    });
  }


  opendeleteModal(Expense: any) {
    this.ExpenseID = Expense._id
    this.ExpensesService.DeleteExpense(this.ExpenseID).subscribe(
      (response:any) => {
        console.log('Expense updated successfully:', response);
        this.getAllExpense();
        console.log("data is delted");
      }
    );
  }

  // Update Expense details
  updateExpense() {
    const data = this.ExpenseForm.value
    this.ExpensesService.updateExpense(this.ExpenseID, data).subscribe(
      (response:any) => {
        console.log('Expense updated successfully:', response);
        this.getAllExpense();
        this.modalInstance.hide();
      }
    );
  }

}

