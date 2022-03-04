import { Modal } from "../../utilities/ui/modals";
import { Button } from "../../utilities/ui/forms";
import { useComponents, useModal } from "../../../hooks";
import { Modals } from "../../../enums";
import { useContextTabs } from "../../utilities/ui/tabs";
import { FaIcon } from "../../../enums/icons";
import { Col, Container, Row } from "../../utilities/grid";
import { Fragment, useEffect, useState } from "react";
import { FlexBox } from "../../utilities/ui/boxes";

const AddComponentModalHeader = () => (<h2>Ajouter un composant</h2>);

export const AddComponentModal = () => {
    const {Tabs, Tab, Content} = useContextTabs();
    const {components, pageComponents, registerInPage} = useComponents();
    const [currentTab, setCurrentTab] = useState('');
    const {close} = useModal(Modals.AddComponent);

    const categoryList = [
        {
            slug: 'all',
            name: 'All'
        },
        ...components.reduce((r, c) =>
            r.reduce((r, c) => [...r, c.slug], []).indexOf((c.category.replace(/\ /g, '-').toLowerCase() ?? '')) === -1 ?
                [
                    ...r,
                    {
                        slug: (c.category.replace(/\ /g, '-').toLowerCase() ?? ''),
                        name: c.category
                    }
                ] : r,
                []
            )
    ];
    const componentList = [...(() => {
        const tmp = [];
        let cmp = 0;
        for (const component of components) {
            if (currentTab === 'all' || component.category.replace(/\ /g, '-').toLowerCase() === currentTab) {
                if (cmp === 0) {
                    tmp.push([component]);
                    cmp++;
                } else if (cmp < 3) {
                    const last = tmp.pop();
                    tmp.push([...(last ?? []), component]);
                    cmp++;
                } else {
                    const last = tmp.pop();
                    tmp.push([...(last ?? []), component]);
                    cmp = 0;
                }
            }
        }
        return tmp;
    })()];

    const createComponent = title => {
        registerInPage(title);

        close()
    }

    return (
        <Modal header={() => <AddComponentModalHeader />}
               name={Modals.AddComponent}>
            <Tabs onChange={setCurrentTab}>
                {categoryList.map((cat, i) => (
                    <Tab target={cat.slug}
                         key={'tab-' + i}
                         icon={cat.slug === 'all' ? FaIcon.GLOBE : false}>
                        {cat.name}
                    </Tab>
                ))}

                <Content>
                    <Container>
                        {componentList.map((row, j) => (
                            <Row key={'row-' + j}>
                                {row.map((component, i) => (
                                    <Fragment key={'frag-' + i}>
                                        {row.length === 1 && (<Col key={'col-' + i}>
                                            <Button activeColor={'rgba(0, 0, 0, .5)'}
                                                    onMouseOver={e => e.target.querySelector('img') && (e.target.querySelector('img').style.height = '55px')}
                                                    onMouseOut={e => e.target.querySelector('img') && (e.target.querySelector('img').style.height = '50px')}
                                                    onClick={() => createComponent(component.title)}>
                                                <FlexBox direction={'column'}
                                                         justifyContent={'space-between'}
                                                         alignItems={'center'}>
                                                    <img src={component.imagePreview}
                                                         alt={`component "${component.title}" preview`}
                                                         style={{height: '50px', transition: 'height .2s ease-out'}}
                                                         onMouseOver={e => e.target && (e.target.style.height = '55px')}
                                                         onMouseOut={e => e.target && (e.target.style.height = '55px')} />

                                                    {component.title}
                                                </FlexBox>
                                            </Button>
                                        </Col>)}

                                        {row.length > 1 && (<Col>
                                            <Button noBorder={true}
                                                    activeColor={'rgba(0, 0, 0, .5)'}
                                                    onMouseOver={e => e.target.querySelector('img') && (e.target.querySelector('img').style.height = '55px')}
                                                    onMouseOut={e => e.target.querySelector('img') && (e.target.querySelector('img').style.height = '50px')}
                                                    onClick={() => createComponent(component.title)}>
                                                <FlexBox direction={'column'}
                                                         justifyContent={'space-between'}
                                                         alignItems={'center'}>
                                                    <img src={component.imagePreview}
                                                         alt={`component "${component.title}" preview`}
                                                         onMouseOver={e => e.target && (e.target.style.height = '55px')}
                                                         onMouseOut={e => e.target && (e.target.style.height = '55px')} />

                                                    {component.title}
                                                </FlexBox>
                                            </Button>
                                        </Col>)}
                                    </Fragment>
                                ))}
                            </Row>
                        ))}
                    </Container>
                </Content>
            </Tabs>

            <div>
                toto
            </div>
        </Modal>
    )
};

/**
 * @param {{icon: string, circle: boolean, close: boolean, activeColor: string, noBorder: boolean, active: boolean, onMouseOver: Function, onMouseOut: Function, children: Array|string, className: Object|string}} props
 * @returns {JSX.Element}
 * @constructor
 */
export const AddComponentModalButton = (props) => {
    const {open} = useModal(Modals.AddComponent);

    return (
        <Button onClick={open} {...props}>
            {props.children}
        </Button>
    );
};
