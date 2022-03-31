export default DataSet;
/**
 * Creates a new DataSet.
 * @class
 */
export class DataSet {
    /**
     * DataSet entrypoint
     *
     * @constructor
     * @param {Array} [entries] - Optional array of objects, shortcut to `.insert()`
     * @returns {DataSet}
     */
    constructor(entries?: any[]);
    entries: any[];
    insert(inData: any): void;
    drop(fieldName: any): DataSet;
    join(oDs: any, target: any, conditionCb: any): DataSet;
    joinFirst(oDs: any, target: any, conditionCb: any): DataSet;
    copy(): DataSet;
    reduce(conditionCb: any): DataSet;
    toArray(conditionCb: any): any[];
    first(conditionCb: any): any;
    groupBy(groupByFieldsInput: any, outputFieldName: any): DataSet;
    total(outputFieldName: any): DataSet;
    avg(field: any, outputFieldName: any, mapCb: any): DataSet;
    sum(field: any, outputFieldName: any, mapCb: any): DataSet;
    min(field: any, outputFieldName: any, mapCb: any): DataSet;
    max(field: any, outputFieldName: any, mapCb: any): DataSet;
    countd(field: any, outputFieldName: any, mapCb: any): DataSet;
    count(field: any, outputFieldName: any, mapCb: any): DataSet;
    calc(outputFieldName: any, calcCb: any): DataSet;
    autonumber(outputFieldName: any): DataSet;
}
import { clone } from "./clone.js";
export { clone };
