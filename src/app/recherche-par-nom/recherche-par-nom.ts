import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';
import { SearchFilterPipe } from '../search-filter-pipe';


@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchFilterPipe
  ],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  vetements!: Vetement[];
  searchTerm: string = '';

  constructor(private vetementService: VetementService) {
  }

  ngOnInit(): void {

    this.vetementService.listeVetements().subscribe(vets => {
      this.vetements = vets._embedded.vetements;
    });

  }

}