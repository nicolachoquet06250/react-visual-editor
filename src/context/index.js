import {createContext, useReducer} from 'react';

export const visualEditorState = {
    components: [],
    pageComponents: [],
    modals: {}
};

export const VisualEditorState = createContext(visualEditorState);

export const VisualEditorStateDispatcher = createContext(undefined);

export const useStateReducer = () => {
    const [state, dispatch] = useReducer((state, newValue) => ({ ...state, ...newValue }), visualEditorState);
    return {state, dispatch};
};