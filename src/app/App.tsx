import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table';
import { Badge } from './components/ui/badge';
import { EndpointId, TabId, CustomsOperation } from '../types';
import { API_DATA_MOCK } from '../services/apiMockData';

// Importación de las sub-vistas modulares desacopladas de la UI por capas
import { DashboardOverview } from './components/figma/DashboardOverview';
import { TariffClassifier } from './components/figma/TariffClassifier';
import { SecureVaultView } from './components/figma/SecureVaultView';
import { ApiDocumentationView } from './components/figma/ApiDocumentationView';
import { SettingsView } from './components/figma/SettingsView';
import { PublicModuleViews } from './components/figma/PublicModuleViews';
import { ReportsView } from './components/figma/ReportsView';
import { AdminModuleViews } from './components/figma/AdminModuleViews';

export default function App() {
    const [currentTab, setCurrentTab] = useState<TabId>('overview');
    const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>('classify');

    // Desacoplamiento total de estados de carga asíncronos para el entorno Mockup interactivo
    const isClassifying = false;
    const lastResult = null;
    const handleUpload = async (file: File) => {};

    // Determina si la pestaña actual pertenece al flujo público
    const isPublicTab = ['inicio', 'nosotros', 'planes', 'contacto', 'login'].includes(currentTab);

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased select-none">
            
            {/* 1. FIXED LEFT SIDEBAR (Jerarquía optimizada de pantallas) */}
            <aside className="w-[260px] bg-[#00529F] text-white flex flex-col justify-between p-4 border-r border-blue-800 flex-shrink-0 overflow-y-auto">
                <div className="space-y-5">
                    {/* Identidad de Marca */}
                    <div className="px-2 pt-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center font-bold text-sm">🗂️</div>
                            <h1 className="text-lg font-bold tracking-tight">TarifAI</h1>
                        </div>
                        <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold mt-1">SENAE • 2026</p>
                    </div>

                    {/* BLOQUE A: MÓDULO PÚBLICO (Sin el botón de Planes) */}
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-blue-300/80 uppercase tracking-widest px-2 mb-1">Módulo Público</p>
                        {([
                            { id: 'inicio', label: 'Inicio', icon: '🌐' },
                            { id: 'nosotros', label: 'Nosotros', icon: '👥' },
                            { id: 'contacto', label: 'Contacto & Planes', icon: '✉️' },
                            { id: 'login', label: 'Login System', icon: '🔐' }
                        ] as const).map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => setCurrentTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === item.id ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                            >
                                <span className="text-sm">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* BLOQUE B: CORE OPERACIONAL & IA */}
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-blue-300/80 uppercase tracking-widest px-2 mb-1">Core Operacional</p>
                        <button 
                            onClick={() => setCurrentTab('overview')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'overview' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🎛️</span>
                            <span>Dashboard Overview</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('classifier')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'classifier' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">⚡</span>
                            <span>Nueva Clasificación</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('historial')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'historial' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">📋</span>
                            <span>Historial Completo</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('reportes')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'reportes' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">📈</span>
                            <span>Reportes KPIs</span>
                        </button>
                    </div>

                    {/* BLOQUE C: CONFIGURACIÓN E INTEGRACIÓN */}
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-blue-300/80 uppercase tracking-widest px-2 mb-1">Integración & Seguridad</p>
                        <button 
                            onClick={() => setCurrentTab('vault')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'vault' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🛡️</span>
                            <span>LOPDP Secure Vault</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('docs')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'docs' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">📄</span>
                            <span>API Documentation</span>
                        </button>
                        <button 
                            onClick={() => setCurrentTab('settings')} 
                            className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === 'settings' ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                        >
                            <span className="text-sm">🛠️</span>
                            <span>Settings</span>
                        </button>
                    </div>

                    {/* BLOQUE D: ADMINISTRACIÓN */}
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-blue-300/80 uppercase tracking-widest px-2 mb-1">Administración Interna</p>
                        {([
                            { id: 'usuarios', label: 'Usuarios' },
                            { id: 'roles', label: 'Roles' },
                            { id: 'normativas', label: 'Normativas' },
                            { id: 'config_ia', label: 'Configuración IA' }
                        ] as const).map((adminTab) => (
                            <button 
                                key={adminTab.id}
                                onClick={() => setCurrentTab(adminTab.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${currentTab === adminTab.id ? 'bg-white text-[#00529F] shadow-sm' : 'text-blue-100 hover:bg-blue-800/60'}`}
                            >
                                <span className="text-sm">🔧</span>
                                <span>{adminTab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-900/40 rounded-xl p-3 text-[11px] space-y-1 mt-4 border border-blue-800/50 font-medium">
                    <p className="text-[9px] font-bold text-blue-300 uppercase tracking-wider">UISEK Informática</p>
                    <div className="flex justify-between items-center"><span className="text-blue-100">Prototipo v2.0</span><span className="text-emerald-400 font-semibold text-[10px]">● 2026</span></div>
                </div>
            </aside>

            {/* MAIN CONTAINER WORKSPACE */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* 2. GLOBAL TOP HEADER */}
                <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 z-10 flex-shrink-0">
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                                {isPublicTab ? 'Portal Corporativo Público' : 'Sistema de Inferencia Arancelaria'}
                            </h2>
                            <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded border">
                                {currentTab.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {isPublicTab ? 'Módulo de acceso libre y prospección comercial.' : 'Entorno restrictivo para el análisis documental Nandina.'}
                        </p>
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
                    
                    {/* METRIC CARDS GRID */}
                    {!isPublicTab && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-20">
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">DAIs Processed</p>
                                <div className="flex justify-between items-baseline mt-1">
                                    <span className="text-xl font-bold text-slate-900">1284</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12.4% ↗</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-20">
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">AI Accuracy</p>
                                <div className="flex justify-between items-baseline mt-1">
                                    <span className="text-xl font-bold text-slate-900">99.4%</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+0.2 pp ↗</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-20">
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg. Class. Time</p>
                                <div className="flex justify-between items-baseline mt-1">
                                    <span className="text-xl font-bold text-slate-900">1.8s</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-0.4s ↗</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between h-20">
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">SENAE Compliance</p>
                                <div className="flex justify-between items-baseline mt-1">
                                    <span className="text-xl font-bold text-slate-900">98.7%</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+1.1 pp ↗</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ROUTER CONDICIONAL DE CAPAS */}
                    {isPublicTab && (
                        <PublicModuleViews view={currentTab as any} setTab={setCurrentTab} />
                    )}
                    
                    {currentTab === 'overview' && <DashboardOverview />}
                    {currentTab === 'vault' && <SecureVaultView />}
                    {currentTab === 'settings' && <SettingsView />}
                    {currentTab === 'reportes' && <ReportsView />}
                    
                    {['usuarios', 'roles', 'normativas', 'config_ia'].includes(currentTab) && (
                        <AdminModuleViews view={currentTab as any} />
                    )}

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

                    {/* BASE DE DATOS / HISTORIAL / ACTIVIDAD RECIENTE */}
                    {!isPublicTab && currentTab !== 'docs' && (
                        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                            <div className="px-5 py-3 border-b border-[#E2E8F0] bg-slate-50/60 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs">📋</span>
                                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        {currentTab === 'overview' ? 'Actividad Reciente — Historial Operativo' : 'Lista Completa de Clasificaciones Fiscales'}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border">
                                    {API_DATA_MOCK.tableOperations.length} registros cargados
                                </span>
                            </div>
                            
                            <Table>
                                <TableHeader className="bg-slate-50/40 border-b">
                                    <TableRow>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Operation ID</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Documento Fuente</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Subpartida Sugerida</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">FOB Value</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Fecha</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Broker</TableCell>
                                        <TableCell className="font-bold text-[10px] text-slate-400 uppercase tracking-wider p-3">Estado SENAE</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-slate-100">
                                    {API_DATA_MOCK.tableOperations.map((op: CustomsOperation) => (
                                        <TableRow key={op.operation_id} className="hover:bg-slate-50/40 transition-colors">
                                            <TableCell className="font-mono text-xs text-blue-600 font-semibold p-3">{op.operation_id}</TableCell>
                                            <TableCell className="text-xs font-medium text-slate-600 p-3">
                                                <span className="mr-1.5">{op.source_document.endsWith('.pdf') ? '📕' : '📗'}</span>
                                                {op.source_document}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs font-bold text-slate-800 p-3">{op.assigned_subheading}</TableCell>
                                            <TableCell className="font-medium text-xs text-slate-600 p-3">
                                                ${op.fob_value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell className="text-xs font-semibold text-slate-400 p-3">{op.date}</TableCell>
                                            <TableCell className="text-xs font-medium text-slate-600 p-3">{op.assigned_broker}</TableCell>
                                            <TableCell className="p-3">
                                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                                    op.senae_status === 'Validado' 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                        : 'bg-amber-50 text-amber-600 border-amber-200'
                                                }`}>
                                                    {op.senae_status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}