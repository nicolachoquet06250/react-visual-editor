import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    main: {
        padding: '5px'
    }
});

export const VisualEditorContent = ({ layout }) => {
    const Layout = layout;

    const { main } = useStyles();

    const LayoutComponent = () => (
        <Layout>
            coucou
        </Layout>
    );
    const NotLayoutComponent = () => (
        <main className={main}>
            coucou
        </main>
    );

    const Component = layout ? LayoutComponent : NotLayoutComponent;

    return (<Component />);
};