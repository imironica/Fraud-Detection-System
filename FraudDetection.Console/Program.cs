using FraudDetection.Models;
using FraudDetection.Service;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Console
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var option = string.Empty;
            while (option != "0")
            {
                ShowOptions();
                option = System.Console.ReadLine();
                if (option == "0")
                    Environment.Exit(1);
                if (option == "1")
                    InitialSetup();
                if (option == "2")
                    RunApi();

            }
        }

        private static void ShowOptions()
        {
            System.Console.WriteLine("Options: ");
            System.Console.WriteLine("1 - Generate database: ");
            System.Console.WriteLine("2 - Run PythonApi");
            System.Console.WriteLine("0 - Exit: ");
        }
        public static void RunApi()
        {

                ProcessStartInfo start = new ProcessStartInfo();
                start.FileName = @"..\FraudDetection.ML\Python\python.exe";
                start.Arguments = string.Format(@"..\FraudDetection.ML\python_api.py");
                start.UseShellExecute = false;
                start.RedirectStandardOutput = true;
                using (Process process = Process.Start(start))
                {
                    using (StreamReader reader = process.StandardOutput)
                    {
                        string result = reader.ReadToEnd();
                        System.Console.Write(result);
                    }
                }
            
        }

        public static void InitialSetup()
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = @"..\FraudDetection.ML\Python\python.exe";
            start.Arguments = string.Format(@"..\FraudDetection.ML\initial_setup.py");
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    System.Console.Write(result);
                }
            }
        }

    }
}
