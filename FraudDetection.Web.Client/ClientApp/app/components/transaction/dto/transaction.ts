import { ClientCountry } from './ClientCountry';

export class Transaction {

		constructor() {
        
        }
        transactionId: Number;
		transactionType: string;
		transactionTypeFeature: Number;
        amount: Number;
        cardNumber: string;
        cardNumberFeature: Number;
        cardExpiryDate: string;
        cardExpiryDateFeature: Date;
        cardStartFeature: Number;
        cardEndFeature: Number;
        cardType: string;
        cardTypeFeature: Number;
        cardVendor: string;
        cardVendorFeature: Number;
        transactionTime: string;
        transactionDate: string;
        transactionDateTimeFeature: Number;
        longitude: Number;
        latitude: Number;
        loginAtempts: Number;
        country: string;
        countryFeature: Number;
        merchant: string;
        merchantFeature: Number;

        clientCountry: string;
		ClientCountryFeature: Number;
        lastTransactionDate: Date;
        lastTransactionDateFeature: Number;
		amountOfSpentMoneyPerDay: Number;
		amountOfSpentMoneyPerMonth: Number;
        prediction: Number;
        class: Number;
        fraudProbability: Number;
        verified: boolean;
	} 

