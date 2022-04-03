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
function validate(obj, allowedFields, requiredFields) {

	const objectKeys = new Set(Object.keys(obj));
    
	// Check allowed
	if (allowedFields) {
		const allowedSet = new Set(allowedFields);
		objectKeys.forEach(k => {
			if (!allowedSet.has(k)) {
				throw new Error("Field '" + k + "' is not an allowed property of validated object.");
			}
		});
	}

	// Check required  
	if (requiredFields) {  
		const requiredSet = new Set(requiredFields);
		requiredSet.forEach(r => {
			if (!objectKeys.has(r)) {
				throw new Error("Required field '" + r + "' is not present in validated object.");
			}
		});
	}

	return true;

}

export default validate;
export { validate };