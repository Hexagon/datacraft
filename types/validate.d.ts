export default validate;
/**
 * Validate
 *
 * Validate an object agains allowed and optionally required fields
 *
 * @constructor
 * @param {any} obj - Object to check
 * @param {array|Set} allowedFields - Allowed fields
 * @param {boolean} [requiredFields] - Required fields
 * @returns {boolean}
 */
export function validate(obj: any, allowedFields: any[] | Set<any>, requiredFields?: boolean): boolean;
export class validate {
    /**
     * Validate
     *
     * Validate an object agains allowed and optionally required fields
     *
     * @constructor
     * @param {any} obj - Object to check
     * @param {array|Set} allowedFields - Allowed fields
     * @param {boolean} [requiredFields] - Required fields
     * @returns {boolean}
     */
    constructor(obj: any, allowedFields: any[] | Set<any>, requiredFields?: boolean);
}
