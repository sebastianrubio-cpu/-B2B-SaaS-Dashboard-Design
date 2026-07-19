import React from 'react';

export function ReportsView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiempo Promedio de Respuesta</p>
                <p className="text-2xl font-bold text-slate-900">1.8 segundos</p>
                <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-blue-600 rounded-full w-[85%]"></div></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasa de Errores (Ajuste Manual)</p>
                <p className="text-2xl font-bold text-slate-900">0.6%</p>
                <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full w-[94%]"></div></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documentos Procesados Totales</p>
                <p className="text-2xl font-bold text-slate-900">5,420 Items</p>
                <div className="h-2 w-full bg-slate-100 rounded-full"><div className="h-full bg-purple-500 rounded-full w-[70%]"></div></div>
            </div>
        </div>
    );
}