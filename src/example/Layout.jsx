import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    main: {
        padding: '5px'
    }
});

export const Layout = ({ children }) => {
    const { main } = useStyles();

    return (
        <main className={main}>
            <h1>Layout</h1>

            {children}
        </main>
    );
};