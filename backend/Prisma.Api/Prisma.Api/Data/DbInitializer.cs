using Prisma.Api.Entities;

namespace Prisma.Api.Data
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Clientes.Any() || context.Productos.Any())
            {
                return;
            }
            context.Clientes.AddRange(
            new Cliente { Nombre = "García y Asociados S.R.L.", CUIT = "30-71234567-8", Direccion = "Av. Corrientes 1234", Localidad = "CABA", Provincia = "CABA", CodigoPostal = "1043", Telefono = "11-4567-8901", Email = "contacto@garciaasoc.com.ar", FechaAlta = new DateTime(2025, 3, 10) },
            new Cliente { Nombre = "María Elena Rodríguez", DNI = "28456789", Direccion = "Calle San Martín 456", Localidad = "Rosario", Provincia = "Santa Fe", CodigoPostal = "2000", Telefono = "341-555-1234", Email = "maria.rodriguez@email.com", FechaAlta = new DateTime(2025, 4, 15) },
            new Cliente { Nombre = "Tecnología del Sur S.A.", CUIT = "30-69874521-3", Direccion = "Ruta 9 Km 45", Localidad = "Córdoba", Provincia = "Córdoba", CodigoPostal = "5000", Telefono = "351-489-7654", Email = "ventas@tecsur.com.ar", FechaAlta = new DateTime(2025, 5, 2) },
            new Cliente { Nombre = "Juan Carlos Pérez", DNI = "32145678", Direccion = "Belgrano 789", Localidad = "Mendoza", Provincia = "Mendoza", CodigoPostal = "5500", Telefono = "261-423-9876", Email = "juancarlos.perez@gmail.com", FechaAlta = new DateTime(2025, 6, 20) },
            new Cliente { Nombre = "Distribuidora Norte S.A.", CUIT = "30-70543218-9", Direccion = "Av. Libertador 3200", Localidad = "San Miguel de Tucumán", Provincia = "Tucumán", CodigoPostal = "4000", Telefono = "381-421-5566", Email = "info@distnorte.com", FechaAlta = new DateTime(2025, 7, 1) },
            new Cliente { Nombre = "Ana Lucía Fernández", DNI = "25987654", Direccion = "Mitre 1122", Localidad = "Mar del Plata", Provincia = "Buenos Aires", CodigoPostal = "7600", Telefono = "223-491-3344", Email = "analucia.f@outlook.com", FechaAlta = new DateTime(2025, 7, 18) },
            new Cliente { Nombre = "Comercial del Litoral S.R.L.", CUIT = "30-68765432-1", Direccion = "Urquiza 567", Localidad = "Santa Fe", Provincia = "Santa Fe", CodigoPostal = "3000", Telefono = "342-455-7788", Email = "administracion@litoral.com.ar", FechaAlta = new DateTime(2025, 8, 5) },
            new Cliente { Nombre = "Roberto Díaz", DNI = "18765432", Direccion = "Alsina 234", Localidad = "Bahía Blanca", Provincia = "Buenos Aires", CodigoPostal = "8000", Telefono = "291-455-2211", Email = "roberto.diaz@yahoo.com", FechaAlta = new DateTime(2025, 8, 22) },
            new Cliente { Nombre = "Servicios Integrales Patagonia", CUIT = "30-72109876-5", Direccion = "Av. San Martín 1500", Localidad = "Neuquén", Provincia = "Neuquén", CodigoPostal = "8300", Telefono = "299-448-9900", Email = "contacto@patagonia-serv.com", FechaAlta = new DateTime(2025, 9, 1) },
            new Cliente { Nombre = "Laura Beatriz Gómez", DNI = "30567890", Direccion = "Rivadavia 890", Localidad = "Salta", Provincia = "Salta", CodigoPostal = "4400", Telefono = "387-421-1122", Email = "laura.gomez@hotmail.com", FechaAlta = new DateTime(2025, 9, 10), Activo = false } // baja lógica de ejemplo
        );

            context.Productos.AddRange(
                new Producto { Codigo = "NOTE-001", Descripcion = "Notebook 15.6\" Intel i5 16GB RAM 512GB SSD", Precio = 850000m, FechaAlta = new DateTime(2025, 3, 15) },
                new Producto { Codigo = "MOUSE-02", Descripcion = "Mouse inalámbrico ergonómico", Precio = 18500m, FechaAlta = new DateTime(2025, 3, 15) },
                new Producto { Codigo = "TECL-03", Descripcion = "Teclado mecánico RGB switch blue", Precio = 42500m, FechaAlta = new DateTime(2025, 3, 20) },
                new Producto { Codigo = "MONI-04", Descripcion = "Monitor LED 27\" Full HD 75Hz", Precio = 210000m, FechaAlta = new DateTime(2025, 4, 1) },
                new Producto { Codigo = "AURI-05", Descripcion = "Auriculares Bluetooth con micrófono", Precio = 32000m, FechaAlta = new DateTime(2025, 4, 10) },
                new Producto { Codigo = "IMP-06", Descripcion = "Impresora multifunción láser WiFi", Precio = 185000m, FechaAlta = new DateTime(2025, 5, 5) },
                new Producto { Codigo = "CABL-07", Descripcion = "Cable HDMI 2.0 2 metros", Precio = 6500m, FechaAlta = new DateTime(2025, 5, 12) },
                new Producto { Codigo = "WEBC-08", Descripcion = "Webcam Full HD 1080p con micrófono", Precio = 45000m, FechaAlta = new DateTime(2025, 6, 1) },
                new Producto { Codigo = "SSD-09", Descripcion = "Disco SSD 1TB NVMe M.2", Precio = 98000m, FechaAlta = new DateTime(2025, 6, 15) },
                new Producto { Codigo = "RAM-10", Descripcion = "Memoria RAM DDR4 16GB 3200MHz", Precio = 72000m, FechaAlta = new DateTime(2025, 7, 1) },
                new Producto { Codigo = "SILL-11", Descripcion = "Silla gamer ergonómica con apoyo lumbar", Precio = 145000m, FechaAlta = new DateTime(2025, 7, 20) },
                new Producto { Codigo = "MOUSE-12", Descripcion = "Mouse pad XL gamer RGB", Precio = 12500m, FechaAlta = new DateTime(2025, 8, 1), Activo = false }
            );

            context.SaveChanges();

        }
    }
}
