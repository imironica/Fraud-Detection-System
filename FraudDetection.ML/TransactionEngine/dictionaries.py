client_contries = [
    {"id" :1, "name": "USA", "probability": 0.18},
    {"id": 2, "name": "France", "probability": 0.06},
    {"id": 3, "name": "Germany", "probability": 0.06},
    {"id": 4, "name": "United Kingdom", "probability": 0.06},
    {"id": 5, "name": "Romania", "probability": 0.02},
    {"id": 6, "name": "Spain", "probability": 0.04},
    {"id": 7, "name": "Italy", "probability": 0.05},
    {"id": 8, "name": "Norway", "probability": 0.03},
    {"id": 9, "name": "India", "probability": 0.06},
    {"id": 10, "name": "China", "probability": 0.12},
    {"id": 11, "name": "South Korea", "probability": 0.06},
    {"id": 12, "name": "Canada", "probability": 0.05},
    {"id": 13, "name": "Brazil", "probability": 0.08},
    {"id": 14, "name": "Poland", "probability": 0.02},
    {"id": 15, "name": "Australia", "probability": 0.03},
    {"id": 16, "name": "Russia", "probability": 0.05},
    {"id": 17, "name": "Nigeria", "probability": 0.03},
]
card_vendors = [
    { "id": 1, "name": "American Express" , "cardstart":3 },
    { "id": 2, "name": "Visa" , "cardstart":4 },
    { "id": 3, "name": "MasterCard" , "cardstart":5 }
]

transaction_types = [
    {
        "id" : 1,
        "name" : "E-Commenrce",
        "probability" : 0.4

    },
    {
        "id": 2,
        "name": "ATM",
        "probability" : 0.5

    },
    {
        "id": 3,
        "name": "POS",
        "probability" : 0.1

    },
]

card_types = [
    {
        "id" : 1,
        "name": "Credit",
        "probability": 0.5
    },
    {
        "id" : 2,
        "name": "Debit",
        "probability": 0.4
    },
    {
        "id" : 3,
        "name": "Other",
        "probability": 0.1
    },
]

