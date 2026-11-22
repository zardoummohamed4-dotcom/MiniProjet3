import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { ActivatedRoute,Router } from '@angular/router';
import { VetementService } from '../services/vetement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tyype } from '../model/type.model';
@Component({
selector: 'app-update-vetement',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './update-vetement.html',
styles: ``
})
export class UpdateVetementComponent implements OnInit {

  types!: Tyype[];
  updatedTypeId!: number;
  currentVetement = new Vetement();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private vetementService: VetementService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.vetementService.listeTypes().subscribe(types => {
      console.log(types);
      this.types = types._embedded.types;
      this.cdr.markForCheck();
    });

    this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id'])
      .subscribe(vet => {
        this.currentVetement = vet;
        this.updatedTypeId = this.currentVetement.type?.idType;
        this.cdr.markForCheck();
      });
  }

  updateVetement() {
    this.currentVetement.type = this.types.find(t => t.idType == this.updatedTypeId)!;
    this.vetementService.updateVetement(this.currentVetement).subscribe(() => {
      this.router.navigate(['vetements']);
    });
  }
}