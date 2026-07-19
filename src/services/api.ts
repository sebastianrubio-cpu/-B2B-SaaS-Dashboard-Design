/// <reference types="vite/client" />
import { CustomsOperation, Broker } from '../types';

// Datos estáticos iniciales simulando el estado de la base de datos relacional
let mockOperations: CustomsOperation[] = [
    {
        operation_id: "OP-2026-001",
        source_document: "Invoice_Import_PYME.pdf",
        assigned_subheading: "8471.30.00.00",
        fob_value: 14320.00,
        date: "2026-07-18T14:30:00Z",
        broker_id: 1,
        assigned_broker: "M. Fernández",
        senae_status: "Validado",
        lopdp_compliance: "Encrypted Secure"
    },
    {
        operation_id: "OP-2026-002",
        source_document: "Packing_List_Esmeraldas.xlsx",
        assigned_subheading: "3926.90.90.00",
        fob_value: 5890.50,
        date: "2026-07-18T11:15:00Z",
        broker_id: 1,
        assigned_broker: "M. Fernández",
        senae_status: "Physical Inspection Pending",
        lopdp_compliance: "Consent Ok"
    },
    {
        operation_id: "OP-2026-003",
        source_document: "CI_Maritima_GYE_07.pdf",
        assigned_subheading: "8537.10.00.00",
        fob_value: 28140.00,
        date: "2026-07-17T16:45:00Z",
        broker_id: 2,
        assigned_broker: "R. Vásquez",
        senae_status: "Validado",
        lopdp_compliance: "Encrypted Secure"
    },
    {
        operation_id: "OP-2026-004",
        source_document: "DHL_BL_CargaAerea.xml",
        assigned_subheading: "7318.15.00.00",
        fob_value: 3210.75,
        date: "2026-07-17T09:30:00Z",
        broker_id: 1,
        assigned_broker: "M. Fernández",
        senae_status: "Under Review",
        lopdp_compliance: "Consent Ok"
    }
];

const mockBroker: Broker = {
    id: 1,
    usuario: "mfernandez",
    correo: "m.fernandez@agencia.com",
    clave: "$2b$10$K9r...", // Hash simulado
    modelo: "B2B-SaaS"
};

// Utilidad auxiliar para emular la latencia de red de la API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const customsService = {
    // Retorna el listado emulado con un retraso de 800ms
    async getOperations(): Promise<CustomsOperation[]> {
        await delay(800);
        return [...mockOperations];
    },

    // Simula el procesamiento OCR y el motor lógico de clasificación arancelaria de la IA
    async classifyDocument(file: File, brokerId: number): Promise<CustomsOperation> {
        await delay(1500); // La IA toma un poco más de tiempo en procesar el documento

        // Construcción de una respuesta de éxito simulada e incremental
        const newOperation: CustomsOperation = {
            operation_id: `OP-2026-00${mockOperations.length + 1}`,
            source_document: file.name,
            assigned_subheading: "8537.10.00.00", // Código por defecto para pruebas visuales
            fob_value: Math.floor(Math.random() * 20000) + 1000, // Valor financiero aleatorio
            date: new Date().toISOString(),
            broker_id: brokerId,
            assigned_broker: mockBroker.usuario === "mfernandez" ? "M. Fernández" : "Broker Admin",
            senae_status: "Validado",
            lopdp_compliance: "Encrypted Secure"
        };

        // Modificamos el estado local simulado para que persista durante la sesión del navegador
        mockOperations = [newOperation, ...mockOperations];
        return newOperation;
    },

    // Retorna el perfil del operador técnico logueado
    async getBrokerProfile(id: number): Promise<Broker> {
        await delay(400);
        if (id === 1) return mockBroker;
        throw new Error('Error de autenticación de Broker: Identificador no encontrado');
    }
};