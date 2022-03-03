import {useEffect} from "react";
import {useGlobalState} from "./context";

/**
 * @param {string} name 
 * @returns {{opened: {}, register: (ref: import("react").MutableRefObject<HTMLElement>) => void, open: () => void, close: () => void}}
 */
export const useModal = (name) => {
    const [state, dispatch] = useGlobalState();

    const setModals = modals => {
        dispatch({
            ...state,
            modals
        })
    };

    return {
        opened: modals[name] ? modals[name].waiting : false,

        register(ref) {
            setModals({
                ...state.modals,
                [name]: {
                    ref,
                    waiting: true
                }
            });

            
            useEffect(() => {
                if (ref) {
                    setModals(Object.keys(modals).reduce((r, c) => {
                        if (c !== name) {
                            return {
                                ...r, [c]: modals[c]
                            }
                        }

                        return {
                            ...r, [c]: {
                                ...modals[c],
                                waiting: false
                            }
                        }
                    }))
                }
            }, [ref])
        },

        open() {
            if (!modals[name]?.waiting) {
                modals[name]?.ref.classList?.remove('closed');
            }
        },

        close() {
            if (!modals[name]?.waiting) {
                modals[name]?.ref.classList?.add('closed');
            }
        }
    }
};