import {createUseStyles} from "react-jss";
import {FaIcon} from "../../../../../enums/icons";

const useStyles = createUseStyles({
    button: ({activeColor}) => ({
        cursor: 'pointer',
        padding: '5px',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        transition: 'background-color .2s ease-out, color .2s ease-out',
        marginRight: '5px',

        '&:hover': {
            backgroundColor: `${activeColor}!important`,
            color: 'white',
            outline: 'none'
        },
        '&:active': {
            backgroundColor: `${activeColor}!important`,
            color: 'white',
            outline: 'none'
        },
        '&:focus': {
            backgroundColor: `${activeColor}!important`,
            color: 'white',
            outline: 'none'
        },
        '&.active': {
            backgroundColor: `${activeColor}!important`,
            color: 'white',
            outline: 'none'
        },

        '&.circle': {
            width: '30px',
            height: '30px',
            borderRadius: '30px'
        },

        '&.no-border': {
            border: 'none'
        }
    })
});

export const Button = ({icon, circle, close, activeColor, noBorder, active, onClick, onMouseOver, onMouseOut, children, className}) => {
    activeColor = activeColor ?? 'black';

    const {button} = useStyles({ activeColor });

    const _icon = close ? FaIcon.CLOSE : icon;

    return (
        <button className={button + ` ${circle ?  'circle' : ''} ${noBorder ? 'no-border' : ''} ${active ? 'active' : ''} ${className ?? ''}`}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}>
            {_icon && <i className={_icon} />}

            {children}
        </button>
    );
};
