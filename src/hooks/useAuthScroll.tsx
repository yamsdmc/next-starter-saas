import { useEffect, useRef } from 'react';

/**
 * A custom React hook that automatically scrolls a container to the bottom
 * when new messages are added.
 *
 * @template T The type of the messages array elements
 * @param {T[]} messages An array of messages or items that, when updated, should trigger a scroll
 * @returns {RefObject<HTMLDivElement>} A ref object to be attached to the scrollable container
 *
 * @example
 * function ChatComponent({ messages }) {
 *   const scrollRef = useAutoScroll(messages);
 *
 *   return (
 *     <div ref={scrollRef} style={{ height: '300px', overflowY: 'scroll' }}>
 *       {messages.map((msg, index) => (
 *         <div key={index}>{msg}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */
function useAutoScroll<T>(messages: T[]) {
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            if ("scrollTop" in contentRef.current) {
                contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }
        }
    }, [messages]);

    return contentRef;
}

export default useAutoScroll;
