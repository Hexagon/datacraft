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
     * @param {object} [options] - Optional options
     * @returns {DataSet}
     */
    constructor(options?: object);
    entries: any[];
    options: any;
    insert(inData: any): DataSet;
    update(o: any, whereFn: any): DataSet;
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
import { validate } from "./validate.js";
export { clone, validate };
