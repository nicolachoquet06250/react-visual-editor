import { useEffect } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    switch: {
        display: 'inline-block',
        width: '30px',
        height: '15px',
        borderRadius: '30px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid black',
        cursor: 'pointer',

        '& > input[type=checkbox]': {
            display: 'none'
        },

        '&::after': {
            content: '',
            display: 'block',
            width: '12px',
            height: '12px',
            borderRadius: '15px',
            transform: 'translateX(0)',
            transition: 'transform .2s ease-out',
            backgroundColor: 'black',
            border: '1px solid white'
        }
    }
});

export const Switch = ({value, onUpdate, onChange, children}) => {
    const {switch: switchStyle} = useStyles();

    const handleChange = () => {
        onUpdate(!value);
    };

    useEffect(() => {
        onChange(value);
    }, [value])

    return (<>
        <label className={{
            checked: value,
            switch: true
        }} className={switchStyle}>
            <input type='checkbox' value={value} onChange={handleChange} />

            <label onClick={toggleChecked}>
                {children}
            </label>
        </label>
    </>);
};