import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';
import { Router } from '@angular/router';
import { Tyype } from '../model/type.model';

@Component({
  selector: 'app-add-vetement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-vetement.html',
})
export class AddVetementComponent implements OnInit {

  newVetement: Vetement = new Vetement();
  types!: Tyype[];
  newIdType!: number;
  newType!: Tyype;
  message!: string;

  constructor(private vetementService: VetementService,
              private router: Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.vetementService.listeTypes().subscribe(types => {
      console.log(types);
      this.types = types._embedded.types;
      this.cdr.markForCheck();
    });
  }

  addVetement() {
    this.newType = this.types.find(t => t.idType == this.newIdType)!;
    this.newVetement.type = this.newType;
    this.vetementService.ajouterVetement(this.newVetement).subscribe(() => {
      this.router.navigate(['vetements']);
    });
  }
}