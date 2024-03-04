import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // USERS
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/users`);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/master/user/${id}`, data);
  }

  // QUESTIONS
  addQuestion(data: any) {
    return this.http.post(`${this.apiUrl}/master/question`, data);
  }
  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/master/question/${id}`, data);
  }
  getAllQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/questions`);
  }
  getAllQuestionsByFaktor(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/questionsByFaktor`);
  }

  // CATEGORIES
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/categories`);
  }

  // FAKTOR
  getAllFaktor(): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/faktors`);
  }

  // TP DOC
  getAllTp(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/tp/${id}`);
  }
  getDetailTp(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/master/detail-tp/${id}`);
  }
  addTpDoc(data: any) {
    return this.http.post(`${this.apiUrl}/master/tp`, data);
  }
  updateTpDoc(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/master/update-tp/${id}`, data);
  }

  // RESULT
  addResult(data: any) {
    return this.http.post(`${this.apiUrl}/master/result`, data);
  }
}
