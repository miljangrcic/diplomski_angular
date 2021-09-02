export class CategoryMenuItem {
    displayValue: string;
    queryParamValue: string;
    subitems: CategoryMenuItem[];
  
    constructor(displayValue: string, queryParamValue: string) {
      this.displayValue = displayValue;
      this.queryParamValue = queryParamValue;
      this.subitems = [];
    }
}
