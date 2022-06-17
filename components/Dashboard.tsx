import useDashboardQuery from "../hooks/useDashboardQuery";
import DashboardItem from "../types/DashboardItem";

export default function Dashboard() {
	const { data } = useDashboardQuery();

	return (
		<div className="w-screen lg:flex-grow lg:w-2/3 p-10">
			<h2 className="mb-10 font-thin text-xl">Are customers satisfied?</h2>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between">
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Customer
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Transaction completed
					</div>
					<div className="flex flex-1 text-sm font-semibold text-gray-400">
						Happy
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
					<div className="flex flex-1">At 05.05.2022</div>
					<div className="flex flex-1">😁</div>
					<div className="flex flex-1">5/5</div>
					<div className="flex flex-1">It's peeerfect.</div>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-1">Joe</div>
					<div className="flex flex-1">
						<a>Mark as completed</a>
					</div>
					<div className="flex flex-1">:(</div>
					<div className="flex flex-1">2/5</div>
					<div className="flex flex-1">Could be better.</div>
				</div>
				{data?.map((dashboardItem: DashboardItem) => (
					<div className="flex justify-between">
						<div className="flex flex-1">{dashboardItem.customer}</div>
						<div className="flex flex-1">
							{dashboardItem.isTransactionCompleted ? (
								<p>
									at new
									Date(dashboardItem.isTransactionCompleted).toLocaleString()
								</p>
							) : (
								<a>Mark as completed</a>
							)}
						</div>
						<div className="flex flex-1"></div>
						<div className="flex flex-1">2/5</div>
						<div className="flex flex-1">Could be better.</div>
					</div>
				))}
			</div>
		</div>
	);
}
