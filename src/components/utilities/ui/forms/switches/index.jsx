import React from "react";
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
            content: "''",
            display: 'block',
            width: '12px',
            height: '12px',
            borderRadius: '15px',
            transform: 'translateX(0)',
            transition: 'transform .2s ease-out',
            backgroundColor: 'black',
            border: '1px solid white'
        },

        '&.checked::after': {
            transform: 'translateX(15px)'
        },

        '&::before': {
            content: "''",
            display: 'block',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            position: 'absolute',
            transform: 'translateX(-100%)',
            transition: 'transform .1s ease-out'
        },

        '&.checked::before': {
            transform: 'translateX(0)'
        }
    }
});

export const Switch = ({value, onChange, children}) => {
    const {switch: switchStyle} = useStyles();

    return (<>
        <label className={switchStyle + ` ${value ? 'checked' : ''} switch`}>
            <input type='checkbox' checked={value} onChange={onChange} />
        </label>

        {children && (
            <label onClick={onChange}>
                {children}
            </label>
        )}
    </>);
};
