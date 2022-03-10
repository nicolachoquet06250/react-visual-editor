import React from "react";
import {useComponents} from "../../../hooks";
import {useStyles} from "../style";
import {useWindowSize} from "react-use";

export const VisualEditorContent = ({ layout, sidebarWidth, sidebarMinWidth }) => {
    const Layout = layout;
    const {width} = useWindowSize();

    const styleProps = {
        minSidebarWidth: sidebarMinWidth + 'px',
        maxSidebarWidth: (width - 250) + 'px',
        cssResizerWidth: sidebarWidth + 'px'
    };

    const {content} = useStyles(styleProps);

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
