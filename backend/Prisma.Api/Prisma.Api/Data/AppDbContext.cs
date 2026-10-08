using Microsoft.EntityFrameworkCore;
using Prisma.Api.Entities;

namespace Prisma.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        
        }

        public DbSet<Cliente> Clientes => Set<Cliente>();
        public DbSet<Producto> Productos => Set<Producto>();
        public DbSet<Factura> Facturas => Set<Factura>();
        public DbSet<DetalleFactura> DetalleFacturas => Set<DetalleFactura>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Producto>(e =>
            {
                e.Property(p => p.Precio).HasPrecision(18, 2);
                e.Property(p => p.IVA).HasPrecision(5, 2);

                e.Property(p => p.Codigo).HasMaxLength(20);
                e.HasIndex(p => p.Codigo).IsUnique();
            });

            modelBuilder.Entity<Factura>(e => 
            {
                e.Property(f => f.Subtotal).HasPrecision(18, 2);
                e.Property(f => f.TotalIVA).HasPrecision(18, 2);
                e.Property(f => f.Total).HasPrecision(18, 2);

                // No se puede borrar un cliente que tiene facturas
                e.HasOne(f => f.Cliente).WithMany().HasForeignKey(f => f.ClienteId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<DetalleFactura>(e =>
            {
                e.Property(d => d.Cantidad).HasPrecision(18, 2);
                e.Property(d => d.PrecioUnitario).HasPrecision(18, 2);
                e.Property(d => d.IVA).HasPrecision(5, 2);
                e.Property(d => d.Subtotal).HasPrecision(18, 2);
                e.Property(d => d.ImporteIVA).HasPrecision(18, 2);

                // No se puede borrar un producto que ya fue facturado
                e.HasOne(d => d.Producto).WithMany().HasForeignKey(d => d.ProductoId).OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
