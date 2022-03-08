import React, {useEffect, useRef} from "react";
import {useWindowSize} from "react-use";
import {useResize} from "../../../../hooks";
import {useStyles} from "../../style";

export const VisualEditorResizableSidebar = ({minWidth, onSend, onSidebarWidthChange, sidebar: sidebarComponent}) => {
    const Sidebar = sidebarComponent;

    const {height: pageHeight} = useWindowSize();

    /**
     * @type {React.MutableRefObject<HTMLElement|null>}
     */
    const sidebarRef = useRef(null);
    const {closed, sidebarWidth, startResizing, onOpen, onClose} = useResize(sidebarRef, minWidth);

    useEffect(() => {
        onSidebarWidthChange && onSidebarWidthChange(sidebarWidth)
    }, [sidebarWidth]);

    const {sidebar} = useStyles({
        minSidebarWidth: minWidth + 'px',
        cssResizerWidth: sidebarWidth + 'px',
        sidebarHeight: pageHeight + 'px'
    });

    return (<aside className={sidebar + ' ' + (closed ? 'closed' : '')}
                   ref={sidebarRef}
                   onMouseDown={e => e.preventDefault()}>
        {sidebar && (<Sidebar onOpen={onOpen} onClose={onClose} onSend={onSend}/>)}

        <div className={'sidebar-resizer'} onMouseDown={startResizing} />
    </aside>);
};