import React, { useState, useRef, useCallback } from 'react';

interface ImageZoomHookResult {
    isZoomed: boolean;
    position: { x: number; y: number };
    containerRef: React.RefObject<HTMLElement>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Custom hook for implementing image zoom functionality
 *
 * @returns {ImageZoomHookResult} An object containing state and handlers for image zoom
 *
 * @example
 * function ZoomableImage({ src }) {
 *   const { isZoomed, position, containerRef, handleMouseEnter, handleMouseLeave, handleMouseMove } = useImageZoom();
 *
 *   return (
 *     <div
 *       ref={containerRef}
 *       onMouseEnter={handleMouseEnter}
 *       onMouseLeave={handleMouseLeave}
 *       onMouseMove={handleMouseMove}
 *       style={{ overflow: 'hidden', position: 'relative' }}
 *     >
 *       <img
 *         src={src}
 *         style={{
 *           transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
 *           transform: isZoomed ? 'scale(2)' : 'scale(1)',
 *           transition: 'transform 0.3s ease-out',
 *         }}
 *       />
 *     </div>
 *   );
 * }
 */
export const useImageZoom = (): ImageZoomHookResult => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLElement | null>(null);

    const handleMouseEnter = useCallback(() => setIsZoomed(true), []);
    const handleMouseLeave = useCallback(() => setIsZoomed(false), []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = (containerRef.current as any).getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setPosition({ x, y });
    }, []);

    return {
        isZoomed,
        position,
        containerRef,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
    };
};