import React from 'react';
import { CircleDashed } from 'lucide-react';

const StreamView = React.forwardRef(({ status }, ref) => {
    return (
        <div className="w-[70%] h-full relative bg-black flex items-center justify-center border-r border-neutral-800">
            <div ref={ref} className="w-full h-full" id="streamingVideo">
                {status !== 'active' && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-4 animate-pulse">
                            <CircleDashed size={48} className="mx-auto animate-spin text-blue-500" />
                            <p className="text-neutral-400">Establishing WebRTC Connection...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default StreamView;