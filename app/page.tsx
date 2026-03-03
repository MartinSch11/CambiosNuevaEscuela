import { useState } from "react";

const data = [
  {
    familia: "Exámenes Finales (Mesas)",
    icono: "🎓",
    color: "#ef4444",
    colorLight: "#fef2f2",
    colorBorder: "#fca5a5",
    tablas_viejas: [
      "finales20216", "finales202112", "finales202202", "finales202206",
      "finales202212", "finales2022e", "finales202302", "finales202307",
      "finales202312", "finales202402", "finales202407", "finales202411",
      "finales202502", "finales202507"
    ],
    tabla_nueva: "mesas_examen_final",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, docente, llamado1, llamado2, grabacion, grabacion2",
    campos_nuevos: "id, materia_id, docente_id, periodo_id, llamado1, llamado2, grabacion1, grabacion2",
    problema: "Cada período lectivo se creaba una tabla nueva a mano"
  },
  {
    familia: "Inscripción a Finales",
    icono: "📋",
    color: "#f97316",
    colorLight: "#fff7ed",
    colorBorder: "#fdba74",
    tablas_viejas: [
      "inscf202106", "inscf202112", "inscf202202", "inscf202206",
      "inscf202212", "inscf202302", "inscf202307", "inscf202312",
      "inscf202402", "inscf202407", "inscf202411", "inscf202502"
    ],
    tabla_nueva: "inscripciones_finales",
    columna_clave: "+ llamado_id",
    campos_viejos: "id, alumno, carrera, tipo",
    campos_nuevos: "id, alumno_id, carrera_id, mesa_id, tipo, created_at",
    problema: "Imposible buscar inscripciones históricas sin cambiar código"
  },
  {
    familia: "Resultados de Finales",
    icono: "📝",
    color: "#eab308",
    colorLight: "#fefce8",
    colorBorder: "#fde047",
    tablas_viejas: [
      "detallef202106", "detallef202112", "detallef202202", "detallef202206",
      "detallef202212", "detallef2022e", "detallef202302", "detallef202307",
      "detallef202312", "detallef202402", "detallef202407", "detallef202411",
      "detallef202502", "detallef202507"
    ],
    tabla_nueva: "resultados_finales",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, alumno, materia, llamado, estado, fecha",
    campos_nuevos: "id, alumno_id, materia_id, mesa_id, llamado, estado, fecha, created_at",
    problema: "Historial académico del alumno partido en 14 tablas"
  },
  {
    familia: "Resultados de Cursado",
    icono: "📚",
    color: "#84cc16",
    colorLight: "#f7fee7",
    colorBorder: "#bef264",
    tablas_viejas: [
      "detalle20212", "detalle20221", "detalle20222",
      "detalle20231", "detalle20232", "detalle20241",
      "detalle20242", "detalle20251", "detalle20252"
    ],
    tabla_nueva: "resultados_cursado",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, alumno, materia, cursa, estado, fecha",
    campos_nuevos: "id, alumno_id, materia_id, comision_id, periodo_id, tipo, estado, fecha",
    problema: "Notas de cursado por año y cuatrimestre en tablas separadas"
  },
  {
    familia: "Auditoría del Sistema",
    icono: "🔍",
    color: "#10b981",
    colorLight: "#f0fdf4",
    colorBorder: "#6ee7b7",
    tablas_viejas: ["movimientos"],
    tabla_nueva: "activity_log (Spatie)",
    columna_clave: "spatie/laravel-activitylog",
    campos_viejos: "id, usuario, alumno, detalle, fecha",
    campos_nuevos: "id, log_name, description, subject_type, subject_id, causer_type, causer_id, properties, created_at",
    problema: "Auditoría manual de bedeles/admin — se reemplaza por paquete Spatie Activity Log"
  },
  {
    familia: "Movimientos Económicos (SIRO)",
    icono: "💰",
    color: "#10b981",
    colorLight: "#f0fdf4",
    colorBorder: "#6ee7b7",
    tablas_viejas: [
      "movimientos202106", "movimientos202112", "movimientos202202", "movimientos202206",
      "movimientos202212", "movimientos202302", "movimientos202307", "movimientos202312",
      "movimientos202402", "movimientos202407", "movimientos202411", "movimientos202502"
    ],
    tabla_nueva: "pagos (solo referencia SIRO)",
    columna_clave: "referencia_siro",
    campos_viejos: "id, usuario, alumno, detalle, fecha",
    campos_nuevos: "id, alumno_id, boleta_id, referencia_siro, monto, estado, fecha  ← SIRO gestiona el resto",
    problema: "Transferencias y pagos registrados manualmente — SIRO reemplaza toda esta lógica"
  },
  {
    familia: "Pagos de Finales",
    icono: "💳",
    color: "#06b6d4",
    colorLight: "#ecfeff",
    colorBorder: "#67e8f9",
    tablas_viejas: [
      "pagosf202106", "pagosf202112", "pagosf202202", "pagosf202206",
      "pagosf202212", "pagosf202302", "pagosf202307", "pagosf202312",
      "pagosf202402", "pagosf202407", "pagosf202411", "pagosf202502"
    ],
    tabla_nueva: "pagos",
    columna_clave: "+ tipo + referencia_id",
    campos_viejos: "id, alumno, monto, fecha, estado",
    campos_nuevos: "id, alumno_id, tipo, referencia_id, monto, estado, fecha",
    problema: "Pagos históricos inaccesibles sin intervención de un dev"
  },
  {
    familia: "Adjuntos de Finales",
    icono: "📎",
    color: "#8b5cf6",
    colorLight: "#f5f3ff",
    colorBorder: "#c4b5fd",
    tablas_viejas: [
      "adjuntosf202106", "adjuntosf202112", "adjuntosf202202", "adjuntosf202206",
      "adjuntosf202212", "adjuntosf202302", "adjuntosf202307", "adjuntosf202312",
      "adjuntosf202402", "adjuntosf202407", "adjuntosf202411", "adjuntosf202502"
    ],
    tabla_nueva: "adjuntos",
    columna_clave: "+ tipo + entidad_id",
    campos_viejos: "id, contenido, llamado, archivo, tipo",
    campos_nuevos: "id, entidad_tipo, entidad_id, llamado, archivo, tipo, periodo_id",
    problema: "Archivos de finales históricos inaccesibles"
  },
  {
    familia: "Contenido de Finales",
    icono: "📄",
    color: "#ec4899",
    colorLight: "#fdf2f8",
    colorBorder: "#f9a8d4",
    tablas_viejas: [
      "contenidof202106", "contenidof202112", "contenidof202202", "contenidof202206",
      "contenidof202212", "contenidof202302", "contenidof202307", "contenidof202312",
      "contenidof202402", "contenidof202407", "contenidof202411", "contenidof202502"
    ],
    tabla_nueva: "contenidos_finales",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, materia, llamado, contenido, link",
    campos_nuevos: "id, materia_id, mesa_id, llamado, contenido, link, periodo_id",
    problema: "Material de cada final desperdigado por período"
  },
  {
    familia: "Respuestas Encuesta Final",
    icono: "📊",
    color: "#6366f1",
    colorLight: "#eef2ff",
    colorBorder: "#a5b4fc",
    tablas_viejas: [
      "respuestasfinales202106", "respuestasfinales202112", "respuestasfinales202202",
      "respuestasfinales202206", "respuestasfinales202212", "respuestasfinales202302",
      "respuestasfinales202307", "respuestasfinales202312", "respuestasfinales202402",
      "respuestasfinales202407", "respuestasfinales202411", "respuestasfinales202502"
    ],
    tabla_nueva: "respuestas_encuesta",
    columna_clave: "+ periodo_id + tipo",
    campos_viejos: "id, alumno, final, llamado, respuesta",
    campos_nuevos: "id, alumno_id, mesa_id, llamado, respuesta, periodo_id",
    problema: "Análisis histórico de encuestas imposible"
  },
  {
    familia: "Actas de Finales",
    icono: "📜",
    color: "#d97706",
    colorLight: "#fffbeb",
    colorBorder: "#fcd34d",
    tablas_viejas: [
      "actasf", "actasc", "actasf2", "actasf3", "actasf4", "actasf5",
      "actasf6", "actasf7", "actasf8", "actasf9", "actasf91",
      "actasf92", "actasf93", "actasr", "actasfe"
    ],
    tabla_nueva: "actas",
    columna_clave: "+ tipo + periodo_id",
    campos_viejos: "id, examen (solo 2 columnas!)",
    campos_nuevos: "id, mesa_id, alumno_id, tipo, estado, fecha_cierre, periodo_id",
    problema: "Tablas numeradas secuencialmente sin criterio claro"
  },
  {
    familia: "Presentes / Asistencia",
    icono: "✅",
    color: "#0ea5e9",
    colorLight: "#f0f9ff",
    colorBorder: "#7dd3fc",
    tablas_viejas: ["presentes", "presentes2022", "presentes_2024", "presentesc"],
    tabla_nueva: "asistencias_estudiante",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, clase, materia, alumno, estado",
    campos_nuevos: "id, clase_id, materia_id, alumno_id, estado, periodo_id",
    problema: "Copia de tabla por año en lugar de filtrar por período"
  },
  {
    familia: "Horarios de Materias",
    icono: "🗓️",
    color: "#14b8a6",
    colorLight: "#f0fdfa",
    colorBorder: "#5eead4",
    tablas_viejas: [
      "horariosmaterias", "horariosmaterias_",
      "horariosmaterias_2024_1c", "horariosmaterias_2024_2c",
      "horariosmaterias_migracion1", "horariosmaterias_migracion2",
      "horariosmaterias_migracion3"
    ],
    tabla_nueva: "horarios_comisiones",
    columna_clave: "+ periodo_id + cuatrimestre_id",
    campos_viejos: "id, materia, dia, de, a, turno, ta",
    campos_nuevos: "id, comision_id, materia_id, docente_id, dia, hora_inicio, hora_fin, periodo_id",
    problema: "Horarios duplicados por cuatrimestre y año manualmente"
  },
  {
    familia: "Parciales",
    icono: "✏️",
    color: "#f43f5e",
    colorLight: "#fff1f2",
    colorBorder: "#fda4af",
    tablas_viejas: ["parciales", "parciales2", "parcialesbup", "parcialestest"],
    tabla_nueva: "examenes_parciales",
    columna_clave: "+ periodo_id",
    campos_viejos: "id, elanio, cuat, carrera, anio, turno, materia, parcial, recup",
    campos_nuevos: "id, comision_id, materia_id, periodo_id, fecha_parcial, fecha_recuperatorio, estado",
    problema: "Versiones de prueba mezcladas con producción"
  },
  {
    familia: "Notas / Calificaciones",
    icono: "🔢",
    color: "#a855f7",
    colorLight: "#faf5ff",
    colorBorder: "#d8b4fe",
    tablas_viejas: ["notas", "notas2", "notas3", "libreta", "libreta_back"],
    tabla_nueva: "calificaciones",
    columna_clave: "+ tipo + periodo_id",
    campos_viejos: "id, alumno, materia, nota, tipo",
    campos_nuevos: "id, alumno_id, materia_id, examen_id, periodo_id, nota, tipo, fecha",
    problema: "Versiones numeradas + backup en producción"
  },
  {
    familia: "Materias (versiones)",
    icono: "📖",
    color: "#64748b",
    colorLight: "#f8fafc",
    colorBorder: "#cbd5e1",
    tablas_viejas: ["materias", "materias2", "materias3", "amateria", "amateria_2024", "pmateria", "pmateria_back_1_8", "lamateria", "omateria"],
    tabla_nueva: "materias",
    columna_clave: "estructura única limpia",
    campos_viejos: "id, materia, carrera, anio, turno, cuat (disperso en múltiples tablas)",
    campos_nuevos: "id, nombre, plan_id, anio, cuatrimestre_id, turno, horas_catedra, horas_reloj",
    problema: "Múltiples versiones de la misma tabla con nombres distintos"
  },
];

