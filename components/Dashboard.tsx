import useDashboardQuery from "../hooks/useDashboardQuery";
import DashboardItem from "../types/DashboardItem";

import useCompleteTransactionMutation from "../hooks/useCompleteTransactionMutation";
import quickTimeOrDate from "../utils/quickTimeOrDate";

export interface Properties {
	openMessageBox: (value: string) => void;
}

export default function Dashboard(props: Properties) {
	const { data } = useDashboardQuery();
	const completeTransactionMutation = useCompleteTransactionMutation();

	return (
		<div className="w-screen lg:flex-grow lg:w-2/3 p-10" id="dashboard">
			<h2 className="mb-10 font-thin text-xl">Last 10 Customers</h2>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between">
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Customer
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Start at
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Transaction
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Out of 5
					</div>
					<div className="hidden lg:flex flex-1 text-sm font-semibold text-gray-400">
						Note
					</div>
				</div>
				{data?.map((dashboardItem: DashboardItem) => (
					<div key={dashboardItem.id} className="flex justify-between">
						<div className="flex flex-1">
							<span
								className="cursor-pointer underline"
								onClick={() => props.openMessageBox(dashboardItem.id)}
							>
								{dashboardItem.customer}
							</span>
						</div>
						<div className="flex flex-1">
							{quickTimeOrDate(dashboardItem.date)}
						</div>
						<div className="flex flex-1 text-gray-600 truncate">
							{dashboardItem.isTransactionCompleted ? (
								<p>{quickTimeOrDate(dashboardItem.isTransactionCompleted)}</p>
							) : (
								<>
									<a
										className="cursor-pointer underline"
										onClick={() => {
											completeTransactionMutation.mutate(dashboardItem.id);
											props.openMessageBox(dashboardItem.id);
										}}
									>
										<span className="hidden lg:block">Mark as completed</span>
										<span className="lg:hidden">Mark</span>
									</a>
								</>
							)}
						</div>
						<div className="flex flex-1 truncate">
							{dashboardItem.outOfFive ? (
								<p>{dashboardItem.outOfFive}/5</p>
							) : (
								""
							)}
						</div>
						<div className="hidden lg:flex flex-1 text-gray-600">
							{dashboardItem.transactionNote ?? ""}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
