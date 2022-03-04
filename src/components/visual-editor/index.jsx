import {createUseStyles} from 'react-jss';
import {useState, useReducer, useRef, useEffect} from 'react';
import {VisualEditorSidebar} from './sidebar';
import {VisualEditorContent} from './content';
import {visualEditorState, VisualEditorState, VisualEditorStateDispatcher} from '../../context';
import { AddComponentModal } from "../modals/add-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMouse, useToggle, useWindowSize } from 'react-use';

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
        height: '100%',
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
                transform: `translateX(-${props?.minSidebarWidth ?? '0px'})`
            },

            '& > .sidebar-resizer': {
                display: 'none'
            }
        },

        '& > .sidebar-resizer': {
            position: 'absolute',
            //background: 'red',
            right: '0',
            top: 0,
            bottom: 0,
            width: '10px',
            transform: 'translateX(50%)',
            cursor: 'e-resize'
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
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [resizeState, setResizeState] = useState(false);
    const [sidebarWidthSaved, setSidebarWidthSaved] = useState(true);
    const [savedSidebarWidth, setSavedSidebarWidth] = useState(sidebarWidth)
    const {height: pageHeight, width: pageWidth} = useWindowSize();

    const {visualEditor, sidebar, content} = useStyles({
        minSidebarWidth: '300px', cssResizerWidth: '300px'
    });

    const onOpen = () => {
        setClosed(false);
    };
    const onClose = () => {
        setClosed(true)
    };

    const [state, dispatch] = useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        visualEditorState
    );

    const veRef = useRef();

    const sidebarRef = useRef();
    const {docX} = useMouse(veRef);

    /*useEffect(() => {
        if (resizeState) {
            setSidebarWidthSaved(false);
            console.log('savedSidebarWidth', savedSidebarWidth, 'docX', docX)
            setSidebarWidth(savedSidebarWidth + ((docX - savedSidebarWidth) * 2));
            if (sidebarWidth < 300) {
                setSidebarWidth(300);
            }
            console.log('sidebarWidth', sidebarWidth)
            console.log(docX)
        } else {
            if (!sidebarWidthSaved) {
                setSidebarWidthSaved(true);
                setSavedSidebarWidth(sidebarWidth);
                console.log('savedSidebarWidth', savedSidebarWidth)
            }
        }
    }, [docX]);*/

    return (
        <VisualEditorState.Provider value={state}>
            <VisualEditorStateDispatcher.Provider value={dispatch}>
                <Registerer />

                <main className={visualEditor} ref={veRef} onMouseUp={() => setResizeState(false)}>
                    <aside className={sidebar + ' ' + (closed ? 'closed' : '')}
                            style={{width: sidebarWidth + 'px', height: pageHeight + 'px'}}
                            ref={sidebarRef}>
                        <VisualEditorSidebar onOpen={onOpen} onClose={onClose} onSend={onSend} />

                        <div className={'sidebar-resizer'} 
                             onMouseDown={() => setResizeState(true)}></div>
                    </aside>

                    <section className={content}>
                        <VisualEditorContent layout={layout} />
                    </section>
                </main>

                <AddComponentModal />
            </VisualEditorStateDispatcher.Provider>
        </VisualEditorState.Provider>
    );
};
