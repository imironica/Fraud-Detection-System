using System;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace FraudDetection.Service
{
    public static class AppSettings
    {
        public static IConfiguration Configuration { get; set; }

        public static T Get<T>(string key)
        {
            if (Configuration == null)
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                var configuration = builder.Build();
                Configuration = configuration.GetSection("MongoConnection");
            }

            return (T)Convert.ChangeType(Configuration[key], typeof(T));
        }
    }
}
