import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Intervention} from "../../model/intervention.model";
import {DetailsComponent} from "../details/details.component";
import {MatDialog} from "@angular/material/dialog";
import {InterventionUpdateComponent} from "../intervention-update/intervention-update.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent implements OnInit, OnDestroy {

  dataActive: Intervention[];
  dataClosed: Intervention[];
  displayedColumns: string[] = ['dog', 'owner', 'dateOfIntervention', 'interventionNote', 'closed'];
  loadingActive: boolean = true;
  loadingClosed: boolean = true;
  activeTab: number = 0;
  mobileQuery: MediaQueryList;

  activeInterventionsSubscription: Subscription;
  closedInterventionsSubscription: Subscription;

  private _mobileQueryListener: () => void;


  constructor(private dataService: DataService,
              public dialog: MatDialog,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.activeInterventionsSubscription = this.dataService.getInterventions('active').subscribe(res => {
      this.dataActive = res;
      this.loadingActive = false;
    });
  }

  loadData(event) {
    this.activeTab = event.index;

    this.loadDataFn(event.index);
  }

  private loadDataFn(index) {

    if (index === 0 && (!this.dataActive || this.dataActive.length === 0)) {
      this.loadingActive = true;
      this.activeInterventionsSubscription = this.dataService.getInterventions('active').subscribe(res => {
        this.dataActive = res;
        this.loadingActive = false;
      });
    }

    if (index === 1 && (!this.dataClosed || this.dataClosed.length === 0)) {
      this.loadingClosed = true;
      this.closedInterventionsSubscription = this.dataService.getInterventions('inactive').subscribe(res => {
        this.dataClosed = res;
        this.loadingClosed = false;
      });
    }
  }

  onRowSelected(row) {
    this.dialog.open(InterventionUpdateComponent, {
      data: row,
      width: this.mobileQuery.matches ? '100%' : '50%'
    });

    this.dialog.afterAllClosed.subscribe(res => {
      this.dataActive = null;
      this.dataClosed = null;

      this.loadDataFn(this.activeTab);
    })
  }

  ngOnDestroy(): void {
    if (this.activeInterventionsSubscription)
      this.activeInterventionsSubscription.unsubscribe();

    if (this.closedInterventionsSubscription)
      this.closedInterventionsSubscription.unsubscribe();
  }
}
