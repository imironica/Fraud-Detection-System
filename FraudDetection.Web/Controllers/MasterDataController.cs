using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Service;
using FraudDetection.Models;
using FraudDetection.Models.Transactions;

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
            var response = _masterDataService.GetCardTypes();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<CardVendorDTO> GetCardVendors()
        {
            var response = _masterDataService.GetCardVendors();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<TransactionTypeDTO> GetTransactionTypes()
        {
            var response = _masterDataService.GetTransactionTypes();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<CountryDTO> GetCountries()
        {
            var response = _masterDataService.GetCountries();
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<ClientCountryDTO> GetClientCountries()
        {
            var response = _masterDataService.GetClientCountries();
            return response;
        }

        [HttpGet("[action]/id")]
        public IEnumerable<Merchant> GetMerchants([FromBody] int id)
        {
            var response = _masterDataService.GetMerchants(id);
            return response;
        }

        [HttpGet("[action]")]
        public IEnumerable<TransactionStatus> GetTransactionStatus()
        {
            var response = _masterDataService.GetTransactionStatus();
            return response;
        }
    }
}
