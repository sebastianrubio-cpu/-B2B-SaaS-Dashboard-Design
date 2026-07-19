import React, { useState } from 'react';
import { useCustoms } from '../hooks/useCustoms';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table';
import { Badge } from './components/ui/badge';
import { EndpointId, TabId } from '../types';

// Importación de las sub-vistas desacopladas
import { DashboardOverview } from './components/figma/DashboardOverview';
import { TariffClassifier } from './components/figma/TariffClassifier';
import { SecureVaultView } from './components/figma/SecureVaultView';
import { ApiDocumentationView } from './components/figma/ApiDocumentationView';
import { SettingsView } from './components/figma/SettingsView';

const API_DATA_MOCK: Record<EndpointId, { curl: string; response: string }> = {
    classify: {
        curl: `curl -X POST https://api.tarifai.senae.gob.ec/v1/classify \\\n  -H "Authorization: Bearer sk-live-••••••••••••••••" \\\n  -H "Content-Type: multipart/form-data" \\\n  -F "file=@Invoice_Import_PYME.pdf" \\\n  -F "model=hs2026-v3"`,
        response: `{\n  "job_id": "clf_2026_xK9mQ2",\n  "status": "completed",\n  "subheading": "8537.10.00.00",\n  "confidence": 0.994,\n  "chapter": 85,\n  "description": "Mixed distribution electronic components",\n  "tariff_rate": 0.0,\n  "processing_ms": 1832\n}`
    },
    result: {
        curl: `curl -X GET https://api.tarifai.senae.gob.ec/v1/result/clf_2026_xK9mQ2 \\\n  -H "Authorization: Bearer sk-live-••••••••••••••••"`,
        response: `{\n  "job_id": "clf_2026_xK9mQ2",\n  "status": "completed",\n  "result": {\n    "subheading": "8537.10.00.00",\n    "accuracy": 0.994\n  }\n}`
    },
    validate: {
        curl: `curl -X POST https://api.tarifai.senae.gob.ec/v1/validate \\\n  -H "Authorization: Bearer sk-live-••••••••••••••••" \\\n  -H "Content-Type: application/json" \\\n  -d '{"subheading": "8537.10.00.00"}'`,
        response: `{\n  "valid": true,\n  "nomenclature": "Nandina 2026",\n  "restrictions": "Requiere permiso previo del Ministerio de Producción"\n}`
    },
    operations: {
        curl: `curl -X GET https://api.tarifai.senae.gob.ec/v1/operations \\\n  -H "Authorization: Bearer sk-live-••••••••••••••••"`,
        response: `[\n  {\n    "operation_id": "OP-2026-001",\n    "source_document": "Invoice_Import_PYME.pdf",\n    "assigned_subheading": "8471.30.00.00",\n    "senae_status": "Validado"\n  }\n]`
    },
    vault_id: {
        curl: `curl -X GET https://api.tarifai.senae.gob.ec/v1/vault/clf_2026_xK9mQ2 \\\n  -H "Authorization: Bearer sk-live-••••••••••••••••"`,
        response: `{\n  "vault_id": "vlt_2026_99a8b2",\n  "encryption": "AES-256",\n  "lopdp_consent_verified": true,\n  "integrity_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"\n}`
    }
};

