import {useCallback, useEffect, useState} from "react";

/**
 * @param {React.MutableRefObject<HTMLElement|null>} ref
 * @param {number} minWidth
 * @returns {{onClose(): void, onOpen(): void, animating: boolean, closed: boolean}}
 */
export const useResize = (ref, minWidth) => {
    const [sidebarClosed, setSidebarClosed] = useState(false);

    const [sidebarWidth, setSidebarWidth] = useState(minWidth);
    const [isResizing, setIsResizing] = useState(false);
    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);
    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);
    const resize = useCallback(
        mouseMoveEvent => {
            if (isResizing) {
                setSidebarWidth(mouseMoveEvent.x);
            }
        },
        [isResizing]
    );

    const resizeEvents = {
        set() {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        },
        unset() {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        }
    };

    const toggleResizeEvent = (type = 'set') => {
        type in resizeEvents && resizeEvents[type]();
    };

    useEffect(() => {
        toggleResizeEvent('set');
        return () => toggleResizeEvent('unset');
    }, [resize, stopResizing]);

    return {
        closed: sidebarClosed,
        sidebarWidth,

        onOpen() {
            setSidebarClosed(false);
        },
        onClose() {
            setSidebarClosed(true);
        },
        startResizing
    }
};