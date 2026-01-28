# Ejercicio: Pruebas E2E con Cypress

## Crear Pruebas E2E para la Interfaz "Position"


Debes crear pruebas E2E para verificar los siguientes escenarios:

crear las pruebas en la carpeta cypress/integration

### 1. Carga de la Página de "Position"
*   **Título**: Verifica que el título de la posición se muestra correctamente.
*   **Columnas**: Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
*   **Candidatos**: Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

### 2. Cambio de Fase de un Candidato
*   **Drag & Drop**: Simula el arrastre de una tarjeta de candidato de una columna a otra.
*   **Movimiento Visual**: Verifica que la tarjeta del candidato se mueve a la nueva columna.
*   **Actualización en Backend**: Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint `PUT /candidate/:id`.

---

## Tareas a Realizar

1.  **Crear archivo de prueba**: Crea un archivo de prueba `position.spec.js` en la carpeta `/cypress/integration`.
2.  **Escribir pruebas**: Implementa las pruebas E2E para verificar la carga de la página y el cambio de fase de un candidato.
