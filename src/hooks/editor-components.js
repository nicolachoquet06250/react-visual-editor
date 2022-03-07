import {useGlobalState} from "./context";

/**
 * @typedef {{ title: String, category: String, builderComponent: Function, uiComponent: Function, data: Record<string, any>, imagePreview: string, recursive: boolean }} CustomComponent
 * @typedef {CustomComponent[]} CustomComponentList
 * @typedef {Record<string, any>} CustomComponentData
 *
 * @returns {{
 * components: CustomComponentList,
 * pageComponents: CustomComponentList,
 * register: (component: CustomComponent) => void,
 * setData: (index: number, data: CustomComponentData) => void,
 * registerInPage: (title: string, defaultData: CustomComponentData) => void,
 * unregisterFromPage: (index: number) => void
 * }}
 */
export const useComponents = () => {
    const [state, dispatch] = useGlobalState();

    const setComponents = components => {
        if (dispatch) {
            dispatch({
                components: [...state.components, ...components]
            });
        }
    };

    const addComponent = component => {
        const slug = component.title.replace(/\ /g, '-').toLowerCase();

        setComponents([
            {
                ...component, 
                slug, 
                data: {
                    ...(component.data ?? {})
                }
            }
        ]);
    };

    const componentExists = component => state.components.map(c => c.title).indexOf(component.title) !== -1;

    const setPageComponents = (pageComponents) => {
        if (dispatch) {
            dispatch({
                pageComponents: [...pageComponents]
            });
        }
    }

    return {
        components: state.components,
        pageComponents: state.pageComponents,

        /**
         * @param {{builderComponent: (function()), data: {}, title: string, category: string, imagePreview: (function()), recursive: boolean, uiComponent: (function())}} component
         */
        register(component) {
            !componentExists(component) && addComponent(component);
        },

        setData(index, data) {
            setPageComponents(state.pageComponents.map((c, i) => {
                if (i === index) {
                    if (c.data) {
                        return { ...c, data: { ...c.data, ...data } }
                    }
                    return { ...c, data };
                }
                return c;
            }));
        },

        registerInPage(title, defaultData = {}) {
            const index = state.components.map(c => c.title).indexOf(title);

            setPageComponents([
                ...state.pageComponents,
                {
                    ...state.components[index], 
                    data: {
                        ...(state.components[index].data ?? defaultData)
                    }, 
                    opened: true
                }
            ]);
        },

        unregisterFromPage(index) {
            setPageComponents(state.pageComponents.reduce((r, c, i) => i === index ? r : [...r, c], []));
        }
    };
};
