import {createUseStyles} from 'react-jss';
import {useState, useReducer} from 'react';
import {VisualEditorSidebar} from './sidebar';
import {VisualEditorContent} from './content';
import {visualEditorState, VisualEditorState, VisualEditorStateDispatcher} from '../../context';
import { AddComponentModal } from "../modals/add-component";

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

            '& + section': {
                width: '100%!important',
                height: '100vh',
                transform: `translateX(-${props?.minSidebarWidth ?? '0px'})`
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

    return (
        <VisualEditorState.Provider value={state}>
            <VisualEditorStateDispatcher.Provider value={dispatch}>
                <Registerer />

                <main className={visualEditor}>
                    <aside className={sidebar + ' ' + (closed ? 'closed' : '')}>
                        <VisualEditorSidebar onOpen={onOpen} onClose={onClose} onSend={onSend} />
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
