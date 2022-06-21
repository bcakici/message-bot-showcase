// check if current date is today
export default (date: string): boolean => {
	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth();
	const todayYear = today.getFullYear();
	const dateToCheck = new Date(date);
	const dateToCheckDate = dateToCheck.getDate();
	const dateToCheckMonth = dateToCheck.getMonth();
	const dateToCheckYear = dateToCheck.getFullYear();
	return (
		todayDate === dateToCheckDate &&
		todayMonth === dateToCheckMonth &&
		todayYear === dateToCheckYear
	);
};
