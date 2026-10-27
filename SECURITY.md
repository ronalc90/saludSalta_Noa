# Política de seguridad

## Versiones soportadas

Solo la rama `main` recibe correcciones de seguridad: es la que está desplegada (el frontend en Vercel, y el backend y el predictor en Railway). Las demás ramas y los commits anteriores no tienen soporte.

| Versión | Soporte |
| --- | --- |
| `main` (desplegada) | Sí |
| Otras ramas y commits anteriores | No |

## Cómo reportar una vulnerabilidad

Escribe en privado a **ronalddemiancipagauta@gmail.com** con el asunto `[Seguridad] saludSalta_Noa: <resumen breve>`.

**No abras issues, discusiones ni pull requests públicos para reportar una vulnerabilidad**: la dejarían a la vista antes de que exista una corrección.

Incluye en el reporte:

- Qué parte está afectada: URL, ruta de la API, servicio (frontend, backend, predictor o servicio de ML), archivo o commit.
- Tipo de problema e impacto posible (por ejemplo, ver datos de salud o fotos faciales de otra persona, saltarse un rol o robar una sesión).
- Pasos para reproducirlo o una prueba de concepto mínima.
- El commit de `main` o la fecha en que lo probaste, y el navegador o entorno si aplica.

Prueba solo con cuentas y datos propios o de prueba, y no incluyas datos personales reales en el reporte. No accedas a datos de otras personas, no los cambies ni los borres, y no degrades el servicio.

## Plazos orientativos

- **Acuse de recibo:** dentro de 72 horas.
- **Evaluación inicial** (si se confirma y qué gravedad tiene): dentro de 7 días.

Luego recibirás el plan de corrección y un aviso cuando esté desplegada. Te pido no divulgar el problema hasta entonces.

## Medidas actuales

Contraseñas en bcrypt, JWT con `JWT_SECRET` obligatorio, `helmet`, CORS con lista de orígenes y límite de solicitudes (más detalle en [Seguridad y privacidad](README.md#seguridad-y-privacidad)).

---

## Summary (English)

Only the `main` branch (the deployed one) receives security fixes. Report vulnerabilities privately to **ronalddemiancipagauta@gmail.com**. Please do not open public issues, discussions or pull requests for them. Include the affected component, the impact, steps to reproduce or a minimal proof of concept, and the commit or date you tested. Use only your own or test accounts and data, and do not include real personal data in the report. You can expect an acknowledgement within 72 hours and an initial assessment within 7 days.
