import React from 'react';
import { CustomsOperation } from '../../../types';

interface TariffClassifierProps {
    handleUpload: (file: File) => Promise<void>;
    isClassifying: boolean;
    lastResult: CustomsOperation | null;
}

export function TariffClassifier({ handleUpload, isClassifying, lastResult }: TariffClassifierProps) {
    
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Zona de Ingesta de Documentos (Izquierda) */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Document Ingestion</h3>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                        <input 
                            type="file" 
                            id="classifier-file"
                            className="hidden"
                            onChange={onFileChange}
                            disabled={isClassifying}
                        />
                        <label htmlFor="classifier-file" className={`block space-y-2 ${isClassifying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                            <div className="text-2xl">{isClassifying ? '🔄' : '📤'}</div>
                            <p className="text-sm font-medium text-slate-700">
                                {isClassifying ? 'Procesando analítica OCR...' : 'Drag & Drop your document here'}
                            </p>
                            <p className="text-xs text-slate-400">Supports PDF, XML and XLSX invoices</p>
                        </label>
                    </div>
                </div>
                
                {lastResult && (
                    <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100 font-mono">
                        ✓ Último archivo cargado con éxito: {lastResult.source_document}
                    </p>
                )}

                <label 
                    htmlFor="classifier-file"
                    className={`w-full text-center py-2.5 bg-[#00529F] hover:bg-blue-800 text-white font-medium rounded-lg text-sm transition-all block ${isClassifying ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isClassifying ? 'Analyzing Core Logic...' : '⚡ Process Document'}
                </label>
            </div>

            {/* Resultados en Tiempo Real del Motor de Inteligencia Artificial (Derecha) */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900">Live API Classification Results</h3>
                    {isClassifying && <span className="text-xs text-blue-600 font-medium animate-pulse">Consultando SENAE...</span>}
                </div>
                
                <div className="space-y-4">
                    <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Extracted Item Description</p>
                        <p className="text-sm font-mono bg-slate-50 p-3 rounded-lg mt-1 text-slate-700 border">
                            {isClassifying ? 'Extrayendo texto...' : lastResult ? `Análisis de: ${lastResult.source_document}` : 'Mixed distribution electronic components'}
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Assigned HS Subheading</p>
                        <div className="text-xl font-bold text-[#00529F] bg-blue-50 p-4 rounded-lg border border-blue-100 mt-1 flex justify-between items-center">
                            <span className="font-mono">{isClassifying ? '••••.••.••.••' : lastResult ? lastResult.assigned_subheading : '8537.10.00.00'}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full text-white font-semibold ${isClassifying ? 'bg-slate-400' : 'bg-emerald-500'}`}>
                                {isClassifying ? 'Calculando...' : '99.4% Match'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Automated Explanatory Notes</p>
                        <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50/50 p-3 rounded-lg border mt-1">
                            <p>• Clasificación automatizada bajo Reglas Generales de Interpretación 1 y 6 del SA.</p>
                            <p>• Sujeto a control posterior e inspección física automatizada según perfil de riesgo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}