import { useEffect } from "react";
import {useGlobalState} from "./context";

/**
 * @param {string} name
 * @returns {{opened: {}, register: () => void, open: () => void, close: () => void}}
 */
export const useModal = (name) => {
    const [state, dispatch] = useGlobalState();

    const setModals = modals => {
        dispatch({
            modals: {
                ...state.modals,
                ...modals
            }
        })
    };

    const modalExists = name => Object.keys(state.modals).indexOf(name) !== -1;

    useEffect(() => {
        if (!modalExists(name)) {
            setModals({
                [name]: {
                    opened: false
                }
            });
        }
    });

    return {
        opened: (state.modals[name]?.opened ?? false),

        open() {
            setModals({
                [name]: {
                    opened: true
                }
            });
        },

        close() {
            setModals({
                [name]: {
                    opened: false
                }
            });
        }
    }
};
