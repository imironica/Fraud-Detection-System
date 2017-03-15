	export class Transaction {

		constructor() {
        
		}
		transactionType: string;
		transactionTypeFeature: Number;
		amount: Number;
		merchantCode: string;
		outletCode: string;
		cardNumber: string;
		cardType: string;
		cardTypeFeature: Number;
		transactionID: string;
		cardExpiryDate: Date;
	
		transactionDate: Date;
		transactionTime: Date;

		longitude: Number;
		latitude: Number;

		transactionCurency: string;
		loginAtemptsFeature: Number;
		country : string;
		countryFeature: Number;

		amountEUR: Number;
		exchangeRate: Number;
		clientCountry : string;
		ClientCountryFeature: Number;
		lastTransactionDate: Date;
		amountOfSpentMoneyPerDay: Number;
		amountOfSpentMoneyPerMonth: Number;
		insertedTime: Date;
		status: string;
		statusCode: string;
		fraudProbability: Number;
	} 

