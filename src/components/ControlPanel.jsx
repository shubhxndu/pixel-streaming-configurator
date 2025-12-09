import React from 'react';
import { Terminal, Zap, Settings, Monitor, Send, RotateCcw, Palette, LogOut, ChevronUp, ChevronDown } from 'lucide-react';

const ControlPanel = ({
    logs,
    selectedColor,
    handleColorChange,
    selectedRim,
    handleRimChange,
    handleStatFps,
    handleRestartLevel,
    handleCustomCommand,
    customCommand,
    setCustomCommand,
    streamRef
}) => {
    const [showLogs, setShowLogs] = React.useState(false);

    const handleExit = () => {
        if (confirm("Are you sure you want to exit?")) {
            if (window.chrome && window.chrome.webview) {
                window.chrome.webview.postMessage("exit");
            } else {
                alert("Not running in WebView2 context.");
            }
        }
    };

    return (
        <div className="w-[15%] h-full flex flex-col bg-neutral-900 shadow-2xl z-10">
            {/* Header */}
            <div className="p-6 border-b border-neutral-800">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Monitor className="text-blue-500" />
                    Configurator Control
                </h1>
                <p className="text-sm text-neutral-500 mt-1">React Client for Pixel Streaming</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* Section 1: Configurator (emitUIInteraction) */}
                <section>
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Palette size={16} /> Paint Selection
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {['Red', 'Blue', 'White', 'Black', 'Silver', 'Matte'].map((color) => (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                className={`p-3 rounded-lg border text-sm transition-all ${selectedColor === color
                                    ? 'bg-blue-600 border-blue-500 text-white'
                                    : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-750 text-neutral-300'
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Settings size={16} /> Rim Selection
                    </h3>
                    <div className="space-y-2">
                        {['Stock', 'Sport V1', 'Carbon Fiber', 'Rally'].map((rim) => (
                            <button
                                key={rim}
                                onClick={() => handleRimChange(rim)}
                                className={`w-full p-3 flex justify-between items-center rounded-lg border text-sm transition-all ${selectedRim === rim
                                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                                    : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-750 text-neutral-300'
                                    }`}
                            >
                                <span>{rim}</span>
                                {selectedRim === rim && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Section 2: Engine Commands (emitConsoleCommand) */}
                <section className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Zap size={16} /> Engine Debug
                    </h3>
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={handleStatFps}
                            className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-xs font-mono"
                        >
                            stat fps
                        </button>
                        <button
                            onClick={() => streamRef.current?.emitConsoleCommand('stat unit')}
                            className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-xs font-mono"
                        >
                            stat unit
                        </button>
                    </div>
                    <button
                        onClick={handleRestartLevel}
                        className="w-full px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900 rounded text-xs flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={14} /> Restart Level
                    </button>
                </section>

                {/* Section 3: Custom Input */}
                <section>
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                        Manual Interaction
                    </h3>
                    <form onSubmit={handleCustomCommand} className="flex gap-2">
                        <input
                            type="text"
                            value={customCommand}
                            onChange={(e) => setCustomCommand(e.target.value)}
                            placeholder='Enter custom string...'
                            className="flex-1 bg-black border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 p-2 rounded text-white">
                            <Send size={16} />
                        </button>
                    </form>
                </section>

                {/* Section 4: System */}
                <section>
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Settings size={16} /> System
                    </h3>
                    <button
                        onClick={handleExit}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                        <LogOut size={16} />
                        Exit Application
                    </button>
                </section>
            </div>

            {/* Debug Logs Footer */}
            <div className={`transition-all duration-300 ease-in-out bg-black/80 border-t border-neutral-800 font-mono text-xs flex flex-col ${showLogs ? 'h-48' : 'h-10'}`}>
                <div
                    className="flex items-center justify-between p-3 cursor-pointer bg-black w-full hover:bg-neutral-900 transition-colors"
                    onClick={() => setShowLogs(!showLogs)}
                >
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Terminal size={12} />
                        <span>Event Log (Outgoing)</span>
                    </div>
                    {showLogs ? <ChevronDown size={14} className="text-neutral-500" /> : <ChevronUp size={14} className="text-neutral-500" />}
                </div>

                {showLogs && (
                    <div className="overflow-y-auto p-4 pt-0 space-y-1">
                        {logs.length === 0 && <span className="text-neutral-700 italic">Waiting for interactions...</span>}
                        {logs.map((log, i) => (
                            <div key={i} className="break-all border-l-2 border-blue-900 pl-2 py-1">
                                {log}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;