export default function App() {
    const { operations, loading, error, isClassifying, handleUpload } = useCustoms(1);
    const [currentTab, setCurrentTab] = useState<TabId>('overview');
    const [activeEndpoint, setActiveEndpoint] = useState<EndpointId>('classify');

    if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Cargando base de datos aduanera...</div>;
    if (error) return <div className="p-8 text-red-500 text-center font-medium">Error de infraestructura: {error}</div>;

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
            
            {/* SIDEBAR NAVEGACIÓN */}
            <aside className="w-[260px] bg-[#00529F] text-white flex flex-col justify-between p-4 border-r border-blue-800 flex-shrink-0">
                <div>
                    <div className="mb-8 px-2">
                        <h1 className="text-xl font-bold tracking-tight">TarifAI</h1>
                        <p className="text-xs text-blue-200">UISEK • SENAE • 2026</p>
                    </div>
                    <nav className="space-y-1">
                        {(['overview', 'classifier', 'vault', 'docs', 'settings'] as const).map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setCurrentTab(tab)} 
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors uppercase tracking-wider text-[11px] ${currentTab === tab ? 'bg-white text-[#00529F]' : 'text-blue-100 hover:bg-blue-800'}`}
                            >
                                <span>{tab === 'overview' ? '📊' : tab === 'classifier' ? '⚡' : tab === 'vault' ? '📂' : tab === 'docs' ? '🔑' : '⚙️'}</span>
                                <span>{tab === 'docs' ? 'API Documentation' : `${tab} View`}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="bg-blue-900/50 rounded-xl p-3 text-xs border border-blue-800">
                    <span className="text-emerald-400 font-medium">● Systems Connected</span>
                </div>
            </aside>

            {/* CONTENEDOR CENTRAL */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 z-10 flex-shrink-0">
                    <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Panel de Gestión Operativa</h2>
                </header>

                <main className="flex-1 overflow-y-auto p-8 space-y-6">
                    {/* TARJETAS ANALÍTICAS GLOBALES */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm"><p className="text-xs text-slate-500 font-medium">DAIs Processed</p><p className="text-2xl font-bold text-slate-900 mt-1">{operations.length + 1280}</p></div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm"><p className="text-xs text-slate-500 font-medium">AI Accuracy</p><p className="text-2xl font-bold text-slate-900 mt-1">99.4%</p></div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm"><p className="text-xs text-slate-500 font-medium">Avg Class. Time</p><p className="text-2xl font-bold text-slate-900 mt-1">1.8s</p></div>
                        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm"><p className="text-xs text-slate-500 font-medium">SENAE Compliance</p><p className="text-2xl font-bold text-slate-900 mt-1">98.7%</p></div>
                    </div>

                    {/* VISTAS MODULARES ENCAPSULADAS */}
                    {currentTab === 'overview' && <DashboardOverview />}
                    {currentTab === 'vault' && <SecureVaultView />}
                    {currentTab === 'settings' && <SettingsView />}
                    {currentTab === 'classifier' && (
                        <TariffClassifier handleUpload={handleUpload} isClassifying={isClassifying} />
                    )}
                    {currentTab === 'docs' && (
                        <ApiDocumentationView 
                            activeEndpoint={activeEndpoint}
                            setActiveEndpoint={setActiveEndpoint}
                            endpointData={API_DATA_MOCK}
                        />
                    )}

                    {/* BASE DE DATOS ADUANERA RELACIONAL (Visible fuera de la documentación) */}
                    {currentTab !== 'docs' && (
                        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-slate-50/50">
                                <h3 className="text-sm font-bold text-slate-900">Base de Datos — Historial Técnico de Consultas</h3>
                            </div>
                            <Table>
                                <TableHeader className="bg-slate-50/70">
                                    <TableRow>
                                        <TableCell className="font-semibold text-xs text-slate-500">Operation ID</TableCell>
                                        <TableCell className="font-semibold text-xs text-slate-500">Source Document</TableCell>
                                        <TableCell className="font-semibold text-xs text-slate-500">Assigned Subheading</TableCell>
                                        <TableCell className="font-semibold text-xs text-slate-500">SENAE Status</TableCell>
                                        <TableCell className="font-semibold text-xs text-slate-500">LOPDP Compliance</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {operations.map((op) => (
                                        <TableRow key={op.operation_id}>
                                            <TableCell className="font-mono text-sm text-blue-600 font-medium">{op.operation_id}</TableCell>
                                            <TableCell className="text-sm text-slate-600">{op.source_document}</TableCell>
                                            <TableCell className="font-semibold text-sm text-slate-800">{op.assigned_subheading}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={op.senae_status === 'Validado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                                                    {op.senae_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={op.lopdp_compliance === 'Encrypted Secure' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}>
                                                    {op.lopdp_compliance}
                                                </Badge>
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