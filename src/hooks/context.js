import {useContext} from 'react';
import {VisualEditorState, VisualEditorStateDispatcher} from "../context";

export const useGlobalState = () => [
    useContext(VisualEditorState),
    useContext(VisualEditorStateDispatcher)
];