using Microsoft.EntityFrameworkCore;

namespace vega.Data
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
        {
        }
    }
}