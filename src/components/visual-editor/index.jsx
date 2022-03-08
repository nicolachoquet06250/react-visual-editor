import {createUseStyles} from 'react-jss';
import React, {useState, useReducer, useRef, useCallback, useEffect} from 'react';
import {VisualEditorSidebar} from './sidebar';
import {VisualEditorContent} from './content';
import {visualEditorState, VisualEditorState, VisualEditorStateDispatcher} from '../../context';
import { AddComponentModal } from "../modals/add-component";
import { ValidateDataModal } from "../modals/validate-data";
import { useWindowSize } from 'react-use';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useResize} from "../../hooks";

const useStyles = createUseStyles({
    visualEditor: {
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    sidebar: props => ({
        minWidth: props?.minSidebarWidth ?? '0px',
        width: props?.cssResizerWidth ?? props.minSidebarWidth,
        height: props.sidebarHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRight: '1px solid gray',
        position: 'relative',
        transition: 'transform .3s ease-out',
        zIndex: 2,
        '&.closed': {
            transform: 'translateX(-100%)',

            '& ~ section': {
                width: '100%!important',
                height: '100vh',
                transform: `translateX(-${props?.cssResizerWidth ?? '0px'})`
            },

            '& > .sidebar-resizer': {
                display: 'none'
            }
        },

        '& > .sidebar-resizer': {
            position: 'absolute',
            //background: 'red',
            right: '-5px',
            top: 0,
            bottom: 0,
            width: '10px',
            transform: 'translateX(50%)',
            cursor: 'col-resize',
            resize: 'horizontal',
            borderLeft: '0px solid darkgray',
            transition: 'border-left .1s ease-out',
            '&:hover': {
                borderLeft: '5px solid darkgray'
            }
        }
    }),

    content: (props) => ({
        overflowY: 'auto',
        height: '100%',
        width: `calc(100% - ${props.cssResizerWidth ?? props.minSidebarWidth} - 1px)`,
        transform: 'translateX(0px)',
        transition: 'transform .3s ease-out',
    })
});

export const VisualEditor = ({ layout, registerer, onSend }) => {
    const Registerer = registerer;

    const [closed, setClosed] = useState(false);
    const {height: pageHeight} = useWindowSize();

    /**
     * @type {React.MutableRefObject<HTMLElement|null>}
     */
    const sidebarRef = useRef(null);
    const sidebarMinWidth = 300;
    const {sidebarWidth, startResizing} = useResize(sidebarRef, sidebarMinWidth);

    const {visualEditor, sidebar, content} = useStyles({
        minSidebarWidth: sidebarMinWidth + 'px',
        cssResizerWidth: sidebarWidth + 'px',
        sidebarHeight: pageHeight + 'px'
    });

    const onOpen = () => {
        setClosed(false);
    };
    const onClose = () => {
        setClosed(true)
    };

    const [state, dispatch] = useReducer((state, newValue) => ({ ...state, ...newValue }), visualEditorState);

    return (
        <VisualEditorState.Provider value={state}>
            <VisualEditorStateDispatcher.Provider value={dispatch}>
                <Registerer />

                <main className={visualEditor}>
                    <aside className={sidebar + ' ' + (closed ? 'closed' : '')}
                            ref={sidebarRef}
                            onMouseDown={e => e.preventDefault()}>
                        <VisualEditorSidebar onOpen={onOpen} onClose={onClose} onSend={onSend} />

                        <div className={'sidebar-resizer'} onMouseDown={startResizing} />
                    </aside>

                    <section className={content}>
                        <VisualEditorContent layout={layout} />
                    </section>
                </main>

                <AddComponentModal />
                <ValidateDataModal />
            </VisualEditorStateDispatcher.Provider>
        </VisualEditorState.Provider>
    );
};
