import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function PixelifiedPokemon({ spriteOff, pixelSize }) {
    const canvasRef = useRef(null);
    // State pour le responsive
    const [dimensions, setDimensions] = useState({
        width: 376,
        height: 376
    });

    // Responsive
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 380) {
                setDimensions({
                    width: 260,
                    height: 260
                });
            } else if (window.innerWidth < 500) {
                setDimensions({
                    width: 320,
                    height: 320
                });
            } else if (window.innerWidth < 640) {
                setDimensions({
                    width: 376,
                    height: 376
                });
            } else {
                setDimensions({
                    width: 376,
                    height: 376
                });
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Custom pixelify effect
    useEffect(() => {
        if (!canvasRef.current || !spriteOff) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = spriteOff;

        img.onload = () => {
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;

            // Clear the canvas completely
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image to a temporary canvas to get pixel data
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = dimensions.width;
            tempCanvas.height = dimensions.height;
            tempCtx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

            // Now pixelate
            const size = Math.max(1, pixelSize);
            const offset = (size - (dimensions.width % size) / 2);

            for (let x = 0; x < dimensions.width + size; x += size) {
                for (let y = 0; y < dimensions.height + size; y += size) {
                    let xColorPick = x;
                    let yColorPick = y;

                    if (x >= dimensions.width) {
                        xColorPick = x - offset + 1;
                    }
                    if (y >= dimensions.height) {
                        yColorPick = y - offset + 1;
                    }

                    const rgba = tempCtx.getImageData(
                        Math.min(xColorPick, dimensions.width - 1),
                        Math.min(yColorPick, dimensions.height - 1),
                        1,
                        1
                    ).data;

                    // Only draw if not transparent
                    if (rgba[3] > 0) {
                        ctx.fillStyle = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3] / 255})`;
                        ctx.fillRect(
                            x - offset,
                            y - offset,
                            size,
                            size
                        );
                    }
                }
            }
        };
    }, [spriteOff, pixelSize, dimensions]);

    return (
        <div
            className="pixelify-wrapper"
            style={{
                width: dimensions.width,
                height: dimensions.height,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
}

PixelifiedPokemon.propTypes = {
    spriteOff: PropTypes.string.isRequired,
    pixelSize: PropTypes.number.isRequired
};