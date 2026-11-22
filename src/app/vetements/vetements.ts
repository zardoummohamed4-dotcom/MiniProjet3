import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';

import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.sevice';
@Component({
  imports: [CommonModule,RouterLink],
  selector: 'app-vetements',
  standalone: true,
  templateUrl: './vetements.html',
  styleUrl: './vetements.css'
})
export class VetementsComponent implements OnInit  {
  vetements: Vetement[] = []; //un tableau de Vetement

  constructor(private vetementService: VetementService,
              public authService: AuthService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.chargerVetements();
  }

  chargerVetements() {
    this.vetementService.listeVetements().subscribe(vets => {
      console.log(vets);
      this.vetements = vets._embedded.vetements;
      this.cdr.markForCheck();
    });
  }

  supprimerVetement(p: Vetement)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.vetementService.supprimerVetement(p.idVetement).subscribe(() => {
        console.log("vetement supprimé");
        this.chargerVetements();
      });
  }

}