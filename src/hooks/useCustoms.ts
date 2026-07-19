import { useState, useEffect } from 'react';
import { CustomsOperation } from '../types';
import { customsService } from '../services/api';

export function useCustoms(currentBrokerId: number) {
    const [operations, setOperations] = useState<CustomsOperation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClassifying, setIsClassifying] = useState<boolean>(false);
    
    // NUEVO ESTADO: Almacena el último mapeo exitoso de la API
    const [lastResult, setLastResult] = useState<CustomsOperation | null>(null);

    useEffect(() => {
        async function loadInitialData() {
            try {
                setLoading(true);
                const data = await customsService.getOperations();
                setOperations(data);
            } catch (err: any) {
                setError(err.message || 'Falla de conexión');
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    const handleUpload = async (file: File) => {
        try {
            setIsClassifying(true);
            const newOp = await customsService.classifyDocument(file, currentBrokerId);
            setLastResult(newOp); // Guardamos la traza para pintar en pantalla
            setOperations(prev => [newOp, ...prev]); // Actualización reactiva de la tabla
        } catch (err: any) {
            setError(err.message || 'Error al procesar el motor lógico');
        } finally {
            setIsClassifying(false);
        }
    };

    return {
        operations,
        loading,
        error,
        isClassifying,
        lastResult, // Retornamos el estado hacia la UI
        handleUpload
    };
}