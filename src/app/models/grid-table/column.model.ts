export class Column {
    public name: string;
    public dataType: string;
    public header?: string;
}

export class Header {
    public name: string;
    public fieldName: string;
    public headercss: string;
    public dataType: string;
    public icon:string;
    public navigation?:string;
    public isEnabled?:boolean=true;
}

export class MyData{
    public Id: string;
    public column: string;
    public rowData: any;
}

export class PageData{
    public PageSize: number;
    public CurrentPage: number;
    public TotalPage: number;
    public TotalItems: number;
}

export class AfterHours{
    public tenantIds: string[];
    public months: string[];
    public years: string[];
}

export class InputParam{
    public SpaceId: string;
    public SpaceType: string;
    public UserRoleId: string;
    public RoleCategoryId: number;
    public Year: number;
}