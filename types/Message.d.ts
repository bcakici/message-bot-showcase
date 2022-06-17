export default interface Message {
	id?: number | null;
	customerID?: number | null;
	text: string;
	date?: string | null;
	isCustomer: boolean;
	isBot?: boolean | null;
	messageBox?: string | null;
}
