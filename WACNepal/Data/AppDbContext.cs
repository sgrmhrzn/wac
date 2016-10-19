using System.Data.Entity;
using WACNepal.Core;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WACNepal.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext()
            : base("AppDbContext")
        {

        }
        public DbSet<project_tb> AllProjects { get; set; }

        public DbSet<successStories_tb> successStories { get; set; }

        public DbSet<news_tb> AllNews { get; set; }

        //public IDbSet<price_tb> price { get; set; }


        //public IDbSet<Wish> Wishes { get; set; }

        //public IDbSet<Customer> Customers { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

    }

}