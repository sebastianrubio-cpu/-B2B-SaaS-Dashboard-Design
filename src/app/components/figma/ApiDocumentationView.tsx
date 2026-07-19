import React from 'react';
import { EndpointId, ApiDocContent } from '../../../types';

interface ApiDocumentationViewProps {
    activeEndpoint: EndpointId;
    setActiveEndpoint: (id: EndpointId) => void;
    endpointData: Record<EndpointId, ApiDocContent>;
}

export function ApiDocumentationView({ 
    activeEndpoint, 
    setActiveEndpoint, 
    endpointData 
}: ApiDocumentationViewProps) {
    return (
        <div className="space-y-6">
            
            {/* Bloque Superior: Base URL Referencia */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 font-bold text-slate-800 text-sm">
                        <span>🌐</span>
                        <span>API Reference — TarifAI v2026.3</span>
                    </div>
                    <div className="flex space-x-1.5">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">REST</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">JSON</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">TLS 1.3</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Base URL</span>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center font-mono text-sm text-slate-700">
                        <span>https://api.tarifai.senae.gob.ec/v1</span>
                        <button className="text-xs text-slate-400 hover:text-slate-600">📋 Copy</button>
                    </div>
                </div>
                <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <span>🔑</span>
                    <span>All endpoints require <strong>Authorization: Bearer &lt;token&gt;</strong> header. Rate limit: 500 req/min.</span>
                </p>
            </div>

            {/* Bloque Central: Tabla de Endpoints */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-[#E2E8F0] bg-slate-50/50 font-bold text-slate-800 text-sm">
                    <span>⚡</span> Endpoints
                </div>
                <div className="divide-y divide-slate-100">
                    <div 
                        onClick={() => setActiveEndpoint('classify')}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activeEndpoint === 'classify' ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-extrabold bg-blue-600 text-white w-12 text-center py-1 rounded">POST</span>
                            <span className="font-mono text-sm font-semibold text-slate-800">/v1/classify</span>
                            <span className="text-xs text-slate-500">Submit a document for HS tariff classification.</span>
                        </div>
                        <span className="text-[10px] font-bold border border-blue-200 text-blue-600 px-2 py-0.5 rounded bg-blue-50/30">Classifier</span>
                    </div>

                    <div 
                        onClick={() => setActiveEndpoint('result')}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activeEndpoint === 'result' ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-extrabold bg-emerald-600 text-white w-12 text-center py-1 rounded">GET</span>
                            <span className="font-mono text-sm font-semibold text-slate-800">/v1/result/:id</span>
                            <span className="text-xs text-slate-500">Retrieve classification result by job ID.</span>
                        </div>
                        <span className="text-[10px] font-bold border border-blue-200 text-blue-600 px-2 py-0.5 rounded bg-blue-50/30">Classifier</span>
                    </div>

                    <div 
                        onClick={() => setActiveEndpoint('validate')}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activeEndpoint === 'validate' ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-extrabold bg-blue-600 text-white w-12 text-center py-1 rounded">POST</span>
                            <span className="font-mono text-sm font-semibold text-slate-800">/v1/validate</span>
                            <span className="text-xs text-slate-500">Validate a subheading against SENAE NanDINA 2026.</span>
                        </div>
                        <span className="text-[10px] font-bold border border-amber-200 text-amber-700 px-2 py-0.5 rounded bg-amber-50/30">SENAE</span>
                    </div>

                    <div 
                        onClick={() => setActiveEndpoint('operations')}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activeEndpoint === 'operations' ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-extrabold bg-emerald-600 text-white w-12 text-center py-1 rounded">GET</span>
                            <span className="font-mono text-sm font-semibold text-slate-800">/v1/operations</span>
                            <span className="text-xs text-slate-500">List all DAI operations for the authenticated broker.</span>
                        </div>
                        <span className="text-[10px] font-bold border border-purple-200 text-purple-700 px-2 py-0.5 rounded bg-purple-50/30">Audit</span>
                    </div>

                    <div 
                        onClick={() => setActiveEndpoint('vault_id')}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activeEndpoint === 'vault_id' ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-extrabold bg-emerald-600 text-white w-12 text-center py-1 rounded">GET</span>
                            <span className="font-mono text-sm font-semibold text-slate-800">/v1/vault/:id</span>
                            <span className="text-xs text-slate-500">Retrieve LOPDP-encrypted document metadata.</span>
                        </div>
                        <span className="text-[10px] font-bold border border-teal-200 text-teal-700 px-2 py-0.5 rounded bg-teal-50/30">Vault</span>
                    </div>
                </div>
            </div>

            {/* Consolas Paralelas Laterales Inferiores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0B132B] rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                    <div className="px-4 py-2.5 bg-[#1C2541] flex justify-between items-center border-b border-slate-800 text-xs">
                        <span className="text-slate-300 font-medium">📄 Request Example</span>
                        <span className="text-slate-400 font-mono text-[10px]">cURL</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap">
                        {endpointData[activeEndpoint].curl}
                    </pre>
                </div>

                <div className="bg-[#0B132B] rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                    <div className="px-4 py-2.5 bg-[#1C2541] flex justify-between items-center border-b border-slate-800 text-xs">
                        <span className="text-slate-300 font-medium">⚙️ Response (200 OK)</span>
                        <span className="text-emerald-400 font-mono text-[10px] tracking-wider">JSON</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
                        {endpointData[activeEndpoint].response}
                    </pre>
                </div>
            </div>
        </div>
    );
}