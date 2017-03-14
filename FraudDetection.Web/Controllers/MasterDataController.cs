using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Service;
using FraudDetection.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FraudDetection.Web.Controllers
{
    [Route("api/[controller]")]
    public class MasterDataController : Controller
    {
        private IMasterDataService _masterDataService;
        public MasterDataController()
        {
            _masterDataService = new MasterDataService();
        }

        [HttpGet("[action]")]
        public IEnumerable<CardTypeDTO> GetCardTypes()
        {
            var lstTransactions = _masterDataService.GetCardTypes();
            return lstTransactions;
        }

        [HttpGet("[action]")]
        public IEnumerable<TransactionStatusDTO> GetTransactionStatus()
        {
            var response = _masterDataService.GetTransactionStatus();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<TransactionTypeDTO> GetTransactionType()
        {
            var response = _masterDataService.GetTransactionType();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<CountryDTO> GetCountries()
        {
            var response = _masterDataService.GetCountries();
            return response;
        }
    }
}
