import React from 'react';

interface PublicProps { 
    view: 'inicio' | 'nosotros' | 'planes' | 'contacto' | 'login'; 
    setTab: (tab: any) => void; 
}

export function PublicModuleViews({ view, setTab }: PublicProps) {
    return (
        <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm max-w-4xl mx-auto space-y-6">
            {view === 'inicio' && (
                <div className="text-center space-y-4 py-12">
                    <h2 className="text-3xl font-extrabold text-slate-900">Clasificación Arancelaria Automatizada con IA</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">Optimiza tus operaciones aduaneras reduciendo tiempos de liquidación de días a segundos bajo la normativa Nandina vigente.</p>
                    <button onClick={() => setTab('login')} className="px-6 py-2.5 bg-[#00529F] text-white font-medium rounded-lg text-sm">Acceder al Sistema</button>
                </div>
            )}
            
            {view === 'nosotros' && (
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">Nuestra Tecnología</h3>
                    <p className="text-sm text-slate-600">TarifAI nace como una solución estratégica para agencias de aduana e importadores en el Ecuador, integrando modelos avanzados de procesamiento de lenguaje natural y visión artificial (OCR) con las bases de datos del Servicio Nacional de Aduana del Ecuador (SENAE).</p>
                </div>
            )}
            
            {view === 'contacto' && (
                <div className="space-y-8">
                    {/* Integración Detallada de Planes */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-900">Planes Disponibles & Licenciamiento</h3>
                            <p className="text-xs text-slate-500 mt-1">Selecciona el modelo de suscripción que mejor se adapte a tu volumen operativo</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            {([
                                { title: 'SaaS Pyme', price: '$49', desc: 'Hasta 500 consultas de subpartidas al mes. Mapeo automatizado con reportes normativos básicos.' },
                                { title: 'SaaS Custom Broker', price: '$149', desc: 'Consultas ilimitadas, firma digital, integración de Packing Lists y soporte técnico prioritario.' },
                                { title: 'Enterprise API', price: 'Custom', desc: 'Acceso directo al core de inferencia por lote via REST API, TLS 1.3 y resguardo inmutable LOPDP.' }
                            ]).map((plan, i) => (
                                <div key={plan.title} className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${i === 1 ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-slate-50/30'}`}>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{plan.title}</h4>
                                        <p className="text-2xl font-extrabold text-[#00529F] mt-1">
                                            {plan.price}
                                            {plan.price !== 'Custom' && <span className="text-xs text-slate-400 font-normal">/mes</span>}
                                        </p>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-2">{plan.desc}</p>
                                    </div>
                                    <button className={`w-full py-2 text-[11px] font-bold uppercase rounded-lg tracking-wider border ${i === 1 ? 'bg-[#00529F] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}>
                                        Solicitar Alta
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Información de Contacto / Soporte */}
                    <div className="space-y-4 max-w-md mx-auto text-center">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contacto & Soporte Técnico</h3>
                        <div className="space-y-2 text-xs font-medium text-slate-600 bg-slate-50 border p-4 rounded-xl">
                            <p>📍 Quito, Ecuador — Campus UISEK</p>
                            <p>✉️ soporte@tarifai.senae.gob.ec</p>
                            <p>📞 +593 (2) 397-4800</p>
                        </div>
                    </div>
                </div>
            )}
            
            {view === 'login' && (
                <div className="max-w-sm mx-auto space-y-4 py-6">
                    <div className="text-center"><h3 className="text-xl font-bold text-slate-900">Autenticación Autorizada</h3><p className="text-xs text-slate-400 mt-1">Ingresa tus credenciales firmadas por el operador técnico</p></div>
                    <div className="space-y-3 text-xs">
                        <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">Usuario</label><input type="text" defaultValue="mfernandez" className="w-full border p-2.5 rounded bg-slate-50" /></div>
                        <div className="space-y-1"><label className="font-bold text-slate-500 uppercase">Clave Cifrada</label><input type="password" defaultValue="••••••••••" className="w-full border p-2.5 rounded bg-slate-50" /></div>
                        <button onClick={() => setTab('overview')} className="w-full py-2.5 bg-[#00529F] text-white font-semibold rounded-lg text-xs tracking-wider uppercase shadow-sm">Ingresar al Dashboard</button>
                    </div>
                </div>
            )}
        </div>
    );
}