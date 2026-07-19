// src/services/apiMockData.ts
import { CustomsOperation, ApiDocContent, EndpointId } from '../types';

export const API_DATA_MOCK: Record<EndpointId, ApiDocContent> & { tableOperations: CustomsOperation[] } = {
    // 1. Capa de Datos Técnicos para la Documentación API
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
    },

    // 2. Capa de Datos Estáticos para la Tabla (Asociados estrictamente a CustomsOperation)
    tableOperations: [
        {
            operation_id: "OP-2026-001",
            source_document: "Invoice_Import_PYME.pdf",
            assigned_subheading: "8471.30.00.00",
            fob_value: 14320.00,
            date: "18 Jul 2026",
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
            date: "18 Jul 2026",
            broker_id: 1,
            assigned_broker: "R. Vásquez",
            senae_status: "Physical Inspection Pending",
            lopdp_compliance: "Consent Ok"
        },
        {
            operation_id: "OP-2026-003",
            source_document: "CI_Maritima_GYE_07.pdf",
            assigned_subheading: "8537.10.00.00",
            fob_value: 28140.00,
            date: "17 Jul 2026",
            broker_id: 2,
            assigned_broker: "M. Fernández",
            senae_status: "Validado",
            lopdp_compliance: "Encrypted Secure"
        },
        {
            operation_id: "OP-2026-004",
            source_document: "DHL_BL_CargaAerea.xml",
            assigned_subheading: "7318.15.00.00",
            fob_value: 3210.75,
            date: "17 Jul 2026",
            broker_id: 1,
            assigned_broker: "C. Morales",
            senae_status: "Under Review",
            lopdp_compliance: "Consent Ok"
        },
        {
            operation_id: "OP-2026-005",
            source_document: "Packing_List_UIO_Norte.xlsx",
            assigned_subheading: "9403.20.00.00",
            fob_value: 9455.00,
            date: "16 Jul 2026",
            broker_id: 1,
            assigned_broker: "R. Vásquez",
            senae_status: "Validado",
            lopdp_compliance: "Encrypted Secure"
        }
    ]
};