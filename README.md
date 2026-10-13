# PRISMA - Sistema de Gestión y Facturación

Sistema para administrar clientes, productos y facturas, separado en dos partes que se comunican por HTTP:

- **Backend:** API REST en ASP.NET Core (.NET 10) con Entity Framework Core y SQL Server.
- **Mobile:** app en React Native con Expo (Expo Router, TanStack Query y TypeScript), con modo claro y oscuro.

## Estado del proyecto

| Parte                           | Estado                                                                   |
| ------------------------------- | ------------------------------------------------------------------------ |
| API de Clientes                 | Hecha (listar con filtros, detalle, crear, editar, baja lógica, activar) |
| API de Productos                | Hecha (mismas operaciones, código de producto único)                     |
| API de Facturas                 | Hecha (cálculo en el servidor, transacción, anulación)                   |
| App móvil: base                 | Hecha (navegación, tema claro/oscuro, capa de datos)                     |
| App móvil: Clientes             | Listado con búsqueda. Falta detalle, alta y edición                      |
| App móvil: Productos y Facturas | Pendiente                                                                |

## Tecnologías

**Backend**

- .NET 10, ASP.NET Core Web API (controladores)
- Entity Framework Core 10 (Code First, migraciones)
- SQL Server Express (`.\SQLEXPRESS`, base `PrismaDB`)
- Scalar para probar la API desde el navegador

**Mobile**

- React Native + Expo (SDK 57) + TypeScript
- Expo Router (rutas por archivos)
- TanStack Query (pedidos a la API y caché)
- Zustand (estado local, previsto para el borrador de factura)

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
│        ├─ Exceptions/     <- errores de negocio (400 y 409)
│        ├─ Middleware/     <- traduce las excepciones a respuestas HTTP
│        └─ Migrations/     <- historial de cambios de la base
├─ mobile/
│  └─ prisma-mobile/
│     └─ src/
│        ├─ app/            <- rutas (Expo Router)
│        ├─ screens/        <- pantallas
│        ├─ components/     <- componentes reutilizables
│        ├─ hooks/          <- datos (TanStack Query) y tema
│        ├─ services/       <- comunicación con la API
│        ├─ types/          <- tipos TypeScript que reflejan los DTOs
│        ├─ constants/      <- colores (claro y oscuro) y espaciados
```

## Requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- SQL Server Express (instancia `.\SQLEXPRESS`)
- Herramienta de Entity Framework: `dotnet tool install --global dotnet-ef`
- [Node.js](https://nodejs.org/) (versión LTS)
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

## Cómo ejecutar la app móvil

Con la API corriendo:

1. Instalar las dependencias:

```
cd PRISMA-Sistema\mobile\prisma-mobile
npm install
```

2. Crear el archivo `.env.local` a partir de `.env.example` (ese archivo no se sube al repositorio) y ajustar la dirección de la API si hace falta:

```
copy .env.example .env.local
```

3. Iniciar la app:

```
npx expo start
```

Con la app iniciada, presioná `w` para abrirla en el navegador, o escaneá el código QR con Expo Go desde el celular.

Para probar en el celular con Expo Go, `EXPO_PUBLIC_API_URL` tiene que apuntar a la IP de la PC en la red local (por ejemplo `http://192.168.1.35:5237`), el celular tiene que estar en el mismo Wi-Fi y Windows tiene que permitir la conexión entrante al puerto 5237 (la red debe estar como privada o hay que agregar una regla de firewall). En el emulador de Android, la dirección de la PC es `http://10.0.2.2:5237`. Después de cambiar el `.env.local`, hay que volver a iniciar la app con `npx expo start`.

## Endpoints disponibles

| Método | Ruta                             | Descripción                                           |
| ------ | -------------------------------- | ----------------------------------------------------- |
| GET    | `/api/clientes?estado=&buscar=`  | Lista clientes (`estado`: activos, inactivos o todos) |
| GET    | `/api/clientes/{id}`             | Detalle de un cliente                                 |
| POST   | `/api/clientes`                  | Crea un cliente                                       |
| PUT    | `/api/clientes/{id}`             | Edita un cliente                                      |
| DELETE | `/api/clientes/{id}`             | Baja lógica (no borra la fila)                        |
| POST   | `/api/clientes/{id}/activar`     | Reactiva un cliente                                   |
| GET    | `/api/productos?estado=&buscar=` | Lista productos (busca por código o descripción)      |
| GET    | `/api/productos/{id}`            | Detalle de un producto                                |
| POST   | `/api/productos`                 | Crea un producto (el código debe ser único)           |
| PUT    | `/api/productos/{id}`            | Edita un producto                                     |
| DELETE | `/api/productos/{id}`            | Baja lógica                                           |
| POST   | `/api/productos/{id}/activar`    | Reactiva un producto                                  |
| GET    | `/api/facturas?estado=&buscar=`  | Lista facturas (`estado`: activas, anuladas o todas)  |
| GET    | `/api/facturas/{id}`             | Detalle de una factura con sus ítems                  |
| POST   | `/api/facturas`                  | Emite una factura                                     |
| POST   | `/api/facturas/{id}/anular`      | Anula una factura                                     |

## Facturación

- La app envía solo el cliente, el método de pago, una nota opcional y una lista de `productoId` con `cantidad`. **Nunca envía precios ni totales.**
- El servidor busca cada producto, toma su precio e IVA actuales y calcula subtotal, IVA y total (con redondeo a 2 decimales).
- Cada ítem de la factura guarda una copia de la descripción, el precio y el IVA del momento, por lo que la factura no cambia si después se modifica el producto.
- La factura y el cálculo de su número (`Id` con 8 dígitos) se guardan en una transacción: se guardan los dos pasos o ninguno.
- Errores de negocio: el pedido mal armado (cliente inexistente o dado de baja, producto dado de baja, método de pago inválido) responde `400`; los conflictos (código de producto repetido, factura ya anulada) responden `409`.

## Decisiones de diseño

- **Baja lógica:** los registros se desactivan (`Activo = false`) en lugar de borrarse, para conservar el historial de facturas.
- **DTOs:** la API no expone las entidades directamente, sino objetos pensados para el intercambio de datos.
- **Capas separadas:** el controlador maneja HTTP, el servicio contiene la lógica y el `DbContext` accede a la base. En la app, las rutas son finas y la pantalla vive en `screens/`.
- **Integridad:** los borrados de clientes o productos con facturas están restringidos (`Restrict`), y el código de producto tiene un índice único en la base.
- **Datos en la app:** `services/` sabe qué pedir a la API, `hooks/` los entrega a las pantallas con TanStack Query y las pantallas solo los dibujan.
- **Tema:** los colores de la marca salen del diseño original del proyecto (barra azul marino, azul principal) y existe una paleta para modo oscuro.

## Próximos pasos

1. Detalle, alta, edición y baja de clientes en la app.
2. Pantallas de productos.
3. Armado de facturas en la app (borrador con Zustand y envío en un solo pedido).
4. Resumen del negocio (panel de control) en la pantalla de inicio.
5. Tests con Jest y React Native Testing Library.
