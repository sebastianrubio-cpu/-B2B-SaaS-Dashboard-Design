import React from 'react';
import { useCustoms } from '../hooks/useCustoms';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './components/ui/table';
import { Badge } from './components/ui/badge';

export default function App() {
    // Consumimos la lógica de la capa superior de manera limpia
    const { operations, loading, error, isClassifying, handleUpload } = useCustoms(1);

    if (loading) return <div className="p-8 text-center">Cargando base de datos aduanera...</div>;
    if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* ... Tu Sidebar y Header estructural ... */}
            
            {/* Zona del Clasificador de archivos */}
            <main className="flex-1 p-8 overflow-y-auto">
                <input 
                    type="file" 
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                    disabled={isClassifying}
                />

                {/* Tabla de Control Operativo alimentada de forma reactiva y limpia */}
                <Table className="bg-white rounded-lg border mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableCell>Operation ID</TableCell>
                            <TableCell>Source Document</TableCell>
                            <TableCell>Assigned Subheading</TableCell>
                            <TableCell>SENAE Status</TableCell>
                            <TableCell>LOPDP Compliance</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {operations.map((op) => (
                            <TableRow key={op.operation_id}>
                                <TableCell className="font-mono">{op.operation_id}</TableCell>
                                <TableCell>{op.source_document}</TableCell>
                                <TableCell className="font-semibold">{op.assigned_subheading}</TableCell>
                                <TableCell>
                                    <Badge variant={op.senae_status === 'Validado' ? 'success' : 'warning'}>
                                        {op.senae_status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{op.lopdp_compliance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    );
}