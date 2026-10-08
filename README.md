# PRISMA - Sistema de Gestión y Facturación

 Sistema para administrar clientes, productos y facturas, separado en dos partes que se comunican por HTTP:

- **Backend:** API REST en ASP.NET Core (.NET 10) con Entity Framework Core y SQL Server.
- **Mobile:** app en React Native con Expo (en desarrollo).

## Estado del proyecto

| Parte | Estado |
|---|---|
| API de Clientes | Hecha (listar con filtros, detalle, crear, editar, baja lógica, activar) |
| API de Productos | Hecha (mismas operaciones, código de producto único) |
| API de Facturas | Pendiente |
| App móvil (Expo) | Pendiente |

## Tecnologías

- .NET 10, ASP.NET Core Web API (controladores)
- Entity Framework Core 10 (Code First, migraciones)
- SQL Server Express (`.\SQLEXPRESS`, base `PrismaDB`)
- Scalar para probar la API desde el navegador
- React Native + Expo + TypeScript (frontend, próximamente)

## Estructura del repositorio

```
PRISMA-Sistema/
├─ backend/
│  └─ Prisma.Api/
│     └─ Prisma.Api/        <- proyecto de la API (acá está el .csproj)
│        ├─ Controllers/    <- reciben las peticiones HTTP
│        ├─ Services/       <- lógica de negocio
│        ├─ Dtos/           <- forma de los datos que viajan por la red
│        ├─ Entities/       <- tablas de la base de datos
│        ├─ Data/           <- AppDbContext y datos de prueba
│        └─ Migrations/     <- historial de cambios de la base
└─ mobile/                  <- app Expo (pendiente)
```

## Requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- SQL Server Express (instancia `.\SQLEXPRESS`)
- Herramienta de Entity Framework: `dotnet tool install --global dotnet-ef`
- Visual Studio 2022 o superior (opcional)

## Cómo ejecutar el backend

1. Clonar el repositorio:

```
git clone https://github.com/HGTO4/PRISMA-Sistema.git
cd PRISMA-Sistema\backend\Prisma.Api\Prisma.Api
```

2. Revisar la cadena de conexión en `appsettings.json`. Por defecto usa `Server=.\SQLEXPRESS;Database=PrismaDB;Trusted_Connection=True;`. Si tu instancia de SQL Server es otra, cambiala.

3. Crear la base de datos a partir de las migraciones:

```
dotnet ef database update
```

4. Ejecutar la API:

```
dotnet run --launch-profile http
```

5. Abrir la documentación interactiva en `http://localhost:5237/scalar/v1`.

Al iniciar por primera vez, la API carga datos de prueba (10 clientes y 12 productos; uno de cada uno está dado de baja).

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/clientes?estado=&buscar=` | Lista clientes (`estado`: activos, inactivos o todos) |
| GET | `/api/clientes/{id}` | Detalle de un cliente |
| POST | `/api/clientes` | Crea un cliente |
| PUT | `/api/clientes/{id}` | Edita un cliente |
| DELETE | `/api/clientes/{id}` | Baja lógica (no borra la fila) |
| POST | `/api/clientes/{id}/activar` | Reactiva un cliente |

Productos tiene las mismas rutas bajo `/api/productos`.

## Decisiones de diseño

- **Baja lógica:** los registros se desactivan (`Activo = false`) en lugar de borrarse, para conservar el historial de facturas.
- **DTOs:** la API no expone las entidades directamente, sino objetos pensados para el intercambio de datos.
- **Capas separadas:** el controlador maneja HTTP, el servicio contiene la lógica y el `DbContext` accede a la base.
- **Integridad:** los borrados de clientes o productos con facturas están restringidos (`Restrict`).

## Próximos pasos

1. Endpoints de facturas (cálculo de totales en el servidor y guardado en transacción).
2. Configuración de la API para conectarse desde el celular (red local y CORS).
3. App móvil con Expo Router, TanStack Query y Zustand.
4. Tests con Jest y React Native Testing Library.
