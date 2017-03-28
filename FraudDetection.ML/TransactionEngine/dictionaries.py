ClientCountries = [
    {"ClientCountryId" :1, "Name": "USA", "Probability": 0.18},
    {"ClientCountryId": 2, "Name": "France", "Probability": 0.06},
    {"ClientCountryId": 3, "Name": "Germany", "Probability": 0.06},
    {"ClientCountryId": 4, "Name": "United Kingdom", "Probability": 0.06},
    {"ClientCountryId": 5, "Name": "Romania", "Probability": 0.02},
    {"ClientCountryId": 6, "Name": "Spain", "Probability": 0.04},
    {"ClientCountryId": 7, "Name": "Italy", "Probability": 0.05},
    {"ClientCountryId": 8, "Name": "Norway", "Probability": 0.03},
    {"ClientCountryId": 9, "Name": "India", "Probability": 0.06},
    {"ClientCountryId": 10, "Name": "China", "Probability": 0.12},
    {"ClientCountryId": 11, "Name": "South Korea", "Probability": 0.06},
    {"ClientCountryId": 12, "Name": "Canada", "Probability": 0.05},
    {"ClientCountryId": 13, "Name": "Brazil", "Probability": 0.08},
    {"ClientCountryId": 14, "Name": "Poland", "Probability": 0.02},
    {"ClientCountryId": 15, "Name": "Australia", "Probability": 0.03},
    {"ClientCountryId": 16, "Name": "Russia", "Probability": 0.05},
    {"ClientCountryId": 17, "Name": "Nigeria", "Probability": 0.03},
]
CardVendors = [
    { "CardVendorId": 1, "Name": "American Express" , "CardStart":3 },
    { "CardVendorId": 2, "Name": "Visa" , "CardStart":4 },
    { "CardVendorId": 3, "Name": "MasterCard" , "CardStart":5 }
]

TransactionTypes = [
    {
        "TransactionTypeId" : 1,
        "Name" : "E-Commenrce",
        "Probability" : 0.4

    },
    {
        "TransactionTypeId": 2,
        "Name": "ATM",
        "Probability" : 0.5

    },
    {
        "TransactionTypeId": 3,
        "Name": "POS",
        "Probability" : 0.1

    },
]

CardTypes = [
    {
        "CardTypeId" : 1,
        "Name": "Credit",
        "Probability": 0.5
    },
    {
        "CardTypeId" : 2,
        "Name": "Debit",
        "Probability": 0.4
    },
    {
        "CardTypeId" : 3,
        "Name": "Other",
        "Probability": 0.1
    },
]

