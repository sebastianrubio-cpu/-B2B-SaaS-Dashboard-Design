/// <reference types="vite/client" />
import { CustomsOperation, Broker } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tuplataforma.com/v1';

export const customsService = {
    async getOperations(): Promise<CustomsOperation[]> {
        const response = await fetch(`${API_BASE_URL}/customs-operations/`);
        if (!response.ok) throw new Error('Error al recuperar datos aduaneros');
        return response.json();
    },

    async classifyDocument(file: File, brokerId: number): Promise<CustomsOperation> {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('broker_id', brokerId.toString());

        const response = await fetch(`${API_BASE_URL}/classify/`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Error en el procesamiento del motor lógico');
        return response.json();
    },

    async getBrokerProfile(id: number): Promise<Broker> {
        const response = await fetch(`${API_BASE_URL}/brokers/${id}/`);
        if (!response.ok) throw new Error('Error de autenticación de Broker');
        return response.json();
    }
};