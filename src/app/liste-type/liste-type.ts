import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tyype } from '../model/type.model';
import { VetementService } from '../services/vetement.service';
import { UpdateType } from '../update-type/update-type';

@Component({
  imports: [UpdateType],
  selector: 'app-liste-type',
  styles: ``,
  templateUrl: './liste-type.html',
})

export class ListeTypes implements OnInit {

  types!: Tyype[];
  ajout: boolean = true;

  updatedType: Tyype = { idType: 0, nomType: "" };

  constructor(private vetementService: VetementService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.vetementService.listeTypes().subscribe(types => {
      this.types = types._embedded.types;
      this.cdr.markForCheck();
    });
  }

  typeUpdated(t: Tyype) {
    console.log("Type updated event", t);
    if (this.ajout) {
      this.vetementService.ajouterType({ ...t }).subscribe(() => {
        this.chargerTypes();
      });
    } else {
      this.vetementService.updateType({ ...t }).subscribe(() => {
        this.chargerTypes();
      });
    }
    this.updatedType = { idType: 0, nomType: "" };
    this.ajout = true;
  }

  updateType(t: Tyype) {
    this.updatedType = { ...t };
    this.ajout = false;
  }
}