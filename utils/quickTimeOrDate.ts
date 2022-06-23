import isToday from "./isToday";

export default (date: string): string => {
	return isToday(date)
		? new Date(date).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
		  })
		: new Date(date).toLocaleDateString();
};
