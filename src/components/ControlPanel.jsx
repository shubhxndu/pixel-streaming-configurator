import React from 'react';
import { Settings, Monitor, Send, RotateCcw, Palette, Zap } from 'lucide-react';

const ControlPanel = ({ 
  selectedColor, 
  onColorChange, 
  selectedRim, 
  onRimChange, 
  onStatFps, 
  onStatUnit, 
  onRestart, 
  customCommand, 
  setCustomCommand, 
  onCustomCommand 
}) => {
  
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Monitor className="text-blue-500" />
            Configurator Control
          </h1>
          <p className="text-sm text-neutral-500 mt-1">React Client for Pixel Streaming</p>
      </div>

      {/* Section 1: Paint Selection */}
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Palette size={16} /> Paint Selection
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {['Red', 'Blue', 'White', 'Black', 'Silver', 'Matte'].map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
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

      {/* Section 2: Rim Selection */}
      <section>
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Settings size={16} /> Rim Selection
        </h3>
        <div className="space-y-2">
          {['Stock', 'Sport V1', 'Carbon Fiber', 'Rally'].map((rim) => (
            <button
              key={rim}
              onClick={() => onRimChange(rim)}
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

      {/* Section 3: Engine Debug */}
      <section className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
         <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap size={16} /> Engine Debug
        </h3>
        <div className="flex gap-2 mb-4">
          <button 
            onClick={onStatFps}
            className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-xs font-mono"
          >
            stat fps
          </button>
          <button 
            onClick={onStatUnit}
            className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-xs font-mono"
          >
            stat unit
          </button>
        </div>
        <button 
          onClick={onRestart}
          className="w-full px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900 rounded text-xs flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> Restart Level
        </button>
      </section>

      {/* Section 4: Manual Command */}
      <section>
         <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
          Manual Interaction
        </h3>
        <form onSubmit={onCustomCommand} className="flex gap-2">
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
  );
};

export default ControlPanel;