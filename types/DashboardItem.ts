export default interface DashboardItem {
	messageBox: string | null;
	customer: string;
	isTransactionCompleted?: string | null;
	outOfFive?: string | null;
}
