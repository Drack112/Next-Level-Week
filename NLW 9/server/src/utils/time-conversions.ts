export function convertHourStringToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	const timeInMinutes = hours * 60 + minutes;
	return timeInMinutes;
}

export function convertMinutesToHourString(minutesAmount: number): string {
	const hours = Math.floor(minutesAmount / 60);
	const minutes = minutesAmount % 60;
	const timeString = `${String(hours).padStart(2, '0')}:${String(
		minutes
	).padStart(2, '0')}`;
	return timeString;
}
