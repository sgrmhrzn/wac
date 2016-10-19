using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;

namespace WACNepal.Core
{
    public class base64ToByte
    {

        public byte[] image(int newWidth, int newHeight, string base64String)
        {
            // Convert Base64 String to byte[]
            var data = base64String.Substring(base64String.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(data);
            MemoryStream ms = new MemoryStream(imageBytes, 0,imageBytes.Length);

            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);


            using (Bitmap origImage = new Bitmap(image))
            {
                int maxWidth = 165;
                //int newWidth = 100;
                //int newHeight = 100;
                if (origImage.Width < newWidth) //Force to max width
                {
                    newWidth = maxWidth;
                    newHeight = origImage.Height * maxWidth / origImage.Width;
                }

                using (Bitmap newImage = new Bitmap(newWidth, newHeight))
                {
                    using (Graphics gr = Graphics.FromImage(newImage))
                    {
                        gr.SmoothingMode = SmoothingMode.AntiAlias;
                        gr.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        gr.PixelOffsetMode = PixelOffsetMode.HighQuality;
                        gr.DrawImage(origImage, new Rectangle(0, 0, newWidth, newHeight));

                        MemoryStream memeryStrm = new MemoryStream();
                        newImage.Save(memeryStrm, System.Drawing.Imaging.ImageFormat.Jpeg);

                        return memeryStrm.ToArray(); //get imagedata  
                        //fileContent.InputStream.Read(projects.imageData, 0, length);

                    }
                }
            }
        }
    }
}