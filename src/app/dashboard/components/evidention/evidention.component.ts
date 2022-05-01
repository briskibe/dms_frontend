import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Data} from "../../model/data.model";
import {DataService} from "../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailsComponent} from "../details/details.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {EvidentionModel} from "../../model/evidention.model";
import {MatSelect, MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-evidention',
  templateUrl: './evidention.component.html',
  styleUrls: ['./evidention.component.css']
})
export class EvidentionComponent implements OnInit {

  data: EvidentionModel[];
  displayedColumns: string[] = ['ime', 'opispsa', 'udom', 'udomitelj', 'mjestoudom'];
  lastDocumentLoaded: number = 1;
  filters: Map<string, string> = new Map<string, string>();
  selectedRowIndex = -1;
  @ViewChild("filterValue") filterValue: ElementRef;
  @ViewChild("filterValue2") filterValue2: MatSelect;

  filter: string = 'ime';

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
    this.dataService.getData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
      this.dataLoaded = true;
      this.data = res;
      this.lastDocumentLoaded++;
    });
  }

  loadMoreData() {
    this.dataLoaded = false;
    this.dataService.getData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
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
    this.data = null;
    this.dataLoaded = false;
    this.lastDocumentLoaded = 1;
    this.dataService.getData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
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
          this.clearFilters();
          this.data = null;
          this.selectedRowIndex = null;
          this.lastDocumentLoaded = 1;
          this.dataLoaded = false;
          this.dataService.getData('asc', this.lastDocumentLoaded, 20, this.filters).subscribe(res => {
            this.dataLoaded = true;
            this.data = res;
            this.lastDocumentLoaded++;
          });
        });
      });
    }
  }

  createNew() {
      let newData: Data = {
        id: -1,
        opisPsa: '',
        cip: false,
        vlasnikCipa: '',
        stanjePsa: '',
        aktivnosti: '',
        brCipa: '',
        ime: '',
        udomljen: false,
        datumUdomljenja: '',
        udomitelj: '',
        mjestoUdomljenja: '',
        uginuo: false,
        datumUginuca: '',
        lokacija: '',
        kastriran: false,
        provjeraUdomljenja: '',
        provjeraNapomena: '',
        datumProvjere: ''
    };

    this.dialog.open(DetailsComponent, {
      data: {
        data: newData,
        isNew: true
      },
      width: this.mobileQuery.matches ? '100%' : '50%'
    });
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
