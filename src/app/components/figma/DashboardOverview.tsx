import React from 'react';

export function DashboardOverview() {
    return (
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm h-64 flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Daily Classification Volume</h3>
                <span className="text-xs text-slate-400">Last 7 days</span>
            </div>
            <div className="h-40 flex items-end justify-between px-4 border-b border-dashed border-slate-100 relative">
                <span className="text-xs text-slate-400">Mon</span>
                <span className="text-xs text-slate-400">Tue</span>
                <span className="text-xs text-slate-400">Wed</span>
                <span className="text-xs text-slate-400">Thu</span>
                <span className="text-xs text-slate-400">Fri</span>
                <span className="text-xs text-slate-400">Sat</span>
                <span className="text-xs text-slate-400">Sun</span>
            </div>
        </div>
    );
}