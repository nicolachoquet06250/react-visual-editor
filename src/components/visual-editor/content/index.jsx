import React from "react";
import {useComponents} from "../../../hooks";
import {useStyles} from "../style";

export const VisualEditorContent = ({ layout, sidebarWidth, sidebarMinWidth }) => {
    const Layout = layout;

    const {content} = useStyles({
        minSidebarWidth: sidebarMinWidth + 'px',
        cssResizerWidth: sidebarWidth + 'px'
    });

    const { pageComponents: components } = useComponents();

    const WithLayoutComponent = ({children}) => (<Layout>{children}</Layout>);
    const WithoutLayoutComponent = ({children}) => (<main>{children}</main>);

    const LayoutComponent = layout ? WithLayoutComponent : WithoutLayoutComponent;

    return (<section className={content}>
        <LayoutComponent>
            {components.map(c => ({
                Component: c.uiComponent,
                data: c.data
            })).map(({Component, data}, i) => (
                <Component {...data} key={'custom-component-' + i} />
            ))}
        </LayoutComponent>
    </section>);
};
