import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Data} from "../../model/data.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../services/data.service";
import {MediaMatcher} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {Location} from "../../model/location.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";


export interface DataDetailsModel {
  data: Data;
  isNew: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  lat: number;
  lng: number;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  isEdit: boolean = false;
  dataBackup: Data;

  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDetailsModel,
    private dataService: DataService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _snackbar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.dataBackup = {...this.data.data };
  }

  isUndefinedLatLng(): boolean {
    return !(this.data.data.latitude && this.data.data.longitude);
  }

  onClose() {
    this.dialogRef.close(this.data.data);
  }

  onCreateIntervention(id: number) {
    this.dialogRef.close();
    this.router.navigate(['/interventions', id]);
  }

  onEditMode() {
    this.isEdit = true;
  }

  onUpdateData(close: boolean) {
    this.isEdit = false;
    this.data.data.datumUdomljenja = this.datePipe.transform(this.data.data.datumUdomljenja, 'yyyy-MM-dd');
    this.data.data.datumUginuca = this.datePipe.transform(this.data.data.datumUginuca, 'yyyy-MM-dd');
    this.data.data.datumProvjere = this.datePipe.transform(this.data.data.datumProvjere, 'yyyy-MM-dd');

    this.dataService.saveData(this.data.data).subscribe(
      res => {
        this._snackbar.open(this.data.isNew ? "Zapis uspješno spremljen" : "Podaci uspješno ažurirani", "OK", { duration: 2000 });
        this.dataBackup = { ... this.data.data };
        if (close) {
          this.dialogRef.close();
        }
      },
      err => this._snackbar.open("Neuspješno spremljen zapis", "OK", { duration: 2000 })
    );
  }

  onCancelUpdate() {
    this.isEdit = false;

    this.data.data = this.dataBackup;
  }

  onDeleteClick() {
    if(confirm("Želiš li obrisati psa: "+this.data.data.ime + "?")) {
      this.dialogRef.close();
      this.dataService.deleteData(this.data.data.id).subscribe(
        res => {
          this._snackbar.open("Podatak uspješno obrisan", "OK", { duration: 2000 });
          this.dialogRef.close();
        },
        err => this._snackbar.open("Došlo je do greške prilikom brisanja podatka", "OK", { duration: 2000 })
      );
    }
  }
}
