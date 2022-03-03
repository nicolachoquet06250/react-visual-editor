import { useState } from "react";
import {useGlobalState} from "./context";

/**
 * 
 * @returns {{
 *      components: { title: String, category: String, builderComponent: import("react").ComponentElement, uiComponent: import("react").ComponentElement, data: Record<string, any>, imagePreview: string }[], 
 *      pageComponents: { title: String, category: String, builderComponent: import("react").ComponentElement, uiComponent: import("react").ComponentElement, data: Record<string, any>, imagePreview: string }[],
 *      register: (component: { title: String, category: String, builderComponent: import("react").ComponentElement, uiComponent: import("react").ComponentElement, data: Record<string, any>, imagePreview: string }) => void,
 *      setData(index: number, data: Record<string, any>) => void,
 *      registerInPage: (title: string, defaultData: Record<string, any>) => void,
 *      unregisterFromPage: (index: number) => void
 * }}
 */
export const useComponents = () => {
    const [state, dispatch] = useGlobalState();

    const setComponents = (components) => {
        dispatch({
            ...state,
            components
        });
    };

    const setTitles = (titles) => {
        dispatch({
            ...state,
            titles
        })
    }

    const setPageComponents = (pageComponents) => {
        dispatch({
            ...state,
            pageComponents
        })
    }

    return {
        components: state.components,
        pageComponents: state.pageComponents,
    
        register(component) {
            if (state.components.titles.indexOf(component.title) === -1) {
                const slug = component.title.replace(/\ /g, '-').toLowerCase();
    
                setComponents({
                    titles: [...state.titles, component.title],
                    components: [...state.components, { ...component, slug, data: { ...(component.data ?? {}) } }]
                });
            }
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
            setPageComponents([
                ...state.pageComponents,
                { ...state.components[state.titles.indexOf(title)], data: { ...(state.components[state.titles.indexOf(title)].data ?? defaultData) } }
            ]);
        },
        
        unregisterFromPage(index) {
            setPageComponents(state.pageComponents.reduce((r, c, i) => i === index ? r : [...r, c], []));
        }
    };
};