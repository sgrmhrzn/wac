using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Web;

namespace WACNepal.Handler
{
    /// <summary>
    /// Summary description for StoriesImageHandler
    /// </summary>
    public class NewsThumbnailHandler : IHttpHandler
    {

        string connectionString = ConfigurationManager.ConnectionStrings["AppDbContext"].ConnectionString;
        public void ProcessRequest(HttpContext context)
        {
            int ImageId = Convert.ToInt32(context.Request.QueryString["id"]);
            String strdata = "select thumbnail from news_tb where id =@ID";

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
                    var image = (rda["thumbnail"]);
                    if (Convert.IsDBNull(image))
                    {
                        context.Response.ContentType = "application/png";
                        var url = "C:\\New folder\\wacnepal\\WACNepal\\Images\\logo1.png";
                        byte[] imageData;
                        using (WebClient client = new WebClient())
                        {
                            imageData = client.DownloadData(url);
                        }
                            context.Response.OutputStream.Write(imageData, 0, imageData.Length);
                    }
                    else
                    {
                        context.Response.ContentType = "application/jpg";
                        context.Response.BinaryWrite((byte[])image);
                        context.Response.Flush();
                        context.Response.End();
                    }

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