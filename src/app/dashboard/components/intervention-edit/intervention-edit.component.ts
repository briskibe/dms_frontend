import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Data} from "../../model/data.model";
import {tap} from "rxjs/operators";
import {Location} from "../../model/location.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Intervention} from "../../model/intervention.model";
import {DateAdapter} from "@angular/material/core";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-intervention-edit',
  templateUrl: './intervention-edit.component.html',
  styleUrls: ['./intervention-edit.component.css']
})
export class InterventionEditComponent implements OnInit {

  dog = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  dateOfIntervention = new FormControl('', Validators.required);
  interventionNote = new FormControl('');
  closed = new FormControl(false);

  public interventionForm: FormGroup = new FormGroup({
    dog: this.dog,
    owner: this.owner,
    dateOfIntervention: this.dateOfIntervention,
    interventionNote: this.interventionNote,
    closed: this.closed
  });

  private id: string;
  public data: Data;
  public nearbyData: Location[];
  public dataLoaded: boolean = false;
  public showAll: false;
  public castrated: string = 'all';
  public yearOfAdoption: string = 'all';
  public yearOfCheck: string = 'all';
  public dogsForIntervention: string[] = [];
  public dogIdsForIntervention: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._adapter.setLocale('hr');
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.dataService.getOneRecord(+this.id).subscribe(res => {
        this.data = res;
        this.dog.setValue(this.data.ime);
        this.owner.setValue(this.data.udomitelj);
        this.fetchNearbyLocations(this.data.mjestoUdomljenja, this.data.id);
      });
    }
  }

  onSlideChange() {
    this.fetchNearbyLocations(this.data.mjestoUdomljenja, this.data.id);
  }

  fetchNearbyLocations(locality: string, id: number) {
    this.nearbyData = null;
    this.dataLoaded = false;
    if (locality == '')
      locality = 'okolica';
    this.dataService.fetchNearbyData(locality, id, this.showAll ? "all" : "active", this.castrated, this.yearOfAdoption, this.yearOfCheck).subscribe(res2 => {
      this.dataLoaded = true;
      this.nearbyData = res2;
    })
  }

  mapOnClick(event) {
    const map = event.map;
    const point = map.forEachFeatureAtPixel(event.pixel,
      function(feature, layer) {
        return feature;
    });

    const loc = this.nearbyData.find(loc => loc.id == point.getId());
    const index: number = this.dogIdsForIntervention.indexOf(loc.id);
    if (index === -1) {
      this.dogsForIntervention.push(loc.ime);
      this.dogIdsForIntervention.push(loc.id);
    }
    this._snackbar.open(loc.ime + ', ' + loc.udomitelj, "OK");
  }

  removeDog(dog: string) {
    const index: number = this.dogsForIntervention.indexOf(dog);
    if (index !== -1) {
      this.dogsForIntervention.splice(index, 1);
      this.dogIdsForIntervention.splice(index, 1);
    }
  }

  createIntervention() {
    const intervention: Intervention = this.interventionForm.value;

    this.dataService.getLastInterventionOrderNumber().subscribe(last => {
      let lastOrderNumber = 1;
      // interventions has one element
      if (last) {
        lastOrderNumber = last + 1;
      }

      intervention.orderNumber = lastOrderNumber;
      intervention.dog_id = +this.id;

      intervention.dateOfIntervention = this.datePipe.transform(intervention.dateOfIntervention, 'yyyy-MM-dd');

      this.dataService.saveIntervention(intervention, this.dogIdsForIntervention).subscribe(res => {
        this._snackbar.open("Uspješno spremljena intervencija", "OK", { duration: 2000 });
        this.router.navigate(['/interventions']);
      }, fail => {
        this._snackbar.open("Neuspješno spremanje intervencije", "OK", { duration: 2000 });
      });
    });
  }
}
