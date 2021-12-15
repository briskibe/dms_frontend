import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {DetailsComponent} from "../details/details.component";
import {MatDialog} from "@angular/material/dialog";
import {MediaMatcher} from "@angular/cdk/layout";
import {AdoptedModel} from "../../model/adopted.model";
import {MatSelect, MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-adopted',
  templateUrl: './adopted.component.html',
  styleUrls: ['./adopted.component.css']
})
export class AdoptedComponent implements OnInit {

  data: AdoptedModel[];
  displayedColumns: string[] = ['brcipa', 'ime', 'udomitelj', 'mjestoudom', 'kastr', 'provjeraudom'];
  lastDocumentLoaded: number = 1;
  filters: Map<string, string> = new Map<string, string>();
  filter: string = 'ime';

  @ViewChild("filterValue") filterValue: ElementRef;
  @ViewChild("filterValue2") filterValue2: MatSelect;

  selectedRowIndex = -1;

  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  public dataLoaded: boolean = false;

  constructor(private dataService: DataService,
              public dialog: MatDialog,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    this.dataService.getAdoptedData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
      this.dataLoaded = true;
      this.data = res;
      this.lastDocumentLoaded++;
    });
  }

  loadMoreData() {
    this.dataLoaded = false;
    this.dataService.getAdoptedData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
      this.dataLoaded = true;
      this.data = this.data.concat(res);
      this.lastDocumentLoaded++;
    });

  }

  updateFiltersOnRadioChange(event: MatSelectChange, inputName: string) {
    this.updateFilter(event.value, inputName);
  }

  updateFilters(event: Event, inputName: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateFilter(filterValue, inputName);
  }

  private updateFilter(filterValue: string, inputName: string) {
    if (filterValue !== "") {
      this.filters.set(inputName, filterValue);
    } else {
      this.filters.delete(inputName);
    }
  }

  applyFilters() {
    this.lastDocumentLoaded = 1;
    this.dataLoaded = false;
    this.dataService.getAdoptedData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
      this.dataLoaded = true;
      this.data = res;
      this.lastDocumentLoaded++;
    });
  }

  onRowSelected(row) {
    if (this.dataLoaded) {
      this.selectedRowIndex = row.id;
      this.dataService.getOneRecord(this.selectedRowIndex).subscribe(res => {
        let dialogRef = this.dialog.open(DetailsComponent, {
          data: {
            data: { ...res },
            isNew: false
          },
          width: this.mobileQuery.matches ? '100%' : '50%'
        });

        dialogRef.afterClosed().subscribe(res => {
          this.data = null;
          this.selectedRowIndex = null;
          this.lastDocumentLoaded = 1;
          this.clearFilters();
          this.dataLoaded = false;
          this.dataService.getAdoptedData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
            this.dataLoaded = true;
            this.data = res;
            this.lastDocumentLoaded++;
          });
        });
      });
    }
  }

  clearFilters() {
    if (this.filterValue && this.filterValue.nativeElement) {
      this.filterValue.nativeElement.value = "";
    }

    if (this.filterValue2 && this.filterValue2.value) {
      this.filterValue2.value = null;
    }
    this.filters.clear();
    this.applyFilters();
  }

}
