export default {
  onChangePage: {
    action: 'onChangePage',
    description:
      'event fired on calendar page change with date month of which corresponds to the current calendar page',
  },
  headerFormat: {
    control: 'text',
    description: 'Calendar page header date format',
    defaultValue: 'MMMM YYYY',
    table: {
      defaultValue: {
        summary: 'MMMM YYYY',
      },
    },
  },
  renderHeader: {
    disable: true,
    description:
      'header renderer, accepts ({ goToNextPage, goToPreviousPage, date: page date (moment), format: headerFormat }) and should return calendar controls and info about date and month',
    table: {
      defaultValue: {
        summary:
          "(props) => <CalendarHeader {...props}/>. Header exported (import { CalendarHeader } from '@idui/react-date-components')",
      },
    },
  },
  renderWeek: {
    disable: true,
    description:
      'week renderer, accepts week days (you can use them or not) and should return week days row',
    table: {
      defaultValue: {
        summary: `(weekDays) => (<Week>{weekDays.map((item) => <Day key={item}>{item}</Day>)}</Week>). 
Day and Week exported (import { Day, Week } from '@idui/react-date-components')`,
      },
    },
  },
};
