using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;

namespace WACNepal.Core
{
    public class imageResize
    {

        public byte[] image(int newWidth, int newHeight, HttpPostedFileBase fileContent)
        {
            using (Bitmap origImage = new Bitmap(fileContent.InputStream))
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

                        MemoryStream ms = new MemoryStream();
                        newImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);

                        return ms.ToArray(); //get imagedata  
                        //fileContent.InputStream.Read(projects.imageData, 0, length);

                    }
                }
            }
        }
    }
}