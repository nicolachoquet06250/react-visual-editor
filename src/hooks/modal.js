import {useGlobalState} from "./context";

/**
 * @param {string} name
 * @returns {{opened: {}, register: () => void, open: () => void, close: () => void}}
 */
export const useModal = (name) => {
    const [state, dispatch] = useGlobalState();

    const setModals = modals => {
        if (dispatch) {
            dispatch({
                ...state,
                modals
            })
        }
    };

    if (!state.modals[name]) {
        setModals({
            ...state.modals,
            [name]: {
                opened: false
            }
        });
    }

    return {
        opened: (state.modals[name]?.opened ?? false),

        open() {
            setModals({
                ...state.modals,
                [name]: {
                    opened: true
                }
            });
        },

        close() {
            setModals({
                ...state.modals,
                [name]: {
                    opened: false
                }
            });
        }
    }
};
