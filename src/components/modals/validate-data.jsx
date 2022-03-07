import { Modal } from "../utilities/ui/modals";
import { Button, Nav, Col, Container, Row } from "react-bootstrap";
import { Modals } from "../../enums";
import { FaIcon } from "../../enums/icons";
import { createUseStyles } from "react-jss";
import { useComponents } from "../../hooks";
import { JsonDebugger } from "../utilities/debug";
import {useModal} from '../../hooks/modal';

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

const ValidateDataModalHeader = () => (<h2>Validation des données</h2>);

const ValidateDataModalFooter = () => {
    const {close} = useModal(Modals.ValidateData);

    return (<Button variant={'outline-success'}
                    onClick={close}>
        <i className={FaIcon.CHECK} />
    </Button>)
};

export const ValidateDataModal = () => {
    const {modal} = useStyles();
    const {pageComponents: components} = useComponents();

    const data = components.map(c => ({ slug: c.slug, data: c.data }));

    return (<Modal  header={ValidateDataModalHeader} footer={ValidateDataModalFooter}
                    name={Modals.ValidateData}
                    className={modal}>
        <Container>
            <Row>
                <Col>
                    <JsonDebugger json={data} />
                </Col>
            </Row>
        </Container>
    </Modal>);
};

export const ValidateDataModalButton = ({onClick}) => {
    const {open} = useModal(Modals.ValidateData);

    const handleClick = () => {
        onClick && onClick();
        open();
    };

    return (
        <Button variant={'outline-dark'}
                onClick={handleClick}>
            <i className={FaIcon.SEND} />
        </Button>
    );
};