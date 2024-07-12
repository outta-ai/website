import dayjs from "dayjs";

export function shortDate(date: Date) {
	const now = dayjs(new Date());
	const target = dayjs(date);

	if (now.year() === target.year()) {
		if (now.month() === target.month() && now.date() === target.date()) {
			return target.format("HH:mm");
		}
		return target.format("MM/DD");
	}
	return target.format("YY/MM/DD");
}
