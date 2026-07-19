import React, { useState } from 'react';
import { CustomsOperation } from '../../../types';

interface TariffClassifierProps {
    handleUpload: (file: File) => Promise<void>;
    isClassifying: boolean;
    lastResult: CustomsOperation | null;
}

export function TariffClassifier({ handleUpload, isClassifying, lastResult }: TariffClassifierProps) {
    const [invoiceUploaded, setInvoiceUploaded] = useState<boolean>(false);
    const [packingListUploaded, setPackingListUploaded] = useState<boolean>(false);
    const [mockResultVisible, setMockResultVisible] = useState<boolean>(false);
    const [simulating, setSimulating] = useState<boolean>(false);

    // Simulación interna del proceso de inferencia IA para el prototipo
    const handleStartAnalysis = () => {
        setSimulating(true);
        setTimeout(() => {
            setSimulating(false);
            setMockResultVisible(true);
        }, 1200);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ZONA IZQUIERDA: INGESTA ESTRUCTURADA (FACTURA Y PACKING LIST) */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-5 h-[340px]">
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Clasificación</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Selector 1: Factura */}
                        <div 
                            onClick={() => !simulating && setInvoiceUploaded(true)}
                            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                                invoiceUploaded 
                                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-700' 
                                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-500 cursor-pointer'
                            }`}
                        >
                            <span className="text-xl block mb-1">📄</span>
                            <span className="text-xs font-bold block">Subir Factura</span>
                            {invoiceUploaded && <span className="text-[10px] font-semibold mt-1 block text-emerald-600">✓ Cargado</span>}
                        </div>

                        {/* Selector 2: Packing List */}
                        <div 
                            onClick={() => !simulating && setPackingListUploaded(true)}
                            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                                packingListUploaded 
                                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-700' 
                                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 text-slate-500 cursor-pointer'
                            }`}
                        >
                            <span className="text-xl block mb-1">📦</span>
                            <span className="text-xs font-bold block">Subir Packing List</span>
                            {packingListUploaded && <span className="text-[10px] font-semibold mt-1 block text-emerald-600">✓ Cargado</span>}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleStartAnalysis}
                    disabled={simulating || (!invoiceUploaded && !packingListUploaded)}
                    className="w-full py-2.5 bg-[#00529F] hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all"
                >
                    {simulating ? '🔄 Analizando Documentos...' : '⚡ Analizar'}
                </button>
            </div>

            {/* ZONA DERECHA: RESULTADO IA INTERACTIVO */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-[340px]">
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resultado IA</h3>
                        {mockResultVisible && !simulating && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                                Optimizado
                            </span>
                        )}
                    </div>

                    {simulating ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <span className="text-2xl animate-spin">🔄</span>
                            <p className="text-xs font-medium text-slate-500">Modelos de lenguaje extrayendo texto bajo reglas OMA...</p>
                        </div>
                    ) : mockResultVisible ? (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Producto:</p>
                                <p className="font-bold text-slate-800 mt-0.5">Laptop Dell</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confianza:</p>
                                <p className="font-bold text-emerald-600 mt-0.5 text-sm">97%</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subpartida sugerida:</p>
                                <p className="font-mono font-bold text-[#00529F] text-base mt-0.5 bg-blue-50/50 px-2 py-1 rounded border border-blue-100 inline-block">
                                    8471.30.00
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Normativa aplicada:</p>
                                <div className="space-y-0.5 font-bold text-emerald-700 text-[11px]">
                                    <p className="flex items-center">✔ Arancel Nacional</p>
                                    <p className="flex items-center">✔ COMEX</p>
                                    <p className="flex items-center">✔ OMA</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <span className="text-2xl opacity-40">📊</span>
                            <p className="text-xs text-slate-400 font-medium mt-2 max-w-[240px]">
                                Cargue documentos a la izquierda y presione Analizar para desplegar la inferencia aduanera.
                            </p>
                        </div>
                    )}
                </div>

                {mockResultVisible && !simulating && (
                    <button className="w-full py-2 border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors">
                        💾 Descargar PDF
                    </button>
                )}
            </div>

        </div>
    );
}