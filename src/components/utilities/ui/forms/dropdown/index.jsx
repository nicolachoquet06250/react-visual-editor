import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useToggle } from 'react-use';
import {Button} from '../buttons';

const useStyles = createUseStyles({
    dropdown: {
        position: 'relative',

        '& > .dropdown-toggle': {
            cursor: 'pointer',
            minWidth: '10rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        '& > .dropdown-menu': {
            zIndex: 1000,
            display: 'none',
            float: 'left',
            minWidth: '10rem',
            padding: '.5rem 0',
            margin: '.125rem 0 0',
            fontSize: '1rem',
            color: '#212529',
            textAlign: 'left',
            listStyle: 'none',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: '1px solid rgba(0,0,0,.15)',
            borderRadius: '.25rem',

            '&.show': {
                display: 'block',
                overflow: 'hidden'
            }
        }
    },

    option: {
        display: 'block',
        width: '100%',
        padding: '.25rem 1.5rem',
        clear: 'both',
        fontWeight: 400,
        color: '#212529',
        textAlign: 'inherit',
        whiteSpace: 'nowrap',
        backgroundColor: 'transparent',
        border: 0,
        textDecoration: 'none',

        '&:focus, &:hover': {
            color: '#16181b',
            textDecoration: 'none',
            backgroundColor: '#f8f9fa'
        }
    }
});

export const Dropdown = ({label, value, selected, onUpdate, onChange, children}) => {
    const {dropdown} = useStyles();
    const [opened, toggleOpened] = useToggle(false);

    return (
        <div className={dropdown}>
            <Button className={'dropdown-toggle'}
                    type={'button'}
                    data-toggle={'dropdown'}
                    aria-haspopup={'true'}
                    aria-expanded={'false'}
                    onClick={toggleOpened}>
                {label ?? value}

                <i className={'fa-solid fa-caret-down'}></i>
            </Button>

            <div className={`dropdown-menu ${opened ? 'show' : ''}`} aria-labeledby='dropdownMenuButton'
                 style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0; left: 0; will-change: transform;">
                {children}
            </div>
        </div>
    );
};

export const Option = ({children, target, onReady, onClick}) => {
    const {option} = useStyles();

    useEffect(() => {
        onReady(target);
    });

    const handleClick = () => {
        onClick(target);
    }

    return (
        <a href="#" data-target={target} onClick={e => {e.preventDefault(); handleClick()}} className={option}>
            {children}
        </a>
    );
};