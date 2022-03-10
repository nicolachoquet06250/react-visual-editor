import {createUseStyles} from "react-jss";

export const useStyles = createUseStyles({
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
        minWidth: props.minSidebarWidth,
        maxWidth: 'calc(100% - 250px)',
        width: props.cssResizerWidth,
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
            transform: `translateX(-100%)`,

            '& ~ section': {
                width: `${props.pageWidth}px`,
                maxWidth: `${props.pageWidth}px`,
                height: '100vh',
                position: 'absolute',
                left: '0px'
            },

            '& > .sidebar-resizer': {
                display: 'none'
            }
        },

        '& > .sidebar-resizer': {
            position: 'absolute',
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

    content: props => ({
        overflowY: 'auto',
        height: '100%',
        width: `calc(100% - ${props.cssResizerWidth ?? props.minSidebarWidth} - 1px)`,
        minWidth: `calc(100% - ${props.maxSidebarWidth})`,
        transition: 'left .3s ease-out',
        left: props.cssResizerWidth,

        '& > main': {
            padding: '5px'
        }
    })
});