import React from 'react';

interface AdminProps { view: 'usuarios' | 'roles' | 'normativas' | 'config_ia'; }

export function AdminModuleViews({ view }: AdminProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {view === 'usuarios' && 'Gestión de Usuarios Operadores'}
                {view === 'roles' && 'Control de Accesos y Roles Técnicos'}
                {view === 'normativas' && 'Bases de Datos Normativas Correlacionadas'}
                {view === 'config_ia' && 'Parámetros del Motor de Inferencia IA'}
            </h3>
            <p className="text-xs text-slate-500">Módulo de administración interna de TarifAI. Configuración estática y control inmutable de políticas del sistema.</p>
            <div className="border rounded-lg overflow-hidden text-xs font-mono bg-slate-50 p-4 text-slate-600 space-y-2">
                {view === 'usuarios' && <p>• mfernandez (Customs Broker - Admin) - ACTIVO<br/>• rvasquez (Technical Reviewer) - ACTIVO</p>}
                {view === 'roles' && <p>• Broker Admin: Acceso total, firmas LOPDP y descargas PDF.<br/>• Consulta API: Solo lectura de endpoints.</p>}
                {view === 'normativas' && <p>• Arancel Nacional 2026 (Sincronizado COMEX)<br/>• Notas Explicativas OMA Versión 2026.3</p>}
                {view === 'config_ia' && <p>• Threshold de Confianza Mínimo: 95.0%<br/>• Modelo Activo: hs2026-v3.0.4 (LLM Fine-tuned para aduanas)</p>}
            </div>
        </div>
    );
}