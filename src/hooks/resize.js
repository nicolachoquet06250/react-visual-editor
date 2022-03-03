import { useState } from "react";

export const useResize = () => {
    const [sidebarClosed, setSidebarClosed] = useState(false);
    const [animating, setAnimating] = useState(false);

    return {
        animating,
        closed: sidebarClosed,

        onOpen() {
            setAnimating(true);
            setSidebarClosed(false);
        },
        onClose() {
            //setAnimating(false);
            setSidebarClosed(true);
        }
    }
};