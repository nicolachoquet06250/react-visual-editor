import React, {useState} from 'react';
import {VisualEditorContent} from './content';
import {useStateReducer, VisualEditorState, VisualEditorStateDispatcher} from '../../context';
import {AddComponentModal} from "../modals/add-component";
import {ValidateDataModal} from "../modals/validate-data";
import {useWindowSize} from 'react-use';
import 'bootstrap/dist/css/bootstrap.min.css';
import {VisualEditorResizableSidebar} from "./sidebar/resizable";
import {useStyles} from "./style";
import {VisualEditorSidebar} from "./sidebar";

export const VisualEditor = ({ layout, registerer, onSend }) => {
    const Registerer = registerer;

    const {state, dispatch} = useStateReducer();

    const {height: pageHeight, width: pageWidth} = useWindowSize();

    const sidebarMinWidth = 300;
    const [sidebarWidth, setSidebarWidth] = useState(sidebarMinWidth);

    const styleProps = {
        minSidebarWidth: sidebarMinWidth + 'px',
        maxSidebarWidth: (pageWidth - 250) + 'px',
        cssResizerWidth: sidebarWidth + 'px',
        sidebarHeight: pageHeight + 'px'
    };

    const {visualEditor} = useStyles(styleProps);

    return (
        <VisualEditorState.Provider value={state}>
            <VisualEditorStateDispatcher.Provider value={dispatch}>
                {registerer && (<Registerer />)}

                <main className={visualEditor}>
                    <VisualEditorResizableSidebar minWidth={sidebarMinWidth}
                                                  onSend={onSend}
                                                  onSidebarWidthChange={setSidebarWidth}
                                                  sidebar={VisualEditorSidebar} />

                    <VisualEditorContent layout={layout}
                                         sidebarWidth={sidebarWidth}
                                         sidebarMinWidth={sidebarMinWidth} />
                </main>

                <AddComponentModal />
                <ValidateDataModal />
            </VisualEditorStateDispatcher.Provider>
        </VisualEditorState.Provider>
    );
};
