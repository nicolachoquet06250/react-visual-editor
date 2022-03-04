import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },

    col: {
        margin: '2.5px',
        height: '100%',
        flex: 1
    }
});

export const Container = ({children}) => {
    const {container} = useStyles();

    return (
        <div className={container}>
            {children}
        </div>
    );
};

export const Row = ({children}) => {
    const {row} = useStyles();

    return (
        <div className={row}>
            {children}
        </div>
    );
};

export const Column = ({children}) => {
    const {column} = useStyles();

    return (
        <div className={column}>
            {children}
        </div>
    );
};

export const Col = ({children}) => {
    const {col} = useStyles();

    return (
        <div className={col}>
            {children}
        </div>
    );
};
