import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vetement } from '../model/vetement.model';
import { Tyype } from '../model/type.model';
import { TypeWrapper } from '../model/typeWrapper.model';
import { VetementWrapper } from '../model/vetementWrapper.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VetementService {
  apiURL: string = 'http://localhost:8081/vetements/rest';
  apiURLApi: string = 'http://localhost:8081/vetements/api';
  apiURLType: string = 'http://localhost:8081/vetements/types';

  vetements : Vetement[]; //un tableau de Vetement
  vetement! : Vetement;
  types!: Tyype[];

  constructor(private http: HttpClient) {
    this.types = [
      { idType: 1, nomType: "T-shirt" },
      { idType: 2, nomType: "Pantalon" },
      { idType: 3, nomType: "Veste" }
    ];

    this.vetements = [
      { idVetement : 1,  nomVetement : "T-shirt Nike", prixVetement : 80,  taille : "M",  couleur : "Noir",  dateCreation : new Date("01/14/2024"),type: { idType: 1, nomType: "T-shirt" }},
      { idVetement : 2,  nomVetement : "Jean Adidas",  prixVetement : 150, taille : "L",  couleur : "Bleu",  dateCreation : new Date("12/17/2023"),type: { idType: 2, nomType: "Pantalon" }},
      { idVetement : 3,  nomVetement : "Veste Zara",   prixVetement : 220, taille : "XL", couleur : "Rouge", dateCreation : new Date("02/20/2024"),type: { idType: 3, nomType: "Veste" }}
    ];
  }

  // La liste des vetements vient de l'API Spring Data REST
  listeVetements(): Observable<VetementWrapper> {
    return this.http.get<VetementWrapper>(this.apiURL + '?projection=vetementsType');
  }

  // POST : ajouter un vetement dans la base
  ajouterVetement(v: Vetement): Observable<Vetement> {
    return this.http.post<Vetement>(this.apiURLApi, v, httpOptions);
  }

  // DELETE : supprimer un vetement de la base
  supprimerVetement(id: number) {
    return this.http.delete(this.apiURLApi + '/' + id);
  }

  // Un vetement par son id (API)
  consulterVetement(id: number): Observable<Vetement> {
    return this.http.get<Vetement>(this.apiURL + '/' + id + '?projection=vetementsType');
  }

  // PUT : modifier un vetement dans la base
  updateVetement(v: Vetement): Observable<Vetement> {
    return this.http.put<Vetement>(this.apiURLApi, v, httpOptions);
  }

  // La liste des types vient de l'API Spring Data REST
  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLType);
  }

  consulterType(id: number): Tyype {
    return this.types.find(t => t.idType == id)!;
  }

  // Les vetements d'un type (API)
  rechercherParType(idType: number): Observable<VetementWrapper> {
    return this.http.get<VetementWrapper>(
      this.apiURL + '/search/findByTypeIdType?id=' + idType + '&projection=vetementsType');
  }

  // POST : ajouter un type dans la base
  ajouterType(t: Tyype): Observable<Tyype> {
    return this.http.post<Tyype>(this.apiURLType, { nomType: t.nomType }, httpOptions);
  }

  // PUT : modifier un type dans la base
  updateType(t: Tyype): Observable<Tyype> {
    return this.http.put<Tyype>(this.apiURLType + '/' + t.idType, { nomType: t.nomType }, httpOptions);
  }
}