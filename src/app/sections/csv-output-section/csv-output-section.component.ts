import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  Converter,
  IConversionStrategy,
  RelationalJson,
  IRowValue,
  OutputGenerator
} from "json-conversion-tool";
import { MatTableDataSource } from "@angular/material";
import { saveAs } from "file-saver";
import { JsonService } from "src/app/shared/json.service";
import { ConverterService } from "src/app/shared/converter.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-csv-output-section",
  templateUrl: "./csv-output-section.component.html",
  styleUrls: ["./csv-output-section.component.css"]
})
export class CsvOutputSectionComponent implements OnInit {
  @Output()
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  whitelist = new FormControl();
  blacklist = new FormControl();
  whitelistSearchControl = new FormControl();
  blacklistSearchControl = new FormControl();
  currentWhitelist: string;
  currentBlacklist: string;

  rowDatas: [][] = [];

  tableData: MatTableDataSource<any>;

  constructor(
    public jsonService: JsonService,
    public converterService: ConverterService
  ) {}

  ngOnInit() {
    [this.whitelistSearchControl, this.blacklistSearchControl].forEach(
      control =>
        control.valueChanges.pipe().subscribe(() => {
          this.filterPropGroups();
        })
    );
  }

  filterPropGroups() {
    [
      [this.whitelistSearchControl, "Whitelist"],
      [this.blacklistSearchControl, "Blacklist"]
    ].forEach(controlTuple => {
      let search = (controlTuple[0] as FormControl).value;
      const showInListProp = `showIn${controlTuple[1]}`;
      this.converterService.propNameGroups.forEach(group => {
        group[showInListProp] = true;
        group.props.forEach(prop => prop[showInListProp] = true);
      });
      if (!search) {
        return;
      } else {
        search = search.toLowerCase();
      }
      this.converterService.propNameGroups.forEach(group => {
        group[showInListProp] = false;
        group.props.forEach(prop => {
          if (prop.name.toLowerCase().startsWith(search)) {
            group[showInListProp] = prop[showInListProp] = true;
          } else {
            prop[showInListProp] = false;
          }
        });
      });
    });
  }

  trackByIndex = (index: number, obj: any): any => index;

  convertJsonModel() {
    this.loading.emit(true);
    try {
      this.converterService.matTables = [];
      this.converterService.converterOptions.whiteList = this.whitelist.value;
      this.converterService.convertJsonModel();
      this.tableData = this.tableToMatTable(
        this.converterService.convertedTable
      );
      this.converterService.matTables.splice(0, 0, {
        title: this.converterService.convertedTable.title || "Table",
        matTable: this.tableData,
        convertedTable: this.converterService.convertedTable
      });
    } catch (error) {}

    this.loading.emit(false);
  }

  tableToMatTable = (table: RelationalJson) => {
    const rowData = [];
    table.rows.forEach(row => {
      const rowValue = {};
      table.columnNames.forEach(colName => {
        const rowCol = row.filter(x => x.columnName === colName)[0];
        rowValue[colName] = rowCol.value;

        if (rowCol.linkedTable) {
          this.converterService.matTables.push({
            title: `${row[0].value}: ${rowCol.linkedTable.title}`,
            matTable: this.tableToMatTable(rowCol.linkedTable),
            convertedTable: rowCol.linkedTable
          });
        }
      });
      rowData.push(rowValue);
    });
    return new MatTableDataSource(rowData);
  };

  getRowColValue = (row: IRowValue[], columnName: string) =>
    row.filter(x => x.columnName === columnName)[0].value;

  downloadFile() {
    const csv = new OutputGenerator(this.converterService.convertedTable).generateCsv();
    const blob = new Blob([csv], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${this.converterService.convertedTable.title || 'Converted JSON'}.csv`);
  }
}
