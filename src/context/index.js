import {createContext} from 'react';

export const visualEditorState = {
    titles: [],
    components: [],
    pageComponents: [],
    modals: {}
};

export const VisualEditorState = createContext(visualEditorState);

export const VisualEditorStateDispatcher = createContext(undefined);