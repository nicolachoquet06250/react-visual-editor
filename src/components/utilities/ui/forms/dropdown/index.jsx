import { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useFirstMountState } from 'react-use';
import {Button} from '../buttons';
import { FaIcon } from "../../../../../enums/icons";

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

    optionContainer: {
        position: 'absolute',
        transform: 'translate3d(0px, 30px, 0px)',
        top: 0,
        left: 0,
        willChange: 'transform'
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

export const useContextDropdown = () => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [dropdownLabel, setDropdownLabel] = useState('');

    return {
        Dropdown({label, value, onChange, children}) {
            const {dropdown, optionContainer} = useStyles();
            const options = useRef();

            useEffect(() => {
                (dropdownValue === '') && (() => {
                    setDropdownValue(value);
                    setDropdownLabel(label);
                })()
            }, [])

            const firstLoaded = useFirstMountState();

            useEffect(() => {
                !firstLoaded && (options.current.classList.contains('show') ? options.current.classList.remove('show') : options.current.classList.remove('show'));
                dropdownValue && onChange({
                    value: dropdownValue,
                    label: dropdownLabel
                });
            }, [dropdownValue])

            return (
                <div className={dropdown}>
                    <Button className={'dropdown-toggle'}
                            type={'button'}
                            data-toggle={'dropdown'}
                            aria-haspopup={'true'}
                            aria-expanded={'false'}
                            onClick={() => {
                                options.current.classList.contains('show') ? options.current.classList.remove('show') : options.current.classList.remove('show');
                            }}>
                        {dropdownLabel}

                        <i className={FaIcon.DROPDOWN_ARROW} />
                    </Button>

                    <div className={optionContainer + ` dropdown-menu`}
                         aria-labelledby={'dropdownMenuButton'} 
                         ref={options}>
                        {children}
                    </div>
                </div>
            );
        },

        Option({children, target}) {
            const {option} = useStyles();

            const handleClick = e => {
                e.preventDefault();

                setDropdownValue(target);
                setDropdownLabel(children);
            }

            console.log(children)

            return (
                <a href="#"
                   data-target={target}
                   onClick={handleClick}
                   className={option}>
                    {children}
                </a>
            );
        }
    }
};