Countries = [
    {
        "CountryId":1,
        "Name":"USA",
        "Probability":0.28,
        "Longitude": {
            "Min": -121,
            "Max": -77
        },
        "Latitude": {
            "Min": 33,
            "Max": 45
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Wal-Mart Stores',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'The Kroger Co.',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Costco',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'The Home Depot',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'Walgreens Boots Alliance',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Lowe’s Companies',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name":'Best Buy',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Apple Stores / iTunes',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Publix Super Markets',
                "Probability":0.1
            },
{
                "MerchantId": 10,
                "Name":'Macy’s',
                "Probability":0.1
            }
        ]
    },
    {
        "CountryId": 2,
        "Name": "China",
        "Probability": 0.22,
        "Longitude": {
            "Min": 99,
            "Max": 119
        },
        "Latitude": {
            "Min": 23,
            "Max": 39
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Gome Home Appliance Group',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'Suning Appliance Company Ltd.',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Dalian Dashang Group',
                "Probability":0.1
            },
            {
                "MerchantId": 4,
                "Name":'Nonggongshang Supermarket Group Company Ltd.',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'Shandong Jianyuan Bioengineering co. Ltd',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Carrefour China',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name":'Wal-Mart (China) Investment co. Ltd.',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Yonghui Superstores Co. Ltd.',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Tesco China',
                "Probability":0.1
            },
            {
                "MerchantId": 10,
                "Name":'Lianhua Holdings co. ,Ltd',
                "Probability":0.1
            }
        ]
    },
    {
        "CountryId": 3,
        "Name": "United Kingdom",
        "Probability": 0.1,
        "Longitude": {
            "Min": -3.5,
            "Max": 0.75
        },
        "Latitude": {
            "Min": 51,
            "Max": 53
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name": 'Alliance Boots',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'Asda',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Co-operative Group',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'Home Retail Group',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'J Sainsbury',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'John Lewis Partnership',
                "Probability":0.1
            },
            {
                "MerchantId": 7,
                "Name":'Kingfisher Group',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Marks & Spencer',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Morrisons',
                "Probability":0.1
            },
            {
                "MerchantId": 10,
                "Name":'Tesco',
                "Probability":0.1
            }
        ]
    },
    {
        "CountryId": 4,
        "Name": "France",
        "Probability": 0.1,
        "Longitude": {
            "Min": -1.35,
            "Max": 5.75
        },
        "Latitude": {
            "Min": 44,
            "Max": 50
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Écomarché',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'Vêti',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Vival',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'Utile',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'Marché Plus',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Monoprix',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name": 'Géant',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Auchan',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Bricomarché',
                "Probability":0.1
            },
{
                "MerchantId": 10,
                "Name":'Carrefour',
                "Probability":0.1
            }
        ]
    },
    {
        "CountryId": 5,
        "Name": "Germany",
        "Probability": 0.1,
        "Longitude": {
            "Min": 7.5,
            "Max": 14
        },
        "Latitude": {
            "Min": 48.5,
            "Max": 53.5
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Aldi',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'DM-Drogeriemarkt',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'IKEA',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'REWE',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name": 'Karstadt',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Rossmann',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name":'Kaufland',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Fielmann',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Weltbild',
                "Probability":0.1
            },
{
                "MerchantId": 10,
                "Name":'Lidl',
                "Probability":0.1
            }
        ]
    },
    {
        "CountryId": 6,
        "Name": "Brazil",
        "Probability": 0.15,
        "Longitude": {
            "Min": -58,
            "Max": -37
        },
        "Latitude": {
            "Min": -21.5,
            "Max": -1.5
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Companhia Brasileira de Distribuição',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'Carrefour Comércio e Indústria Ltda.',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Wal-Mart Brasil Ltda.',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'Cencosud Brasil Comercial Ltda.',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'Companhia Zaffari Comércio e Indústria',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Irmãos Muffato e Cia Ltda.',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name":'Condor Super Center Ltda.',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Supermercados BH Comércio de Alimentos Ltda.',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'Sonda Supermercados Exportação e Importação ',
                "Probability":0.1
            },
{
                "MerchantId": 10,
                "Name":'SDB Comércio de Alimentos Ltda.',
                "Probability":0.1
            }
        ]
    },

    {
        "CountryId": 7,
        "Name": "Romania",
        "Probability": 0.05,
        "Longitude": {
            "Min": 23,
            "Max": 27
        },
        "Latitude": {
            "Min": 44,
            "Max": 47
        },
        "Merchants":[
            {
                "MerchantId": 1,
                "Name":'Auchan',
                "Probability":0.1
            },
            {
                "MerchantId": 2,
                "Name":'eMag',
                "Probability":0.1
            },
            {
                "MerchantId": 3,
                "Name":'Mega Image',
                "Probability":0.1
            },
{
                "MerchantId": 4,
                "Name":'Selgros',
                "Probability":0.1
            },
            {
                "MerchantId":5,
                "Name":'Cora',
                "Probability":0.1
            },
            {
                "MerchantId": 6,
                "Name":'Kaufland',
                "Probability":0.1
            },
{
                "MerchantId": 7,
                "Name":'Flanco',
                "Probability":0.1
            },
            {
                "MerchantId": 8,
                "Name":'Hornbach',
                "Probability":0.1
            },
            {
                "MerchantId": 9,
                "Name":'bauMax',
                "Probability":0.1
            },
{
                "MerchantId": 10,
                "Name":'KIKA',
                "Probability":0.1
            }
        ]
    },

]
