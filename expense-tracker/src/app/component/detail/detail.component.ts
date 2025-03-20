import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  constructor(
      private mainService:MainService
    ){}
  
    expenses:any;
    expenseName:any;
    expenseAmount:any;
    expenseDate:any;
    expenseDescription:any

    // expenseName: ['', [Validators.required, Validators.minLength(3)]],
    //       expenseAmount: ['', Validators.required],
    //       expenseDate: ['',Validators.required],
    //       expenseDescription: ['', [Validators.required, Validators.minLength(10)]],
  
  
    ngOnInit(): void {
  
      this.getAllBook()

      
      
    }
  
    getAllBook(){
      this.expenses = this.mainService.postData()
      console.log(this.expenses)
    }
}
