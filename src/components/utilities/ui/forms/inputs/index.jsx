import {useEffect, useState} from "react";
import {useStringMatch} from "../../../../../hooks/string";
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

    longtext: {},

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

    [validated, setValidated] = useState(null);

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
            onUpdate((e.target?.value ?? ''));
            setValidated(validField(e));
            if ((e.target?.value ?? '') === '') {
                setValidated(null);
            }
          } else {
              onUpdate((e.target?.value ?? ''))
          }
          onInput(e);
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
                  onInput={handleInput}></textarea>
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

export const Text = props => (<Input type={'text'} {...props} />);

export const Number = props => (<Input type={'number'} {...props} />);

export const LongText = props => (<Input type={'textarea'} {...props} />);