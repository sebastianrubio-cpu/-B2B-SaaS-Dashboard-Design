import React from 'react';

interface TariffClassifierProps {
    handleUpload: (file: File) => Promise<void>;
    isClassifying: boolean;
}

export function TariffClassifier({ handleUpload, isClassifying }: TariffClassifierProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Document Ingestion</h3>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                    <input 
                        type="file" 
                        id="classifier-file"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                        disabled={isClassifying}
                    />
                    <label htmlFor="classifier-file" className="cursor-pointer block space-y-2">
                        <div className="text-2xl">📤</div>
                        <p className="text-sm font-medium text-slate-700">Drag & Drop your document here</p>
                        <p className="text-xs text-slate-400">Supports PDF, XML and XLSX invoices</p>
                    </label>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Live API Classification Results</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase">Assigned HS Subheading</p>
                        <div className="text-xl font-bold text-[#00529F] bg-blue-50 p-3 rounded-lg border border-blue-100 mt-1">
                            8537.10.00.00
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}