import useDashboardQuery from "../hooks/useDashboardQuery";
import DashboardItem from "../types/DashboardItem";
import isToday from "../utils/isToday";

export interface Properties {
	openMessageBox: (value: string) => void;
}

export default function Dashboard(props: Properties) {
	const { data } = useDashboardQuery();

	return (
		<div className="w-screen lg:flex-grow lg:w-2/3 p-10">
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
						Transaction completed
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Out of 5
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Review Note
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-1">Berkay</div>
					<div className="flex flex-1">Some date</div>
					<div className="flex flex-1">At 05.05.2022</div>
					<div className="flex flex-1">5/5</div>
					<div className="flex flex-1">It&apos;s peeerfect.</div>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-1">Joe</div>
					<div className="flex flex-1">Some date</div>
					<div className="flex flex-1">
						<a>Mark as completed</a>
					</div>
					<div className="flex flex-1">2/5</div>
					<div className="flex flex-1">Could be better.</div>
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
							{isToday(dashboardItem.date)
								? new Date(dashboardItem.date).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
								  })
								: new Date(dashboardItem.date).toLocaleDateString()}
						</div>
						<div className="flex flex-1 text-gray-600">
							{dashboardItem.isTransactionCompleted ? (
								<p>
									at new
									Date(dashboardItem.isTransactionCompleted).toLocaleString()
								</p>
							) : (
								<a>Mark as completed</a>
							)}
						</div>
						<div className="flex flex-1">
							{dashboardItem.outOfFive ? (
								<p>{dashboardItem.outOfFive}/5</p>
							) : (
								""
							)}
						</div>
						<div className="flex flex-1 text-gray-600">Very nice.</div>
					</div>
				))}
			</div>
		</div>
	);
}
