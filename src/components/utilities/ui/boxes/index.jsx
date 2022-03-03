import {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {Container, Row, Col} from '../../grid';
import {Button} from "../forms";

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

export const Repeater = ({title, addLabel, value, onUpdate, onChange, voidModel, child}) => {
    const [values, setValues] = useState((value ?? []));

    const handleAdd = () => {
        if (typeof voidModel === "object") {
            setValues([
                ...values,
                (voidModel instanceof Array ? [...voidModel] : {...voidModel})
            ]);
        } else {
            setValues([
                ...values,
                voidModel
            ]);
        }
        
        onUpdate(values);
        onChange(values);
    };

    useEffect(() => {
        setValues(value);
        onChange(values);
    }, [value])

    return (
        <Container>
            <Row>
                <Col>
                    <h5>
                        {title}
                    </h5>
                </Col>
            </Row>
            
            {values.map((_, i) => {
                const Child = child;
                return <Child i={i} onChange={onChange(values)} />
            })}
            
            <Row>
                <Col style={'display: flex; justify-content: flex-end'}>
                    <Button onClick={handleAdd}>
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
        <div className={{
            pl: !p0 && (!!pl || !!px),
            pr: !p0 && (!!pr || !!px),
            pb: !p0 && (!!pb || !!py),
            pt: !p0 && (!!pt || !!py),
            p0
        }} className={simplebox}>
            {children}
        </div>
    );
};