const totalViejas = data.reduce((s, f) => s + f.tablas_viejas.length, 0);
const totalNuevas = data.length;

export default function App() {
  const [expandida, setExpandida] = useState<number | null>(null);
  const [vista, setVista] = useState("familias"); // familias | resumen

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0f172a", minHeight: "100vh", padding: "20px", color: "#f1f5f9" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc", margin: 0 }}>
          🏗️ Plan de Normalización de Base de Datos
        </h1>
        <p style={{ color: "#94a3b8", margin: "6px 0 0", fontSize: 13 }}>
          App Superior Nueva Escuela — Sistema de Gestión Académica
        </p>
      </div>

      {/* Métricas grandes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Tablas actuales (duplicadas)", valor: totalViejas, color: "#ef4444", icon: "⚠️" },
          { label: "Tablas normalizadas", valor: totalNuevas, color: "#22c55e", icon: "✅" },
          { label: "Tablas eliminadas", valor: totalViejas - totalNuevas, color: "#f97316", icon: "🗑️" },
          { label: "Reducción", valor: Math.round((1 - totalNuevas / totalViejas) * 100) + "%", color: "#a855f7", icon: "📉" },
        ].map(m => (
          <div key={m.label} style={{ background: "#1e293b", borderRadius: 12, padding: "16px 12px", textAlign: "center", border: `1px solid #334155` }}>
            <div style={{ fontSize: 22 }}>{m.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: m.color, lineHeight: 1.1 }}>{m.valor}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Toggle vista */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["familias", "📦 Por Familia"], ["resumen", "📊 Tabla Resumen"]].map(([v, l]) => (
          <button key={v} onClick={() => setVista(v)}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: vista === v ? "#3b82f6" : "#1e293b", color: vista === v ? "#fff" : "#94a3b8"
            }}>
            {l}
          </button>
        ))}
      </div>

      {vista === "familias" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((f, i) => {
            const abierta = expandida === i;
            return (
              <div key={i} style={{ background: "#1e293b", borderRadius: 12, border: `1px solid #334155`, overflow: "hidden" }}>

                {/* Cabecera clickeable */}
                <div onClick={() => setExpandida(abierta ? null : i)}
                  style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>

                  <span style={{ fontSize: 22 }}>{f.icono}</span>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{f.familia}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{f.problema}</div>
                  </div>

                  {/* Pills */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: "#450a0a", color: "#fca5a5", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                      {f.tablas_viejas.length} tablas
                    </div>
                    <span style={{ color: "#475569", fontSize: 18 }}>→</span>
                    <div style={{ background: "#052e16", color: "#86efac", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                      1 tabla
                    </div>
                    <span style={{ color: "#475569", fontSize: 16, marginLeft: 4 }}>{abierta ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Detalle expandible */}
                {abierta && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #334155" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, marginTop: 14, alignItems: "start" }}>

                      {/* Columna ANTES */}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", marginBottom: 8, letterSpacing: 1 }}>
                          ❌ ANTES — {f.tablas_viejas.length} tablas duplicadas
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {f.tablas_viejas.map(t => (
                            <span key={t} style={{ background: "#450a0a", color: "#fca5a5", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontFamily: "monospace" }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div style={{ marginTop: 10, background: "#1a0a0a", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 10, color: "#ef4444", fontWeight: 700, marginBottom: 4 }}>CAMPOS (ejemplo):</div>
                          <code style={{ fontSize: 11, color: "#fca5a5" }}>{f.campos_viejos}</code>
                        </div>
                      </div>

                      {/* Flecha central */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                        <div style={{ background: "#1d4ed8", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>→</div>
                        <div style={{ fontSize: 10, color: "#3b82f6", marginTop: 4, textAlign: "center", maxWidth: 60 }}>normalizar</div>
                      </div>

                      {/* Columna DESPUÉS */}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", marginBottom: 8, letterSpacing: 1 }}>
                          ✅ DESPUÉS — 1 tabla unificada
                        </div>
                        <div>
                          <span style={{ background: "#052e16", color: "#86efac", borderRadius: 6, padding: "4px 12px", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
                            {f.tabla_nueva}
                          </span>
                          <span style={{ marginLeft: 8, background: "#1e3a5f", color: "#93c5fd", borderRadius: 6, padding: "3px 8px", fontSize: 11 }}>
                            {f.columna_clave}
                          </span>
                        </div>
                        <div style={{ marginTop: 10, background: "#0a1a0a", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, marginBottom: 4 }}>CAMPOS NUEVOS:</div>
                          <code style={{ fontSize: 11, color: "#86efac" }}>{f.campos_nuevos}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {vista === "resumen" && (
        <div style={{ background: "#1e293b", borderRadius: 12, border: "1px solid #334155", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {["", "Familia", "Tablas actuales", "Tabla nueva", "Reducción"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#94a3b8", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((f, i) => (
                <tr key={i} style={{ borderTop: "1px solid #334155", background: i % 2 === 0 ? "transparent" : "#172033" }}>
                  <td style={{ padding: "8px 12px", fontSize: 18 }}>{f.icono}</td>
                  <td style={{ padding: "8px 12px", fontWeight: 600, color: "#f1f5f9" }}>{f.familia}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ background: "#450a0a", color: "#fca5a5", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>
                      {f.tablas_viejas.length}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", color: "#86efac" }}>{f.tabla_nueva}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ background: "#334155", borderRadius: 4, height: 8, flex: 1, overflow: "hidden" }}>
                        <div style={{ background: "#22c55e", height: "100%", width: `${(1 - 1 / f.tablas_viejas.length) * 100}%`, borderRadius: 4 }} />
                      </div>
                      <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 11, minWidth: 36 }}>
                        -{Math.round((1 - 1 / f.tablas_viejas.length) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #475569", background: "#0f172a" }}>
                <td></td>
                <td style={{ padding: "10px 12px", fontWeight: 800, color: "#f8fafc" }}>TOTAL</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: "#7f1d1d", color: "#fca5a5", borderRadius: 6, padding: "3px 10px", fontWeight: 800, fontSize: 14 }}>{totalViejas}</span>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ background: "#14532d", color: "#86efac", borderRadius: 6, padding: "3px 10px", fontWeight: 800, fontSize: 14 }}>{totalNuevas}</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#22c55e", fontWeight: 800, fontSize: 15 }}>
                  -{totalViejas - totalNuevas} tablas ({Math.round((1 - totalNuevas / totalViejas) * 100)}% menos)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 20, color: "#475569", fontSize: 11 }}>
        * No incluye ~20 tablas adicionales de backups, tests y temporales que también se eliminarán
      </div>
    </div>
  );
}