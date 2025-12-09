import React, { useState, useRef, useCallback } from 'react';
import { Terminal, Zap, Settings, Monitor, Send, RotateCcw, Palette, Menu } from 'lucide-react';
import { PixelStreamingWrapper } from './components/PixelStreamingWrapper';
import ControlPanel from './components/ControlPanel';

const App = () => {
    const [logs, setLogs] = useState([]);
    const streamRef = useRef(null);

    // Configuration State
    const [selectedColor, setSelectedColor] = useState("Red");
    const [selectedRim, setSelectedRim] = useState("Stock");
    const [customCommand, setCustomCommand] = useState("");
    const [isControlPanelVisible, setIsControlPanelVisible] = useState(true);

    const toggleControlPanel = () => {
        setIsControlPanelVisible(!isControlPanelVisible);
    }

    // Helper to add logs to the UI
    const addLog = useCallback((type, data) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
        setLogs(prev => [`[${timestamp}] [${type}]: ${message}`, ...prev]);
    }, []);

    const onStreamInstance = (streaming) => {
        streamRef.current = streaming;

        streaming.addEventListener('videoInitialized', () => {
            addLog('System', 'WebRTC video Initialized');
        });

        streaming.addEventListener('webRtcConnected', () => {
            addLog('System', 'WebRTC connected');
        });

        streaming.addEventListener('webRtcFailed', () => {
            addLog('Error', 'WebRTC failed to connect');
        });

        streaming.addResponseEventListener('logListener', (data) => {
            addLog('UE5', data);
        });
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        if (!streamRef.current) return;
        const descriptor = { CarConfig: { Part: "BodyPaint", Value: color } };
        streamRef.current.emitUIInteraction(descriptor);
    };

    const handleRimChange = (rim) => {
        setSelectedRim(rim);
        if (!streamRef.current) return;
        const descriptor = { CarConfig: { Part: "Rims", Value: rim } };
        streamRef.current.emitUIInteraction(descriptor);
    };

    const handleStatFps = () => {
        if (!streamRef.current) return;
        streamRef.current.emitConsoleCommand("stat fps");
    };

    const handleCustomCommand = (e) => {
        e.preventDefault();
        if (!streamRef.current || !customCommand) return;
        streamRef.current.emitUIInteraction(customCommand);
        setCustomCommand("");
    };

    const handleRestartLevel = () => {
        if (!streamRef.current) return;
        const descriptor = { LoadLevel: "/Game/Maps/MainMap" };
        streamRef.current.emitUIInteraction(descriptor);
    }

    return (
        <div className="flex h-screen w-full bg-black text-white font-sans relative overflow-hidden">
            <div className="w-[85%] h-full relative">
                <PixelStreamingWrapper
                    initialSettings={{
                        AutoConnect: true,
                        AutoPlayVideo: true,
                        ss: 'ws://127.0.0.1:80',
                        StartVideoMuted: true,
                        HoveringMouse: true,
                    }}
                    onStreamInstance={onStreamInstance}
                />
            </div>

            <ControlPanel
                logs={logs}
                selectedColor={selectedColor}
                handleColorChange={handleColorChange}
                selectedRim={selectedRim}
                handleRimChange={handleRimChange}
                handleStatFps={handleStatFps}
                handleRestartLevel={handleRestartLevel}
                handleCustomCommand={handleCustomCommand}
                customCommand={customCommand}
                setCustomCommand={setCustomCommand}
                streamRef={streamRef}
                isVisible={true} // Always visible
            />
        </div>
    );
};

export default App;
