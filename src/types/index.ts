// Entidad Broker
// Entidad Broker
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

// Entidad Operación Aduanera
export interface CustomsOperation {
    operation_id: string;
    source_document: string;
    assigned_subheading: string;
    fob_value: number;
    date: string; 
    broker_id: number;
    assigned_broker: string; 
    senae_status: SenaeStatus;
    lopdp_compliance: LopdpCompliance;
}