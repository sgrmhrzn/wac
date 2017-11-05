using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WACNepal.Handler
{
    /// <summary>
    /// Summary description for ImageHandler
    /// </summary>
    public class galleryThumbnailHandler : IHttpHandler
    {

        string connectionString = ConfigurationManager.ConnectionStrings["AppDbContext"].ConnectionString;
        public void ProcessRequest(HttpContext context)
        {
            int ImageId = Convert.ToInt32(context.Request.QueryString["id"]);
            String strdata = "select thumbnail from gallery where id =@ID";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(strdata, con);
                if (cmd.Connection.State.ToString() == "Closed")
                {
                    cmd.Connection.Open();
                }
                cmd.CommandText = strdata;
                cmd.Parameters.Add("@ID", SqlDbType.Int, 50).Value = ImageId;
                SqlDataReader rda = cmd.ExecuteReader();
                while (rda.Read())
                {
                    context.Response.ContentType = "application/jpg";
                    context.Response.BinaryWrite((byte[])(rda["thumbnail"]));
                    context.Response.Flush();
                    context.Response.End();
                }

                cmd.Connection.Close();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}