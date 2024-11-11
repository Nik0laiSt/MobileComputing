import { Calendar } from '@bryntum/calendar';

const calendar = new Calendar({
    height   : 560,
    date     : new Date(2020, 8, 1),
    modes    : {
        day    : null,
        week   : null,
        month  : true,
        year   : null,
        agenda : null
    }
});