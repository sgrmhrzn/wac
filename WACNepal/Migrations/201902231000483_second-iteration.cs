namespace WACNepal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class seconditeration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.news_tb",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        detail = c.String(),
                        posted_date = c.DateTime(nullable: false),
                        title = c.String(),
                        ytubeLink = c.String(),
                        eventDate = c.DateTime(nullable: false),
                        news_type = c.String(),
                        image = c.Binary(),
                        thumbnail = c.Binary(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.project_tb",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        description = c.String(),
                        duration = c.String(),
                        category = c.String(),
                        posted_date = c.DateTime(nullable: false),
                        ytubeLink = c.String(),
                        project_status = c.String(),
                        imageData = c.Binary(),
                        thumbnail = c.Binary(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Gallery",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        image = c.Binary(),
                        thumbnail = c.Binary(),
                        postedDate = c.DateTime(nullable: false),
                        caption = c.String(),
                        ytubeLink = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.successStories_tb",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        description = c.String(),
                        date = c.DateTime(nullable: false),
                        ytubeLink = c.String(),
                        imageData = c.Binary(),
                        thumbnail = c.Binary(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.successStories_tb");
            DropTable("dbo.Gallery");
            DropTable("dbo.project_tb");
            DropTable("dbo.news_tb");
        }
    }
}
