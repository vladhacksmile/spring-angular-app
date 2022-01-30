import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointResponse } from '../responses/PointResponse';
import { PointRequest } from '../requests/PointRequest';
import { TokenStorageService } from '../auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TableService {

  private pointsUrl = 'http://localhost:8080/api/points';
  private addPointUrl = 'http://localhost:8080/api/points';
  private clearPointsUrl = 'http://localhost:8080/api/points';

  constructor(private token: TokenStorageService, private http: HttpClient) {}

  public getPoints() {
    return this.http.get<PointResponse[]>(this.pointsUrl);
  }

  public clearPoints() {
    return this.http.delete<any>(this.clearPointsUrl);
  }

  addPoint(credentials: PointRequest): Observable<any> {
    return this.http.post<any>(this.addPointUrl, credentials, httpOptions);
  }
}
