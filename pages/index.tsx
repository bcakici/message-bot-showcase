import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import MessageView from "../components/MessageView";
import scenarios from "../data/scenarios.json";
import runScenario from "../hooks/runScenario";

export interface Message {
	text: string;
	isCustomer: boolean;
}

const Home: NextPage = () => {
	const [messageBoxID, setMessageBoxID] = useState("");

	const runScenarioHook = runScenario(setMessageBoxID);

	useEffect(() => {
		runScenarioHook(scenarios.hamburger);
	}, []);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex  w-full h-screen bg-gray-800 text-white p-10 ">
				<div className="flex flex-col justify-center lg:flex-row w-full max-w-screen-2xl mx-auto">
					<div className="w-screen lg:flex-grow lg:w-2/3 p-10">
						<h2 className="mb-10 font-thin text-xl">
							Are customers satisfied?
						</h2>
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
						</div>
					</div>
					<div className="flex flex-col lg:w-1/3 h-5/6">
						<div className="flex my-10">
							<a
								className="text-orange-400 inline-flex items-center ml-4"
								onClick={() => {
									runScenarioHook(scenarios.hamburger);
								}}
							>
								Run scenario
								<svg
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									className="w-4 h-4 ml-2"
									viewBox="0 0 24 24"
								>
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</a>
						</div>
						<MessageView messageBoxID={messageBoxID}></MessageView>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
