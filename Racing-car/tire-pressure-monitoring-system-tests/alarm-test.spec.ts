import Alarm from '../tire-pressure-monitoring-system/alarm';

describe('Tyre Pressure Monitoring System', () => {

	describe('Alarm', () => {

		it('foo', () => {
			const alarm = new Alarm();
			expect(alarm.isAlarmOn()).toEqual(false);
		});

	});

});