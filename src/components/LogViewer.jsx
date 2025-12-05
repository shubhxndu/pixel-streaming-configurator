import React from 'react';
import { Terminal } from 'lucide-react';

const LogViewer = ({ logs }) => {
  return (
    <div className="h-48 bg-black border-t border-neutral-800 p-4 font-mono text-xs overflow-y-auto">
      <div className="flex items-center gap-2 text-neutral-500 mb-2 sticky top-0 bg-black w-full pb-2 border-b border-neutral-900">
        <Terminal size={12} />
        <span>Event Log (Outgoing)</span>
      </div>
      <div className="space-y-1">
        {logs.length === 0 && <span className="text-neutral-700 italic">Waiting for interactions...</span>}
        {logs.map((log, i) => (
          <div key={i} className="break-all border-l-2 border-blue-900 pl-2 py-1 text-neutral-300">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;