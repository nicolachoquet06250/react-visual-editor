import './index.css';
import React from "react";
import {createUseStyles} from 'react-jss';
import {FaIcon} from '../../../enums/icons';
import { useComponents } from '../../../hooks';
import { useToggle } from 'react-use';
import { AddComponentModalButton } from "../../modals/add-component";
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useEventHandler, useSimpleHandler } from "../../../hooks/handlers";
import {ValidateDataModalButton} from '../../../components/modals/validate-data';

const useStyles = createUseStyles({
    header: {
        height: '40px',
        width: '100%',
        borderBottom: '1px solid lightblue',

        '& > div': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '5px',
            height: '100%'
        },

        '& button': {
            transition: 'background-color .2s ease-out, opacity .2s ease-out'
        }
    },

    openCloseButton: {
        border: '1px solid black',
        position: 'absolute',
        top: '5px',
        right: 0,
        opacity: 0,
        transition: 'opacity .5s ease-out',
        background: 'rgba(255, 255, 255, .3)',
        transform: 'translateX(calc(100% + 10px))',

        '&:hover': {  opacity: 1 },

        '&.close': { transform: 'translateX(calc(100% + 15px))' }
    },

    main: {
        height: 'calc(100% - 90px)',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '5px'
    },

    footer: {
        height: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTop: '1px solid lightblue',

        '& button': {
            marginRight: '5px'
        }
    }
});

export const VisualEditorSidebar = ({onClose, onOpen, onSend}) => {
    const {pageComponents: components, togglePageComponentOpen, setData, unregisterFromPage: unregisterComponent} = useComponents();

    const {header, main, footer, openCloseButton} = useStyles();

    const [isOpened, toggleOpened] = useToggle(true);

    const handleToggleSidebar = e => {
        e.stopPropagation();

        isOpened ? onClose() : onOpen();
        toggleOpened();
    };

    const handleSend = () => {
        onSend && onSend({
            data: components.reduce((r, c) => [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], [])
        });
    };

    const sendComponentData = useEventHandler((e, i) => setData(i, e.data));

    const handleDeleteComponent = useSimpleHandler(unregisterComponent);

    const handleExport = () => {
        const data = components.reduce((r, c) => [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], []);
        const _data = JSON.stringify(data)
        const blob = new Blob([_data], {type: 'text/plain'})
        const a = document.createElement('a');
        a.download = "page-data.json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.dispatchEvent(new MouseEvent('click', { cancelable: false }));
    };

    const getParentWithClass = (className, root) => {
        return root?.parentElement?.classList?.contains(className) ?
            root?.parentElement : getParentWithClass(className, root?.parentElement);
    };

    const toggleOpenCard = i => e => {
        e.preventDefault();
        e.stopPropagation();

        togglePageComponentOpen(i);
    };

    return (
        <>
            <header className={header}>
                <div>
                    <AddComponentModalButton />
                </div>

                <Button className={openCloseButton + ` ${isOpened ? 'open' : 'close'}`}
                        variant={'outline-dark'}
                        onClick={handleToggleSidebar}>
                    <i className={isOpened ? FaIcon.LOCK : FaIcon.LOCK_OPEN} />
                </Button>
            </header>

            <main className={main}>
                {components.map((builderComponent, i) => {
                    return (
                        <Card key={'builder-component-' + i} style={{marginBottom: '5px'}}>
                            <Card.Header>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Card.Title>
                                                {builderComponent.title}
                                            </Card.Title>
                                        </Col>
                                        <Col sm={2} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <Button variant={'outline-dark'}
                                                    onClick={toggleOpenCard(i)}>
                                                <i className={builderComponent.opened ? FaIcon.ARROW_UP : FaIcon.ARROW_DOWN} />
                                            </Button>
                                        </Col>
                                        <Col sm={2} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <Button variant={'danger'}
                                                    onClick={handleDeleteComponent(i)}>
                                                <i className={FaIcon.TRASH} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>

                            <Card.Body style={{ padding: '5px', display: (builderComponent.opened ? 'inherit' : 'none') }}>
                                {(() => {
                                    const Component = builderComponent.builderComponent;

                                    return (<Component {...builderComponent.data} onSend={sendComponentData(i)} />);
                                })()}
                            </Card.Body>
                        </Card>
                    );
                })}
            </main>

            <footer className={footer}>
                <Button variant={'outline-dark'}
                        onClick={handleExport}>
                    <i className={FaIcon.EXPORT} /> Export
                </Button>

                <ValidateDataModalButton onClick={handleSend} />
            </footer>
        </>
    )
};
