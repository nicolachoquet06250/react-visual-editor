import {useEffect, useState} from "react";
import {useStringMatch} from "../../../../../hooks";
import {ValidateMoment} from '../../../../../enums/input-validator';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    simpleInput: {
        width: 'calc(100% - 11px)',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid black',

        '&:focus': {
            outline: '1px solid blue'
        },

        '&.invalid': {
            borderColor: 'red',

            '&:focus': {
                outline: '1px solid red'
            }
        },

        '&.valid': {
            borderColor: 'green',

            '&:focus': {
                outline: '1px solid green'
            }
        },
    },

    longtext: {
        width: 'calc(100% - 11px)',
        resize: 'vertical',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid black',

        '&:focus': {
            outline: '1px solid blue'
        },

        '&.invalid': {
            borderColor: 'red',

            '&:focus': {
                outline: '1px solid red'
            }
        },

        '&.valid': {
            borderColor: 'green',

            '&:focus': {
                outline: '1px solid green'
            }
        }
    },

    successMessage: {
        display: 'block',
        color: 'green'
    },

    errorMessage: {
        display: 'block',
        color: 'red'
    }
});

const Input = ({type, successMessage, errorMessage, onUpdate, onInput, value, validator, validOn, sent = false, placeholder = ''}) => {
    const {simpleInput, longtext, successMessage: successMessageStyle, errorMessage: errorMessageStyle} = useStyles();
    value = value ?? '';

    const [validated, setValidated] = useState(null);

    const SuccessMessage = successMessage;
    const ErrorMessage = errorMessage;

    const validField = e => {
        if (validator && validOn) {
            const v = (e && e.target?.value !== null && e.target?.value !== undefined) ? e.target?.value : value;

            return useStringMatch(validator, v.toString());
        }
        return true;
    };

    const handleInput = e => {
        if (validator && validOn === ValidateMoment.INPUT) {
            onUpdate && onUpdate((e.target?.value ?? ''));
            setValidated(validField(e));
            if ((e.target?.value ?? '') === '') {
                setValidated(null);
            }
        } else {
            onUpdate && onUpdate((e.target?.value ?? ''))
        }
        onInput && onInput(e);
    };

    useEffect(() => {
        if (validator && sent && validOn === ValidateMoment.SEND) {
            setValidated(validField());
            if (value.value === '') {
                setValidated(null);
            }
        }
    }, [sent]);

    if (type === 'textarea') {
        return (
            <textarea className={longtext + ` ${validated === false ? 'invalid' : ''} ${validated === true ? 'valid' : ''}`}
                  value={value}
                  placeholder={placeholder}
                  onInput={handleInput} />
        );
    }

    return (
        <>
            <input type={type ?? 'text'}
                   className={simpleInput + ` ${validated === false ? 'invalid' : ''} ${validated === true ? 'valid' : ''}`}
                   value={value}
                   placeholder={placeholder}
                   onInput={handleInput} />

            {validated === true && successMessage && (
                <div className={successMessageStyle + " message valid"}>
                    <SuccessMessage />
                </div>
            )}

            {validated === false && errorMessage && (
                <div className={errorMessageStyle + " message invalid"}>
                    <ErrorMessage />
                </div>
            )}
        </>
    );
};

/**
 * @param {{successMessage: JSX.Element, errorMessage: JSX.Element, onUpdate: Function, onInput: Function, value: string, validator?: RegExp, validOn: string, sent: boolean, placeholder: string}} props
 * @returns {JSX.Element}
 * @constructor
 */
export const Text = props => (<Input type={'text'} {...props} />);

/**
 * @param {{successMessage: JSX.Element, errorMessage: JSX.Element, onUpdate: Function, onInput: Function, value: string, validator?: RegExp, validOn: string, sent: boolean, placeholder: string}} props
 * @returns {JSX.Element}
 * @constructor
 */
export const Number = props => (<Input type={'number'} {...props} />);

/**
 * @param {{successMessage: JSX.Element, errorMessage: JSX.Element, onUpdate: Function, onInput: Function, value: string, validator?: RegExp, validOn: string, sent: boolean, placeholder: string}} props
 * @returns {JSX.Element}
 * @constructor
 */
export const LongText = props => (<Input type={'textarea'} {...props} />);
