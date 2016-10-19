using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WACNepal.Startup))]
namespace WACNepal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
