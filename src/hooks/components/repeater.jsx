/**
 * @param {Array<any>} array 
 * @param {Function} jsxComponent 
 * @returns {Array<import("react").JSXElementConstructor>}
 */
export const repeatComponentFromArray = (array, jsxComponent) => {
    const JsxComponent = jsxComponent;
    return array.map((_, i) => (<JsxComponent i={i} key={'repeatComponentFromArray-hook-component-' + i} />))
};