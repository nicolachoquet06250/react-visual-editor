import {createUseStyles} from "react-jss";
import { useComponents } from "../../../hooks";

const useStyles = createUseStyles({
    main: {
        padding: '5px'
    }
});

export const VisualEditorContent = ({ layout }) => {
    const Layout = layout;

    const { main } = useStyles();

    const { pageComponents: components } = useComponents();

    const WithLayoutComponent = ({children}) => (
        <Layout>
            {children}
        </Layout>
    );
    const WithoutLayoutComponent = ({children}) => (
        <main className={main}>
            {children}
        </main>
    );

    const LayoutComponent = layout ? WithLayoutComponent : WithoutLayoutComponent;

    return (<LayoutComponent>
        {components.map(c => ({
            Component: c.uiComponent,
            data: c.data
        })).map(({Component, data}, i) => (
            <Component {...data} key={'custom-component-' + i} />
        ))}
    </LayoutComponent>);
};
