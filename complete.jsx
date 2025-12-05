import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Car, Zap, Settings, Monitor, Send, RotateCcw, Palette, CircleDashed } from 'lucide-react';

/**
 * MOCK STREAM CONTROLLER
 * ----------------------
 * In a real application, you would import the PixelStreaming library from Epic Games.
 * Example: import { Config, PixelStreaming } from '@epicgames/pixel-streaming';
 * * This mock simulates the behavior so you can test your React logic flow
 * without needing the UE5 backend running immediately.
 */
class MockStreamController {
  constructor(logger) {
    this.logger = logger;
    this.logger("System", "Pixel Streaming Wrapper Initialized");
  }

  // Simulates emitCommand from your markdown
  emitCommand(descriptor) {
    this.logger("emitCommand", descriptor);
    // In production: this.stream.emitCommand(descriptor);
  }

  // Simulates emitConsoleCommand from your markdown
  emitConsoleCommand(command) {
    this.logger("emitConsoleCommand", `Sending console command: ${command}`);
    // In production: this.stream.emitConsoleCommand(command);
    
    // Simulating the internal wrapping described in your doc:
    // let descriptor = { ConsoleCommand: command };
    // this.emitCommand(descriptor);
  }

  // Simulates emitUIInteraction from your markdown
  emitUIInteraction(descriptor) {
    this.logger("emitUIInteraction", descriptor);
    // In production: this.stream.emitUIInteraction(descriptor);
  }
}

const App = () => {
  const [logs, setLogs] = useState([]);
  const [streamStatus, setStreamStatus] = useState("disconnected"); // disconnected, connecting, active
  const streamRef = useRef(null);
  
  // Configuration State
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedRim, setSelectedRim] = useState("Stock");
  const [customCommand, setCustomCommand] = useState("");

  // Helper to add logs to the UI
  const addLog = useCallback((type, data) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
    setLogs(prev => [`[${timestamp}] [${type}]: ${message}`, ...prev]);
  }, []);

  // Initialize the "Stream" (Mock)
  useEffect(() => {
    // Simulate connection delay
    setStreamStatus("connecting");
    setTimeout(() => {
      streamRef.current = new MockStreamController(addLog);
      setStreamStatus("active");
      addLog("System", "Connected to (Mock) Signaling Server");
    }, 1500);
  }, [addLog]);

  // --- ACTIONS ---

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (!streamRef.current) return;

    // As per your doc: passing an object to emitUIInteraction
    const descriptor = {
      CarConfig: {
        Part: "BodyPaint",
        Value: color
      }
    };
    streamRef.current.emitUIInteraction(descriptor);
  };

  const handleRimChange = (rim) => {
    setSelectedRim(rim);
    if (!streamRef.current) return;

    const descriptor = {
      CarConfig: {
        Part: "Rims",
        Value: rim
      }
    };
    streamRef.current.emitUIInteraction(descriptor);
  };

  const handleStatFps = () => {
    if (!streamRef.current) return;
    // As per doc: emitConsoleCommand for engine stats
    streamRef.current.emitConsoleCommand("stat fps");
  };

  const handleCustomCommand = (e) => {
    e.preventDefault();
    if (!streamRef.current || !customCommand) return;

    // Sending arbitrary string as UI Interaction
    streamRef.current.emitUIInteraction(customCommand);
    setCustomCommand("");
  };

  const handleRestartLevel = () => {
    if(!streamRef.current) return;
    // Example from your doc
    const descriptor = { LoadLevel: "/Game/Maps/MainMap" };
    streamRef.current.emitUIInteraction(descriptor);
  }

  return (
    <div className="flex h-screen w-full bg-neutral-900 text-white font-sans overflow-hidden">
      
      {/* --- LEFT: CANVAS AREA (70%) --- */}
      <div className="w-[70%] h-full relative bg-black flex items-center justify-center border-r border-neutral-800">
        
        {/* Placeholder for the actual <video> tag */}
        {streamStatus === 'active' ? (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center group">
             {/* This represents the UE5 Stream */}
             <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity">
                <Car size={64} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Unreal Engine Stream</h2>
                <p>1920 x 1080 | 60 FPS</p>
                <p className="text-sm mt-2 text-green-400">● Bitrate: 12 Mbps</p>
             </div>
             
             {/* Overlay UI Example (Floating stats) */}
             <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-xs text-green-400 font-mono pointer-events-none">
                FPS: 60.02<br/>
                Latency: 14ms
             </div>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-pulse">
            <CircleDashed size={48} className="mx-auto animate-spin text-blue-500" />
            <p className="text-neutral-400">Establishing WebRTC Connection...</p>
          </div>
        )}
      </div>

      {/* --- RIGHT: CONTROL MENU (30%) --- */}
      <div className="w-[30%] h-full flex flex-col bg-neutral-900 shadow-2xl z-10">
        
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
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    selectedColor === color 
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
                  className={`w-full p-3 flex justify-between items-center rounded-lg border text-sm transition-all ${
                    selectedRim === rim 
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
        </div>

        {/* Debug Logs Footer */}
        <div className="h-48 bg-black border-t border-neutral-800 p-4 font-mono text-xs overflow-y-auto">
          <div className="flex items-center gap-2 text-neutral-500 mb-2 sticky top-0 bg-black w-full">
            <Terminal size={12} />
            <span>Event Log (Outgoing)</span>
          </div>
          <div className="space-y-1">
            {logs.length === 0 && <span className="text-neutral-700 italic">Waiting for interactions...</span>}
            {logs.map((log, i) => (
              <div key={i} className="break-all border-l-2 border-blue-900 pl-2 py-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;