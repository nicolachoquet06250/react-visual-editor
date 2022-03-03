import {createUseStyles} from 'react-jss';
import {useState, useReducer} from 'react';
import {VisualEditorSidebar} from './sidebar';
import {VisualEditorContent} from './content';
import {visualEditorState, VisualEditorState, VisualEditorStateDispatcher} from '../../context';

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
        transition: 'width .3s ease-out',
        '&.closed': {
            transition: 'width .3s ease-out',
            minWidth: 0,
            width: 0,
            transform: 'translateX(-10px)'
        }
    }),

    content: (props) => ({
        overflowY: 'auto',
        height: '100%',
        width: `calc(100% - ${props.cssResizerWidth ?? props.minSidebarWidth} - 1px)`
    })
});

export const VisualEditor = ({ layout, onSend }) => {
    const [closed, setClosed] = useState(false);

    const {visualEditor, sidebar, content} = useStyles({
        minSidebarWidth: closed ? '0px' : '300px',
        cssResizerWidth: closed ? '0px' : '300px'
    });

    const onOpen = () => {};
    const onClose = () => {};

    const [state, dispatch] = useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        visualEditorState
    );

    return (
        <VisualEditorState.Provider value={state}>
            <VisualEditorStateDispatcher.Provider value={dispatch}>
                <main className={visualEditor}>
                    <aside className={sidebar}>
                        <VisualEditorSidebar onOpen={onOpen} onClose={onClose} onSend={onSend} />
                    </aside>

                    <section className={content}>
                        <VisualEditorContent layout={layout} />
                    </section>
                </main>
            </VisualEditorStateDispatcher.Provider>
        </VisualEditorState.Provider>
    );
};