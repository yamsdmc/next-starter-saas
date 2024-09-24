import {useEffect, useRef} from "react";

export const MODAL_ROOT_ID = 'modal-root'

/**
 * Custom hook to create and manage a portal element for modals
 *
 * @returns {HTMLElement | null} The portal element, or null if not yet created
 *
 * @example
 * function Modal({ children, isOpen }) {
 *   const portal = usePortal();
 *
 *   if (!portal || !isOpen) return null;
 *
 *   return ReactDOM.createPortal(
 *     <div className="modal">{children}</div>,
 *     portal
 *   );
 * }
 */
const usePortal = () => {
    const portalRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const existingRoot = document.getElementById('modal-root');
        if (existingRoot) {
            portalRef.current = existingRoot;
        } else {
            const div = document.createElement('div');
            div.id = MODAL_ROOT_ID;
            document.body.appendChild(div);
            portalRef.current = div;
        }

        return () => {
            if (!existingRoot && portalRef.current) {
                document.body.removeChild(portalRef.current as HTMLElement);
            }
        };
    }, []);

    return portalRef.current;
};

export default usePortal;