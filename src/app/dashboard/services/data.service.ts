import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {Data} from "../model/data.model";
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Location} from "../model/location.model";
import {Intervention} from "../model/intervention.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EvidentionModel} from "../model/evidention.model";
import {AdoptedModel} from "../model/adopted.model";
import {EvidentionCastrationModel} from "../model/evidentionCastration.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private endpointPath = environment.endpointUrl + '/api/dms';

  constructor(private http: HttpClient) {

  }

  public getData(sortOrder: OrderByDirection = 'asc', pageNumber = 1, pageSize = 20, filters: Map<string, string> = null): Observable<EvidentionModel[]> {
    return this.http.get<EvidentionModel[]>(this.endpointPath + '/fetchAll', { params : this.createParams(sortOrder, pageNumber, pageSize, filters) });
  }

  public getAdoptedData(sortOrder: OrderByDirection = 'asc', pageNumber = 1, pageSize = 20, filters: Map<string, string> = null): Observable<AdoptedModel[]> {
    return this.http.get<AdoptedModel[]>(this.endpointPath + '/fetchAllAdopted', { params : this.createParams(sortOrder, pageNumber, pageSize, filters) });
  }

  public getCastrationData(sortOrder: OrderByDirection = 'asc', pageNumber = 1, pageSize = 20, filters: Map<string, string> = null): Observable<EvidentionCastrationModel[]> {
    return this.http.get<EvidentionCastrationModel[]>(this.endpointPath + '/fetchAllWithCastrationData', { params : this.createParams(sortOrder, pageNumber, pageSize, filters) });
  }

  private createParams(sortOrder: OrderByDirection = 'asc', pageNumber = 1, pageSize = 20, filters: Map<string, string> = null): HttpParams {
    const convMap = this.convertMap(filters);

    let params = new HttpParams()
      .set('orderByDirection', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filters', JSON.stringify(convMap));

    return params;
  }

  private convertMap(map: Map<string, string>) {
    const convMap = {};
    map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    return convMap;
  }

  public getOneRecord(id: number): Observable<Data> {
    return this.http.get<Data>(this.endpointPath + `/fetchOne/${id}`);
  }

  public saveData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.endpointPath + '/save', data);
  }

  public getInterventions(active: string): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.endpointPath + `/interventions/${active}`);
  }

  public fetchNearbyData(locality: string, id: number, showAll: String): Observable<Location[]> {
    return this.http.get<Location[]>(this.endpointPath + `/nearbyLocations/${id}/${locality}/${showAll}`);
  }

  public saveIntervention(intervention: Intervention, dogIds: number[]) {
    return this.http.post<void>(this.endpointPath + '/interventions/save', { interventionDTO: intervention, dogIds: dogIds});
  }

  public getLastInterventionOrderNumber(): Observable<number> {
    return this.http.get<number>(this.endpointPath + '/interventions/lastOrderNumber');
  }
}
