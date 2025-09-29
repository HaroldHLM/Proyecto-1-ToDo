# Proyecto ToDo – React + TypeScript + Vite

Aplicación ToDo estilo TodoMVC construida con React + TypeScript y Vite. Permite crear, marcar como completadas, editar con doble clic y eliminar tareas. Incluye filtros (Todos, Activos, Completados), animaciones suaves al añadir/eliminar con AutoAnimate y sincronización con un backend local usando JSON Server.

## Demo rápida
- Editar: doble clic en el texto de la tarea, Enter/blur para guardar, Escape para cancelar.
- Completar: checkbox a la izquierda.
- Eliminar: botón con icono de “destroy”.
- Filtrar: barra inferior (Todos / Activos / Completados).

## Características
- React + TypeScript con Vite.
- Estilos base de TodoMVC (`todomvc-app-css`).
- Animaciones con `@formkit/auto-animate` en la lista.
- Edición inline por doble clic.
- Estado tipado y handlers claros para crear, editar, completar, eliminar, y limpiar completados.
- Backend simulado con `json-server` y cliente fetch en `src/backend/Api.tsx`.

## Estructura relevante
- `src/App.tsx`: wiring principal, filtros y handlers.
- `src/components/Todos.tsx`: listado y render de cada `Todo` (con AutoAnimate).
- `src/components/Todo.tsx`: ítem individual, edición inline, completar/eliminar.
- `src/components/Header.tsx` + `src/components/CreateTodo.tsx`: formulario para crear tareas.
- `src/components/Footer.tsx`: contador y filtros.
- `src/backend/Api.tsx`: funciones fetch (listar, crear, actualizar, borrar).
- `src/backend/db.json`: base de datos para JSON Server.

## Requisitos
- Node.js 18+ recomendado.

## Puesta en marcha

1) Instalar dependencias
```bash
npm install
```

2) Ejecutar cliente + backend juntos
```bash
npm run dev:all
```
Esto lanza:
- Vite (cliente) en http://localhost:5173
- JSON Server en http://localhost:3001 (endpoint: `/todos`)

Si prefieres ejecutarlos por separado:
```bash
npm run dev     # cliente
npm run server  # backend (lee src/backend/db.json)
```

## Configuración del backend
- Base de datos: `src/backend/db.json` (inicialmente vacía o con datos de ejemplo)
```json
{
  "todos": [
    { "id": 1, "title": "Learn TypeScript", "completed": true },
    { "id": 2, "title": "Build a Todo App", "completed": false },
    { "id": 3, "title": "Master React", "completed": false }
  ]
}
```

- Scripts en `package.json`:
```json
{
  "scripts": {
    "server": "json-server -w src/backend/db.json -p 3001",
    "dev:all": "concurrently -k -n client,server -c blue,magenta \"npm run dev\" \"npm run server\""
  }
}
```

- Puedes definir `VITE_API_URL` en `.env.local` si quieres cambiar la URL del backend:
```env
VITE_API_URL=http://localhost:3001
```

## Cliente de API (resumen)
Archivo: `src/backend/Api.tsx`
- `fetchTodos()`: GET `/todos`
- `createTodo(title)`: POST `/todos`
- `updateTodo(id, patch)`: PATCH `/todos/:id`
- `deleteTodo(id)`: DELETE `/todos/:id`

## Linting y formato
- ESLint está configurado con reglas para React + TypeScript.
- Ejecuta:
```bash
npm run lint
```

## Próximos pasos sugeridos
- Migrar a `useReducer` para centralizar la lógica del estado.
- Persistencia remota optimista (optimistic UI) y manejo de errores UI.
- Tests unitarios de componentes y de la API.

---

Hecho con React + TypeScript, animado con AutoAnimate y potenciado por JSON Server para un flujo local completo.
