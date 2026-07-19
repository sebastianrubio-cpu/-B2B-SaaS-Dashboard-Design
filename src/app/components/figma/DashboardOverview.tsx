import React, { useEffect, useState } from 'react';

export function DashboardOverview() {
    const [animatedOffset, setAnimatedOffset] = useState(251); // Circunferencia total del SVG (2 * PI * r)

    useEffect(() => {
        // Ejecuta la animación de llenado tras un breve retraso al cargar la página
        const timer = setTimeout(() => {
            // 251 * (1 - 0.71) = 72.79 (Representa el 71% de éxito validado según tu diseño)
            setAnimatedOffset(73); 
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gráfico 1: Daily Classification Volume (Mockup Lineal) */}
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm lg:col-span-2 flex flex-col justify-between h-72">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-900">Daily Classification Volume</h3>
                        <span className="text-xs text-slate-400">Last 7 days</span>
                    </div>
                    <div className="h-44 flex items-end justify-between px-4 border-b border-dashed border-slate-100 relative">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-100/60 -z-0"></div>
                        
                        {/* Simulación visual de barras delgadas o nodos del gráfico de Figma */}
                        <div className="flex flex-col items-center space-y-2 w-full justify-between h-full pt-6 relative z-10">
                            <div className="w-full flex items-end justify-between px-2 h-32">
                                <div className="w-2 bg-[#00529F] h-[40%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[55%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[65%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[48%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[85%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[30%] rounded-t"></div>
                                <div className="w-2 bg-[#00529F] h-[35%] rounded-t"></div>
                            </div>
                            <div className="w-full flex justify-between text-[11px] text-slate-400 font-medium px-1">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráfico 2: SENAE Status Distribution (Diagrama de Pastel Animado) */}
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-72">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-900">SENAE Status Distribution</h3>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-6 h-44">
                        {/* Contenedor del SVG del gráfico de dona/pastel */}
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Círculo base (Fondo gris) */}
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    className="stroke-slate-100" 
                                    strokeWidth="12" 
                                    fill="transparent" 
                                />
                                {/* Círculo animado (Representa las DAIs Validadas - Verde Emerald) */}
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    className="stroke-emerald-500 transition-all duration-1000 ease-out" 
                                    strokeWidth="12" 
                                    fill="transparent" 
                                    strokeDasharray="251" 
                                    strokeDashoffset={animatedOffset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* Texto informativo central */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-slate-800">71%</span>
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">Valid</span>
                            </div>
                        </div>

                        {/* Leyendas e indicadores laterales del Mockup */}
                        <div className="space-y-1.5 text-[11px] font-medium text-slate-600">
                            <div className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                                <span>Validated (71%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                                <span>Inspection (18%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
                                <span>Review (8%)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                                <span>Rejected (3%)</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}