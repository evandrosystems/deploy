/**
 * Validate SSH key permission.
 * @param {string} permission - The permission string.
 * @returns {boolean} - True if valid, false otherwise.
 */
function octalPermission(permission) {
    const octalRegex = /^[0-7]{3,4}$/;
    return octalRegex.test(permission);
}

module.exports = octalPermission;