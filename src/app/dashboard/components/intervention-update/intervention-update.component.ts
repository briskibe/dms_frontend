import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Intervention} from "../../model/intervention.model";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-intervention-update',
  templateUrl: './intervention-update.component.html',
  styleUrls: ['./intervention-update.component.css']
})
export class InterventionUpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InterventionUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Intervention,
              private dataService: DataService,
              private router: Router,
              private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this._adapter.setLocale('hr');
  }

  onClose() {
    this.dialogRef.close();
  }

  onUpdateIntervention() {
    this.dataService.saveIntervention(this.data, []).subscribe(res => {
      this.dialogRef.close();
    })
  }
}