countries = [
    {
        "id":1,
        "name":"USA",
        "probability":0.28,
        "longitude": {
            "min": 33,
            "max": 45
        },
        "latitude": {
            "min": -121,
            "max": -77
        },
        "merchants":[
            {
                "id": 1,
                "name":'Wal-Mart Stores',
                "probability":0.1
            },
            {
                "id": 2,
                "name":'The Kroger Co.',
                "probability":0.1
            },
            {
                "id": 3,
                "name":'Costco',
                "probability":0.1
            },
{
                "id": 4,
                "name":'The Home Depot',
                "probability":0.1
            },
            {
                "id":5,
                "name":'Walgreens Boots Alliance',
                "probability":0.1
            },
            {
                "id": 6,
                "name":'Lowe’s Companies',
                "probability":0.1
            },
{
                "id": 7,
                "name":'Best Buy',
                "probability":0.1
            },
            {
                "id": 8,
                "name":'Apple Stores / iTunes',
                "probability":0.1
            },
            {
                "id": 9,
                "name":'Publix Super Markets',
                "probability":0.1
            },
{
                "id": 10,
                "name":'Macy’s',
                "probability":0.1
            }
        ]
    },
    {
        "id": 2,
        "name": "China",
        "probability": 0.22,
        "longitude": {
            "min": 99,
            "max": 119
        },
        "latitude": {
            "min": 23,
            "max": 39
        },
        "merchants":[
            {
                "id": 1,
                "name":'Gome Home Appliance Group',
                "probability":0.1
            },
            {
                "id": 2,
                "name":'Suning Appliance Company Ltd.',
                "probability":0.1
            },
            {
                "id": 3,
                "name":'Dalian Dashang Group',
                "probability":0.1
            },
            {
                "id": 4,
                "name":'Nonggongshang Supermarket Group Company Ltd.',
                "probability":0.1
            },
            {
                "id":5,
                "name":'Shandong Jianyuan Bioengineering co. Ltd',
                "probability":0.1
            },
            {
                "id": 6,
                "name":'Carrefour China',
                "probability":0.1
            },
{
                "id": 7,
                "name":'Wal-Mart (China) Investment co. Ltd.',
                "probability":0.1
            },
            {
                "id": 8,
                "name":'Yonghui Superstores Co. Ltd.',
                "probability":0.1
            },
            {
                "id": 9,
                "name":'Tesco China',
                "probability":0.1
            },
            {
                "id": 10,
                "name":'Lianhua Holdings co. ,Ltd',
                "probability":0.1
            }
        ]
    },
    {
        "id": 3,
        "name": "United Kingdom",
        "probability": 0.1,
        "longitude": {
            "min": -3.5,
            "max": 0.75
        },
        "latitude": {
            "min": 51,
            "max": 53
        },
        "merchants":[
            {
                "id": 1,
                "name": 'Alliance Boots',
                "probability":0.1
            },
            {
                "id": 2,
                "name":'Asda',
                "probability":0.1
            },
            {
                "id": 3,
                "name":'Co-operative Group',
                "probability":0.1
            },
{
                "id": 4,
                "name":'Home Retail Group',
                "probability":0.1
            },
            {
                "id":5,
                "name":'J Sainsbury',
                "probability":0.1
            },
            {
                "id": 6,
                "name":'John Lewis Partnership',
                "probability":0.1
            },
            {
                "id": 7,
                "name":'Kingfisher Group',
                "probability":0.1
            },
            {
                "id": 8,
                "name":'Marks & Spencer',
                "probability":0.1
            },
            {
                "id": 9,
                "name":'Morrisons',
                "probability":0.1
            },
            {
                "id": 10,
                "name":'Tesco',
                "probability":0.1
            }
        ]
    },
    {
        "id": 4,
        "name": "France",
        "probability": 0.1,
        "longitude": {
            "min": -1.35,
            "max": 5.75
        },
        "latitude": {
            "min": 44,
            "max": 50
        },
        "merchants":[
            {
                "id": 1,
                "name":'Écomarché',
"probability":0.1
            },
            {
                "id": 2,
                "name":'Vêti',
"probability":0.1
            },
            {
                "id": 3,
                "name":'Vival',
"probability":0.1
            },
{
                "id": 4,
                "name":'Utile',
"probability":0.1
            },
            {
                "id":5,
                "name":'Marché Plus',
"probability":0.1
            },
            {
                "id": 6,
                "name":'Monoprix',
"probability":0.1
            },
{
                "id": 7,
                "name": 'Géant',
"probability":0.1
            },
            {
                "id": 8,
                "name":'Auchan',
"probability":0.1
            },
            {
                "id": 9,
                "name":'Bricomarché',
"probability":0.1
            },
{
                "id": 10,
                "name":'Carrefour',
"probability":0.1
            }
        ]
    },
    {
        "id": 5,
        "name": "Germany",
        "probability": 0.1,
        "longitude": {
            "min": 7.5,
            "max": 14
        },
        "latitude": {
            "min": 48.5,
            "max": 53.5
        },
        "merchants":[
            {
                "id": 1,
                "name":'Aldi',
"probability":0.1
            },
            {
                "id": 2,
                "name":'DM-Drogeriemarkt',
"probability":0.1
            },
            {
                "id": 3,
                "name":'IKEA',
"probability":0.1
            },
{
                "id": 4,
                "name":'REWE',
"probability":0.1
            },
            {
                "id":5,
                "name": 'Karstadt',
"probability":0.1
            },
            {
                "id": 6,
                "name":'Rossmann',
"probability":0.1
            },
{
                "id": 7,
                "name":'Kaufland',
"probability":0.1
            },
            {
                "id": 8,
                "name":'Fielmann',
"probability":0.1
            },
            {
                "id": 9,
                "name":'Weltbild',
"probability":0.1
            },
{
                "id": 10,
                "name":'Lidl',
"probability":0.1
            }
        ]
    },
    {
        "id": 6,
        "name": "Brazil",
        "probability": 0.15,
        "longitude": {
            "min": -59,
            "max": -37
        },
        "latitude": {
            "min": -21.5,
            "max": -1.5
        },
        "merchants":[
            {
                "id": 1,
                "name":'Companhia Brasileira de Distribuição',
"probability":0.1
            },
            {
                "id": 2,
                "name":'Carrefour Comércio e Indústria Ltda.',
"probability":0.1
            },
            {
                "id": 3,
                "name":'Wal-Mart Brasil Ltda.',
"probability":0.1
            },
{
                "id": 4,
                "name":'Cencosud Brasil Comercial Ltda.',
"probability":0.1
            },
            {
                "id":5,
                "name":'Companhia Zaffari Comércio e Indústria',
"probability":0.1
            },
            {
                "id": 6,
                "name":'Irmãos Muffato e Cia Ltda.',
"probability":0.1
            },
{
                "id": 7,
                "name":'Condor Super Center Ltda.',
"probability":0.1
            },
            {
                "id": 8,
                "name":'Supermercados BH Comércio de Alimentos Ltda.',
"probability":0.1
            },
            {
                "id": 9,
                "name":'Sonda Supermercados Exportação e Importação ',
"probability":0.1
            },
{
                "id": 10,
                "name":'SDB Comércio de Alimentos Ltda.',
"probability":0.1
            }
        ]
    },

    {
        "id": 7,
        "name": "Romania",
        "probability": 0.05,
        "longitude": {
            "min": 44,
            "max": 47
        },
        "latitude": {
            "min": 23,
            "max": 27
        },
        "merchants":[
            {
                "id": 1,
                "name":'Auchan',
"probability":0.1
            },
            {
                "id": 2,
                "name":'eMag',
"probability":0.1
            },
            {
                "id": 3,
                "name":'Mega Image',
"probability":0.1
            },
{
                "id": 4,
                "name":'Selgros',
"probability":0.1
            },
            {
                "id":5,
                "name":'Cora',
"probability":0.1
            },
            {
                "id": 6,
                "name":'Kaufland',
"probability":0.1
            },
{
                "id": 7,
                "name":'Flanco',
"probability":0.1
            },
            {
                "id": 8,
                "name":'Hornbach',
"probability":0.1
            },
            {
                "id": 9,
                "name":'bauMax',
"probability":0.1
            },
{
                "id": 10,
                "name":'KIKA',
"probability":0.1
            }
        ]
    },

]
