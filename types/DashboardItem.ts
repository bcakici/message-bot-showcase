export default interface DashboardItem {
	id: string;
	customer: string;
	isTransactionCompleted?: string | null;
	outOfFive?: string | null;
	transactionNote?: string | null;
	date: string;
}
