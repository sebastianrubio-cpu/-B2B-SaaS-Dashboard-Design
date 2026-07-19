import { useState, useEffect } from 'react';
import { CustomsOperation } from '../types';
import { customsService } from '../services/api';

export function useCustoms(currentBrokerId: number) {
    const [operations, setOperations] = useState<CustomsOperation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClassifying, setIsClassifying] = useState<boolean>(false);

    // Cargar historial al montar el componente
    useEffect(() => {
        async function loadInitialData() {
            try {
                setLoading(true);
                const data = await customsService.getOperations();
                setOperations(data);
            } catch (err: any) {
                setError(err.message || 'Falla de conexión con los servidores');
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    // Acción interactiva para procesar un nuevo PDF
    const handleUpload = async (file: File) => {
        try {
            setIsClassifying(true);
            const newOp = await customsService.classifyDocument(file, currentBrokerId);
            // Inyección inmutable al inicio de la tabla para reflejar la actualización inmediata
            setOperations(prev => [newOp, ...prev]);
        } catch (err: any) {
            setError(err.message || 'Error al procesar archivo arancelario');
        } finally {
            setIsClassifying(false);
        }
    };

    return {
        operations,
        loading,
        error,
        isClassifying,
        handleUpload
    };
}