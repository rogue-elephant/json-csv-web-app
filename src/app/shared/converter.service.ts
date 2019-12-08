import { Injectable } from "@angular/core";
import {
  RelationalJson,
  IConversionStrategy,
  Converter
} from "json-conversion-tool";
import { JsonService } from "./json.service";
import { MatTableDataSource } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class ConverterService {
  public convertedTable: RelationalJson;
  public converterOptions: IConversionStrategy;
  public propNameGroups: {
    group: string;
    showInBlacklist: true;
    showInWhitelist: true;
    props: {
      name: string;
      showInWhitelist: boolean;
      showInBlacklist: boolean;
    }[];
  }[] = [];
  public matTables: {
    title: string;
    matTable: MatTableDataSource<any>;
    convertedTable: RelationalJson;
  }[] = [];

  constructor(private jsonService: JsonService) {
    this.converterOptions = {
      whiteList: [],
      blackList: []
    };
  }

  convertJsonModel() {
    try {
      const converter = new Converter();
      const convertedJson = converter.convertJson(
        this.jsonService.jsonObject,
        {
          ...this.converterOptions,
          blackList:
            this.converterOptions.blackList.length > 0
              ? this.converterOptions.blackList
              : null,
          whiteList:
            this.converterOptions.whiteList.length > 0
              ? this.converterOptions.whiteList
              : null
        }
      );
      this.convertedTable = convertedJson;

      if (this.converterOptions.whiteList.length < 1) {
        this.propNameGroups = [];
        this.propNameGroups.push({
          group: 'Base Properties',
          showInBlacklist: true,
          showInWhitelist: true,
          props: this.convertedTable.columnNames.map(colName => {
            return {
              name: colName,
              showInBlacklist: true,
              showInWhitelist: true
            };
          })
        });
        this.propNameGroups = [
          ...this.propNameGroups,
          ...(this.convertedTable.rows
            .filter(x => x.filter(y => y.linkedTable != null).length > 0)
            .map(x => x.filter(y => y.linkedTable != null))
            .map(x =>
              x.reduce(
                (acc, y) =>
                  acc.concat({
                    group: y.linkedTable.title,
                    showInBlacklist: true,
                    showInWhitelist: true,
                    props: y.linkedTable.columnNames.map(z => {
                      return {
                        name: y.linkedTable.title + "." + z,
                        showInBlacklist: true,
                        showInWhitelist: true
                      };
                    })
                  }),
                []
              )
            )[0] || [])
        ].sort((x, y) => (x.group >= y.group ? 1 : x.group < y ? -1 : 0));
      }
    } catch (error) {}
  }
}
