// src/types/index.ts

// Identificadores de navegación interna para todas las pantallas del prototipo
export type TabId = 
    | 'inicio' | 'nosotros' | 'planes' | 'contacto' | 'login' // Módulo Público
    | 'overview' | 'classifier' | 'historial' | 'reportes'    // Módulo Core / Dashboard
    | 'vault' | 'docs' | 'settings'                         // Integración & Seguridad (Faltaban aquí)
    | 'usuarios' | 'roles' | 'normativas' | 'config_ia';    // Módulo de Administración

// Identificadores para la consola interactiva de la documentación técnica
export type EndpointId = 'classify' | 'result' | 'validate' | 'operations' | 'vault_id';

export interface ApiDocContent {
    curl: string;
    response: string;
}

// Entidad Broker / Operador Autorizado
export interface Broker {
    id: number;
    usuario: string;
    correo: string;
    clave: string; 
    modelo: 'B2B-SaaS' | 'Enterprise' | 'Custom';
}

// Estados del SENAE y Cumplimiento normativo
export type SenaeStatus = 'Validado' | 'Physical Inspection Pending' | 'Under Review';
export type LopdpCompliance = 'Encrypted Secure' | 'Consent Ok' | 'Pending Review';

// Entidad Operación Aduanera (Base de Datos Relacional Mockup)
export interface CustomsOperation {
    operation_id: string;
    source_document: string;
    assigned_subheading: string;
    fob_value: number;
    date: string; 
    broker_id: number;
    assigned_broker: string; 
    senae_status: string;
    lopdp_compliance: string;
}