import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table';
import { Badge } from './components/ui/badge';
import { EndpointId, TabId } from '../types';
import { API_DATA_MOCK } from '../services/apiMockData';

// Importación de las sub-vistas modulares desacopladas de la UI
import { DashboardOverview } from './components/figma/DashboardOverview';
import { TariffClassifier } from './components/figma/TariffClassifier';
import { SecureVaultView } from './components/figma/SecureVaultView';
import { ApiDocumentationView } from './components/figma/ApiDocumentationView';
import { SettingsView } from './components/figma/SettingsView';

export default function App() {
    const [currentTab, setCurrentTab] = useState<TabId>('overview');
    const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>('classify');

    // Desacoplamiento total de estados de carga asíncronos para el entorno Mockup
    const isClassifying = false;
    const lastResult = null;
    const handleUpload = async (file: File) => {};

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased select-none">
            
            {/* 1. FIXED LEFT SIDEBAR (Fiel al Layout Corporativo de la Captura) */}
            <aside className="w-[260px] bg-[#00529F] text-white flex flex-col justify-between p-4 border-r border-blue-800 flex-shrink-0">
                <div>
                    {/* Identidad de Marca */}
                    <div className="mb-8 px-2 pt-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center font-bold text-sm">🗂️</div>
                            <h1 className="text-lg font-bold tracking-tight">TarifAI</h1>
                        </div>
                        <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold mt-1">SENAE • 2026</p>
                    </div>

                    {/* Menú de Navegación */}
                    <p className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest px-2 mb-2">Navigation</p>
                    <nav className="space-y-1">
                        <button 
                            onClick={() => setCurrentTab('overview')} 
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${currentTab === 'overview' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🎛️</span>
                            <span>Dashboard Overview</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('classifier')} 
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${currentTab === 'classifier' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">⚙️</span>
                            <span>AI Tariff Classifier</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('vault')} 
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${currentTab === 'vault' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🛡️</span>
                            <span>LOPDP Secure Vault</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('docs')} 
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${currentTab === 'docs' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">📄</span>
                            <span>API Documentation</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('settings')} 
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${currentTab === 'settings' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🛠️</span>
                            <span>Settings</span>
                        </button>
                    </nav>
                </div>

                {/* Estado del Sistema Inferior */}
                <div className="bg-blue-900/40 rounded-xl p-3 text-[11px] space-y-1.5 border border-blue-800/50 font-medium">
                    <p className="text-[9px] font-bold text-blue-300 uppercase tracking-wider">System Status</p>
                    <div className="flex justify-between items-center"><span className="text-blue-100">HS-2026 Engine</span><span className="text-emerald-400 font-semibold text-[10px]">Online</span></div>
                    <div className="flex justify-between items-center"><span className="text-blue-100">SENAE API</span><span className="text-emerald-400 font-semibold text-[10px]">Online</span></div>
                    <div className="flex justify-between items-center"><span className="text-blue-100">LOPDP Vault</span><span className="text-emerald-400 font-semibold text-[10px]">Online</span></div>
                </div>
            </aside>

            {/* MAIN CONTAINER WORKSPACE */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* 2. GLOBAL TOP HEADER (Exacto a la barra superior del Mockup) */}
                <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 z-10 flex-shrink-0">
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-sm font-bold text-slate-900">Dashboard Overview</h2>
                            <span className="text-[10px] text-slate-400 font-medium">HS-2026 / SENAE • Nandina</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Real-time operational summary — SENAE 2026 • Nandina.</p>
                    </div>
                    
                    {/* Controles de Perfil */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold space-x-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-slate-600">LIVE</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-900">María Fernández</p>
                            <p className="text-[10px] text-slate-400 font-semibold">Customs Broker • Broker Admin</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#00529F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            MF
                        </div>
                    </div>
                </header>

                {/* 3. DYNAMIC SCROLLABLE CANVAS */}
                <main className="flex-1 overflow-y-auto p-6 space-y-5">
                    
                    {/* METRIC CARDS GRID (Sincronizado al 100% con los datos fijos del Mockup) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col justify-between h-20">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">DAIs Processed</p>
                            <div className="flex justify-between items-baseline mt-1">
                                <span className="text-xl font-bold text-slate-900">1284</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12.4% ↗</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col justify-between h-20">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">AI Accuracy</p>
                            <div className="flex justify-between items-baseline mt-1">
                                <span className="text-xl font-bold text-slate-900">99.4%</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+0.2 pp ↗</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col justify-between h-20">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg. Class. Time</p>
                            <div className="flex justify-between items-baseline mt-1">
                                <span className="text-xl font-bold text-slate-900">1.8s</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-0.4s ↗</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col justify-between h-20">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">SENAE Compliance</p>
                            <div className="flex justify-between items-baseline mt-1">
                                <span className="text-xl font-bold text-slate-900">98.7%</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+1.1 pp ↗</span>
                            </div>
                        </div>
                    </div>

                    {/* VISTAS MODULARES DE CAPA DE PRESENTACIÓN */}
                    {currentTab === 'overview' && <DashboardOverview />}
                    {currentTab === 'vault' && <SecureVaultView />}
                    {currentTab === 'settings' && <SettingsView />}
                    {currentTab === 'classifier' && (
                        <TariffClassifier 
                            handleUpload={handleUpload} 
                            isClassifying={isClassifying} 
                            lastResult={lastResult} 
                        />
                    )}
                    {currentTab === 'docs' && (
                        <ApiDocumentationView 
                            activeEndpoint={activeEndpoint}
                            setActiveEndpoint={setActiveEndpoint}
                            endpointData={API_DATA_MOCK}
                        />
                    )}

                    {/* BASE DE DATOS ADUANERA MOCKUP (Aislada de la documentación) */}
                    {currentTab !== 'docs' && (
                        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                            <div className="px-5 py-3 border-b border-[#E2E8F0] bg-slate-50/60 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs">📋</span>
                                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Import Declarations</h3>
                                </div>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border">5 records</span>
                            </div>
                            
                            <Table>
                                <TableHeader className="bg-slate-50/40 border-b">
                                    <TableRow>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Operation ID</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Source Document</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Assigned Subheading</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">FOB Value</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Date</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Broker</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">SENAE Status</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">LOPDP Compliance</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-slate-100">
                                    {API_DATA_MOCK.tableOperations.map((op) => (
                                        <TableRow key={op.operation_id} className="hover:bg-slate-50/40 transition-colors">
                                            <TableCell className="font-mono text-xs text-blue-600 font-semibold p-3">{op.operation_id}</TableCell>
                                            <TableCell className="text-xs font-medium text-slate-600 p-3">
                                                <span className="mr-1.5">{op.source_document.endsWith('.pdf') ? '📕' : '📗'}</span>
                                                {op.source_document}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs font-bold text-slate-800 p-3">{op.assigned_subheading}</TableCell>
                                            <TableCell className="font-medium text-xs text-slate-600 p-3">
                                                ${op.fob_value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell className="text-xs font-semibold text-slate-400 p-3">{op.date}</TableCell>
                                            <TableCell className="text-xs font-medium text-slate-600 p-3">
                                                <div className="flex items-center space-x-1.5">
                                                    <div className="w-4 h-4 rounded-full bg-blue-100 text-[#00529F] flex items-center justify-center text-[8px] font-bold">MF</div>
                                                    <span>{op.assigned_broker}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-3">
                                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                                    op.senae_status === 'Validado' 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : op.senae_status === 'Under Review'
                                                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                        : 'bg-orange-50 text-orange-600 border-orange-200'
                                                }`}>
                                                    <span className={`w-1 h-1 rounded-full mr-1 ${op.senae_status === 'Validado' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                    {op.senae_status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="p-3">
                                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                                    op.lopdp_compliance === 'Encrypted Secure' 
                                                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                                        : 'bg-purple-50 text-purple-700 border-purple-200'
                                                }`}>
                                                    <span className={`w-1 h-1 rounded-full mr-1 ${op.lopdp_compliance === 'Encrypted Secure' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                                    {op.lopdp_compliance}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="p-3 border-t bg-slate-50/50 text-[10px] font-semibold text-slate-400">
                                Showing latest 5 of 5 records
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}