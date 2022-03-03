/**
 * @param {RegExp} regex 
 * @param {string} str 
 * @returns {boolean}
 */
export const useStringMatch = (regex, str) => {
    if (typeof regex === "boolean") {
        return false;
    }

    let m;
    let cmp = 0;

    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        m.forEach(() => (cmp++));
    }

    return cmp !== 0;
};