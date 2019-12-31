import { Component, OnInit, Input, Output, EventEmitter, OnChanges, IterableDiffers } from '@angular/core';
import { Header, MyData, PageData } from 'src/app/models/grid-table/column.model';
// import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit ,OnChanges{
  private _data: any[];
  tableData: any[];
  filterData: any[];
  isAllChecked=false;
  @Input() StatusMessage:string;
  @Input() pagesize = 5;
  @Input() tableHeading = '';
  @Input() columns: Header[];
  @Input()
  set Data(Data: any[]) {
    this._data = Data;
    this.filterData = Data;
    this.tableData = Data && Data.slice(0, this.pagesize);
    this.pageContent.emit(this.tableData);
  }
  get Data(): any[] {
    return this._data;
  }
  @Input() clickedData:boolean;
  @Input() checkedKey: string;
  @Input() showselection = false;
  @Input() enablerowselection = true;
  @Input() showpagesize = true;
  @Input() enableSorting = true;
  @Input() enableSearch = false;
  @Input() enablebutton = false;
  @Input() enableFreeze = false;
  @Input() pagination = true;
  @Input() server = false;
  @Input() uniqueKey: string;
  @Input() TotalItem: number;
  @Output() clickedIcon = new EventEmitter<object>();
  @Output() pageChangedData = new EventEmitter<PageData>();
  @Output() pageContent = new EventEmitter<any>();
  @Input() format = 'medium';
  @Input() showfooter = false;
  @Input() isSearchText = true;
  @Output() addnewuser = new EventEmitter<object>();
  @Output() getCheckedItems = new EventEmitter<any>();
  @Output() onRowSelected = new EventEmitter<any>();
  @Output() onFreezeCalled = new EventEmitter<any>();
  
  @Output() notification = new EventEmitter<object>();
  
  selectedRow: MyData;pageData: PageData;
  direction = true;
  currentClasses: {};
  sortcolumn: string;
  currentPage = 1;
  totalPage: number;
  math: any;
  highlightedRow: number = -1;
  searchText: string;
  defaultSortColumn = 0;
  min = 1;
  max: number;
  checkedItems:any[]=[];
  iterableDiffer:any;
  // private utilityService: UtilityService
  constructor(
    private _iterableDiffers: IterableDiffers) 
    {
      this.math = Math;
      this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }
    
    ngDoCheck() {
      
      //Check for any updation in the data
      let changes = this.iterableDiffer.diff(this.Data);
      if (changes) {
        console.log('Changes detected!');
        if(this.Data.length==0)
        {
          this.checkedItems=[] 
        }
        this.go();
        
      }
    }
    ngOnInit() {


    }
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      for (let propName in changes) {
        if (propName == "TotalItem") {
          let change = changes[propName];
          if (change.currentValue != change.previousValue) {
            this.highlightedRow = -1;
          }
        }
      }
    }
    setCurrentClasses(column1: string) {
      this.max = this.TotalItem !== undefined && this.TotalItem !== 0 ? this.math.ceil(this.TotalItem / this.pagesize) : 1;
      return {
        fas: true,
        'fa-angle-up': (this.direction && column1 === this.sortcolumn) ||
        (!this.direction && column1 !== this.sortcolumn) || this.sortcolumn === undefined,
        'fa-angle-down': (!this.direction && column1 === this.sortcolumn) || (this.direction && column1 !== this.sortcolumn)
      };
    }
    onClickedIcon(event, key: string, field: string, rowData: any, iconClass: any) {
      this.selectedRow = { Id: key, column: field, rowData};
      this.clickedIcon.emit(this.selectedRow);
    }
    
    onFreeze(){
      
      this.onFreezeCalled.emit();
    }
    
    sort(field: string, columnType: string) {
      if (!this.enableSorting) { return; }
      if (this.sortcolumn === undefined || this.sortcolumn === field) {
        this.direction = !this.direction;
      } else {
        this.direction = true;
      }
      this.sortcolumn = field;
      
      this.setCurrentClasses(this.sortcolumn);
      if (columnType === 'number') {
        if (this.direction) {
          this.filterData = this.filterData.sort((a, b) => {
            if (a[field] === null && b[field] === null) { return 0; }
            if (a[field] === null) { return -1; }
            if (b[field] === null) { return 1; }
            let p;
            let q;
            if (typeof a[field] === 'number') {
              p = a[field];
              q = b[field];
            } else {
              p = parseFloat(a[field].replace(/,/g, ''));
              q = parseFloat(b[field].replace(/,/g, ''));
            }
            return p - q;
          });
        } else {
          this.filterData = this.filterData.sort((a, b) => {
            if (a[field] === null && b[field] === null) { return 0; }
            if (a[field] === null) { return 1; }
            if (b[field] === null) { return -1; }
            let p;
            let q;
            if (typeof a[field] === 'number') {
              p = a[field];
              q = b[field];
            } else {
              p = parseFloat(a[field].replace(/,/g, ''));
              q = parseFloat(b[field].replace(/,/g, ''));
            }
            return q - p;
          });
        }
      } else if (columnType === 'date' || columnType === 'dateString') {
        if (this.direction) {
          this.filterData = this.filterData.sort(function(a, b) {
            const aDate = (new Date(a[field]));
            const bDate = (new Date(b[field]));
            return aDate > bDate ? 1 : -1;
          });
        } else {
          this.filterData = this.filterData.sort(function(a, b) {
            const aDate = (new Date(a[field]));
            const bDate = (new Date(b[field]));
            return aDate < bDate ? 1 : -1;
          });
        }
      } else {
        if (this.direction) {
          this.filterData = this.filterData.sort((a, b) => {
            return a[field].localeCompare(b[field]);
          });
        } else {
          this.filterData = this.filterData.sort((a, b) => {
            return b[field].localeCompare(a[field]);
          });
        }
      }
      this.emitPageData();
    }
    
    emitPageData() {
      this.highlightedRow = -1;
      this.selectedRow = { Id: '', column: '', rowData: null };
      this.clickedIcon.emit(this.selectedRow);
      
      this.pageData = {
        PageSize: this.pagesize,
        CurrentPage: this.currentPage,
        TotalPage: this.math.ceil(this.TotalItem / this.pagesize),
        TotalItems: this.TotalItem
      };
      
      if (this.server) {
        this.pageChangedData.emit(this.pageData);
      } else {
        const startIndex = (this.currentPage - 1) * this.pagesize;
        const endIndex = this.currentPage * this.pagesize;
        if (this.filterData && this.filterData.length > 0) {
          this.tableData = this.filterData.slice(startIndex, endIndex);
        } else {
          this.tableData = this._data.slice(startIndex, endIndex);
        }
        this.pageContent.emit(this.tableData);
      }
    }
    
    pageSizeChanged() {
      this.currentPage = 1;
      this.emitPageData();
    }
    
    previousPage() {
      if (this.currentPage === 1) { return; }
      this.currentPage--;
      this.emitPageData();
    }
    
    nextPage() {
      this.totalPage = this.math.ceil(this.TotalItem / this.pagesize);
      if (this.currentPage === this.totalPage) { return; }
      this.currentPage++;
      this.emitPageData();
    }
    
    lastPage() {
      this.currentPage = this.math.ceil(this.TotalItem / this.pagesize);
      this.emitPageData();
    }
    setClickedRow(index: number, key: string, rowData: any) {
      if (!this.enablerowselection) { return true; }
      this.highlightedRow = index;
      this.selectedRow = { Id: key, column: '', rowData };
      this.clickedIcon.emit(this.selectedRow);
      this.onRowSelected.emit(rowData);
      
      
    }
    onKey() {
      this.filterData = this.Data.filter(it => {
        delete it.url;
        if (Object.values(it).toString().toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0) {
          return it;
        }
      });
      this.tableData = this.filterData.slice(0, this.pagesize);
      this.TotalItem = this.filterData.length;
      this.currentPage = 1;
    }
    onChecked(event: any,index:string, key: string, rowData: any) {
      let currentRow;
      if (event.target.checked) {
        //   currentRow = { Id: index, column: 'Selected', rowData };
        this.checkedItems.push(rowData);
      } else {
        // currentRow = { Id: index, column: 'Unselected', rowData };
        let uncheckedRowIndex= this.checkedItems.findIndex(data=>data.state==false);
        
        if (uncheckedRowIndex !== -1)
        {
          this.checkedItems.splice(uncheckedRowIndex,1);
        }
      }
      
      this.getCheckedItems.emit(this.checkedItems);
    }
    
    
    onCheckAll(event){
      console.log(event)
      this.checkedItems=[];
      
      for(let i=0 ; i<this.Data.length;i++){
        
        
        this.Data[i].state = event.target.checked;
        if(event.target.checked){
          let rowData=this.Data[i];
          //  let currentRow = { Id: i+"", column: 'Selected', rowData };
          this.checkedItems.push(rowData);
        }
      }
      this.getCheckedItems.emit(this.checkedItems);
      
    }
    
    
    isAllRowsChecked() {
      return this.Data.every(_ => _.state);
      
    }
    
    
    
    OnAnyActionComplete() {
      this.searchText = null;
    }
    
    // broadcastRoute(url: string) {
    //   let splitted = url.split('/', 10);
    //   splitted = splitted.reverse();
    
    //   this.navigationBroadcasterService.navigationBroadcastEmit({
    //     ID: splitted[0],
    //     SpaceType: splitted[1]
    //   });
    // }
    
    public go() {
      
      if (this.currentPage) {
        this.TotalItem=this._data.length;
        this.totalPage = this.math.ceil(this.TotalItem / this.pagesize);
        if (this.currentPage > this.totalPage || this.currentPage <= 0) { return; }
        this.emitPageData();
      }
    }
    
    // formatLoacaleNumber(number: number) {
    //   const localeNumber = number !== undefined && number !== null ?  number.toLocaleString(this.utilityService.getLanguageCode()) : number;
    //   return localeNumber;
    // }
    
    addnewusers(event) {
      this.addnewuser.emit(event);
    }
    

  }
  