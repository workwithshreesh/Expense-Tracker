import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  Base_Url = "http://localhost:3000/exp/Expense/"

  constructor(
    private http:HttpClient
  ) { }

  getAllExpenseData(userId:any):Observable<any>{
    return this.http.get<any>(this.Base_Url+userId);
  }

  postExpenseData(data:any,userId:any):Observable<any>{
    return this.http.post(this.Base_Url+userId, data)
  }

  updateExpense(id:any, data:any):Observable<any>{
    return this.http.put(this.Base_Url+id,data)
  }

  getExpenseById(id:any):Observable<any>{
    return this.http.get(this.Base_Url+id);
  }

  DeleteExpense(id:any):Observable<any>{
    return this.http.delete<any>(this.Base_Url+id);
  }

}
