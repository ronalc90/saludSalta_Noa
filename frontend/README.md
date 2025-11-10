# Frontend - Plataforma Salud Fabi

Frontend desarrollado con Next.js 14, TypeScript y Tailwind CSS para adultos mayores.

## Características

- ✅ Next.js 14 con App Router
- ✅ TypeScript para type safety
- ✅ Tailwind CSS para estilos
- ✅ Zustand para state management
- ✅ Axios para llamadas HTTP
- ✅ WebAuthn/FIDO2 para autenticación biométrica
- ✅ Diseño accesible WCAG AA
- ✅ Responsive móvil-first

## Estructura de Carpetas

```
src/
├── app/              # Páginas y rutas (App Router)
│   ├── page.tsx      # Home
│   ├── login/        # Login
│   ├── registro/     # Registro
│   ├── dashboard/    # Dashboard
│   ├── clases/       # Clases educativas
│   ├── imc/          # Calculadora IMC
│   ├── predictor/    # Predictor ML
│   └── sobre/        # Sobre nosotros
├── components/       # Componentes reutilizables
│   ├── ui/           # Componentes UI (Button, Input, Card, etc.)
│   └── layout/       # Layout (Navbar, Footer)
├── lib/              # Utilidades y configuración
│   ├── api.ts        # Cliente Axios
│   ├── webauthn.ts   # WebAuthn helpers
│   └── utils.ts      # Funciones helpers
├── store/            # Estado global (Zustand)
│   └── authStore.ts  # Store de autenticación
└── types/            # TypeScript types
    └── index.ts      # Tipos compartidos
```

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Variables requeridas:
- `NEXT_PUBLIC_API_URL`: URL del backend API
- `NEXT_PUBLIC_ML_URL`: URL del servicio ML

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Despliegue

Ver `/DEPLOYMENT_GUIDE.md` para instrucciones de despliegue en Vercel.

## Accesibilidad

- Textos grandes (18px base)
- Alto contraste
- Botones grandes (min 48px)
- Labels en todos los inputs
- Roles ARIA apropiados
- Navegación por teclado
- Skip to main content

## Componentes Principales

### UI Components
- `Button`: Botones accesibles con variantes
- `Input`: Inputs con labels y mensajes de error
- `Card`: Contenedores de contenido
- `Alert`: Mensajes de alerta
- `Loading`: Indicadores de carga

### Layout
- `Navbar`: Barra de navegación responsive
- `Footer`: Pie de página

## Estado Global

Usando Zustand con persistencia en localStorage:
- `authStore`: Manejo de autenticación y usuario

## Rutas

- `/` - Home
- `/login` - Login
- `/registro` - Registro
- `/dashboard` - Dashboard (privado)
- `/clases` - Clases educativas
- `/imc` - Calculadora IMC (privado)
- `/predictor` - Predictor de enfermedades (privado)
- `/sobre` - Sobre nosotros
- `/perfil` - Perfil de usuario (privado)

## Soporte

Ver README principal en la raíz del proyecto.
