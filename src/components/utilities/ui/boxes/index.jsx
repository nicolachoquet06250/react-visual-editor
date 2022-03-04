import {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {Container, Row, Col} from 'react-bootstrap';
import {Button} from "react-bootstrap";

const useStyles = createUseStyles({
    flexbox: ({justifyContent, alignItems, direction: flexDirection}) => ({
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems
    }),

    simplebox: ({pl, pr, pb, pt}) => ({
        width: '100%',
        height: '100%',

        '.pl': {
            paddingLeft: pl
        },

        '.pr': {
            paddingRight: pr
        },

        '.pb': {
            paddingBottom: pb
        },

        '.pt': {
            paddingTop: pt
        },

        '&:not(.pl, .pr, .pb, .pt)': {
            padding: '5px'
        },

        '.p0': {
            padding: '0!important'
        }
    })
});

export const FlexBox = ({children, justifyContent, alignItems, direction}) => {
    const {flexbox} = useStyles({justifyContent, alignItems, direction})

    return (
        <div className={flexbox}>
            {children}
        </div>
    );
};

export const Repeater = ({title, addLabel, value, onChange, voidModel, children}) => {
    const handleAdd = () => {
        onChange && onChange([
            ...value,
            voidModel
        ]);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h5>
                        {title}
                    </h5>
                </Col>
            </Row>

            {children}

            <Row>
                <Col style={{ textAlign: 'right' }}>
                    <Button variant={'outline-dark'} 
                            onClick={handleAdd} 
                            style={{ marginRight: 0 }}>
                        {addLabel}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export const SimpleBox = ({children, pl, pr, pb, pt, px, py, p0 = false}) => {
    const _pl = (px ?? pl) + 'px';
    const _pr = (px ?? pr) + 'px';
    const _pb = (py ?? pb) + 'px';
    const _pt = (py ?? pt) + 'px';

    const {simplebox} = useStyles({pl: _pl, pr: _pr, pb: _pb, pt: _pt})

    return (
        <div className={simplebox + ` ${!p0 && (!!pl || !!px) ? 'pl' : ''} ${!p0 && (!!pr || !!px) ? 'pr' : ''} ${!p0 && (!!pb || !!py) ? 'pb' : ''} ${!p0 && (!!pt || !!py) ? 'pt' : ''}`}>
            {children}
        </div>
    );
};
