import React, { useEffect, useRef, useState } from 'react';
import {
    Config,
    PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.6';

export const PixelStreamingWrapper = ({ initialSettings, onStreamInstance }) => {
    const videoParent = useRef(null);
    const [pixelStreaming, setPixelStreaming] = useState(undefined);
    const [clickToPlayVisible, setClickToPlayVisible] = useState(false);

    useEffect(() => {
        if (videoParent.current) {
            const config = new Config({ initialSettings });
            const streaming = new PixelStreaming(config, {
                videoElementParent: videoParent.current
            });

            streaming.addEventListener('playStreamRejected', () => {
                setClickToPlayVisible(true);
            });

            setPixelStreaming(streaming);

            if (onStreamInstance) {
                onStreamInstance(streaming);
            }

            return () => {
                try {
                    streaming.disconnect();
                } catch(e) {
                    // This can sometimes throw an error if the connection is already closed.
                }
            };
        }
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative'
            }}
        >
            <div
                style={{ width: '100%', height: '100%' }}
                ref={videoParent}
            />
            {clickToPlayVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '1.5em'
                    }}
                    onClick={() => {
                        pixelStreaming?.play();
                        setClickToPlayVisible(false);
                    }}
                >
                    <div>Click to play</div>
                </div>
            )}
        </div>
    );
};
