import { Modal } from "../../utilities/ui/modals";
import { Button, Nav } from "react-bootstrap";
import { useComponents, useModal } from "../../../hooks";
import { Modals } from "../../../enums";
import { useContextTabs } from "../../utilities/ui/tabs";
import { FaIcon } from "../../../enums/icons";
import { Col, Container, Row } from "../../utilities/grid";
import { Fragment, useEffect, useState } from "react";
import { FlexBox } from "../../utilities/ui/boxes";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    modal: {
        '& [class^=container-]': {
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '15px',
            border: '1px solid #DEE2E6',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px'
        }
    }
});

const AddComponentModalHeader = () => (<h2>Ajouter un composant</h2>);

export const AddComponentModal = () => {
    const {modal} = useStyles();
    const {Tabs, Tab, Content} = useContextTabs();
    const {components, pageComponents, registerInPage} = useComponents();
    const [currentTab, setCurrentTab] = useState('all');
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
               name={Modals.AddComponent}
               className={modal}>

            <Nav justify variant="tabs" defaultActiveKey="all">
                {categoryList.map((cat, i) => (
                    <Nav.Item key={'nav-item-' + i}>
                        <Nav.Link href={cat.slug} 
                                  key={'tab-' + i} 
                                  onClick={e => {
                                      e.preventDefault(); 
                                      setCurrentTab(cat.slug)
                                  }}>
                            {cat.slug === 'all' ? (<i className={FaIcon.GLOBE} />) : cat.name}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            
            <Container>
                {componentList.map((row, j) => (
                    <Row key={'row-' + j}>
                        {row.map((component, i) => (
                            <Fragment key={'frag-' + i}>
                                {row.length === 1 && (<Col key={'col-' + i}>
                                    <Button variant={'outline-secondary'}
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
                                    <Button variant={'outline-secondary'}
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
                            </Fragment>
                        ))}
                    </Row>
                ))}
            </Container>
        </Modal>
    )
};

/**
 * @param {{icon: string, circle: boolean, close: boolean, activeColor: string, noBorder: boolean, active: boolean, onMouseOver: Function, onMouseOut: Function, children: Array|string, className: Object|string}} props
 * @returns {JSX.Element}
 * @constructor
 */
export const AddComponentModalButton = () => {
    const {open} = useModal(Modals.AddComponent);

    return (
        <Button variant={'outline-dark'} 
                size={'sm'} 
                onClick={open}>
            <i className={FaIcon.PLUS} />
        </Button>
    );
};
