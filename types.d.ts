import * as React from 'react';
import {Moment} from 'moment';
import {StyledComponent} from 'styled-components';
import {InputColors} from '@idui/react-inputs';

interface CalendarHeaderProps {
    /**
     * handler, that leads to the previous page
     */
    goToNextPage: React.EventHandler<void>;
    /**
     * handler, that leads to the next page
     */
    goToPreviousPage: React.EventHandler<void>;
    /**
     * date, that represents month and year for current page
     */
    date: Moment;
    /**
     * moment format for page header date
     */
    format: string;
    /**
     * arrow size
     * @default 14px
     */
    controlSize?: string;
    /**
     * colors theme
     */
    colors?: {
        /**
         * arrow color
         * @default '#A569ED'
         */
        color: string;
        /**
         * arrow hover color
         * @default '#7546AE'
         */
        hoverColor: string;
        /**
         * month and year color
         * @default '#7546AE'
         */
        monthAndYear: string;
    };
    /**
     * header className
     */
    className?: string;
}

export class CalendarHeader extends React.Component<CalendarHeaderProps> {}

export const Week: StyledComponent;
export const Day: StyledComponent;

export type DayState = 'default' | 'current' | 'active' | 'disabled'

interface ColorsShape {
    background?: string;
    color?: string;
}

interface CommonProps {
    /**
     * Calendar page header date format
     * @default 'MMMM YYYY'
     */
    headerFormat?: string;
    /**
     * event fired on calendar page change with date month of which corresponds to the current calendar page
     */
    onChangePage?: (date: Moment) => void;
    /**
     * calendar header renderer
     * @param props
     * @default (props) => <CalendarHeader {...props}/>
     */
    renderHeader?: (props: HeaderProps) => React.ReactChildren;
    /**
     * week row renderer
     * @param weekDays
     * @default (weekDays) => (<Week>{weekDays.map((item) => <Day key={item}>{item}</Day>)}</Week>)
     */
    renderWeek?: (weekDays: array[]) => React.ReactChild;
    /**
     * colors theme
     */
    colors?: {
        day: {
            default: ColorsShape;
            active: ColorsShape;
            current: ColorsShape;
            disabled: ColorsShape;
            hover: ColorsShape;
        };
        controls: {
            color: string;
            hoverColor: string;
            monthAndYear: string;
        };
    };
}

export interface CalendarProps extends CommonProps {
    /**
     * date with month corresponding to the current calendar page
     * @default current date
     */
    date?: string | Date | Moment;
    /**
     * calendar day renderer
     * @param Moment
     * @param DayState
     * @default ({ date, state }) => (<Day state={state}>{date.date()}</Day>)
     */
    renderDay?: ({ date: Moment, state: DayState }) => React.ReactChild;
}

export class Calendar extends React.Component<CalendarProps> {}

interface CommonPickerProps extends CommonProps {
    /**
     * function that should return boolean if day can be selected
     */
    isDateDisabled?: (date: Moment) => boolean;
}

export interface DatePickerDayProps {
 date: Moment;
 state: DayState;
 isFirstInRange: boolean;
 isLastInRange: boolean;
 onClick: React.EventHandler<void>;
}

export interface DatePickerProps extends CommonPickerProps {
    /**
     * DatePicker value
     */
    value?: string | Moment;
    /**
     * moment format for value (onChange will be called with formatted value if outputFormat specified otherwise with Moment object)
     */
    outputFormat?: string;
    /**
     * onChange event handler
     */
    onChange?: (value: string | Moment) => void;
    /**
     * calendar day renderer
     * @param DatePickerDayProps
     * @default ({ date, state, onClick }) => (<Day state={state} onClick={onClick}>{date.date()}</Day>)
     */
    renderDay?: (props: DatePickerDayProps) => React.ReactChild;
}

export class DatePicker extends React.Component<DatePickerProps> {}


export interface DateRangePickerDayProps {
    date: Moment;
    state: DayState;
    onMouseDown: React.EventHandler<void>;
    onMouseMove: React.EventHandler<void>;
    onMouseUp: React.EventHandler<void>;
}

export interface DateRangePickerProps extends CommonPickerProps {
    /**
     * DateRangePicker value
     */
    value?: string[] | Moment[];
    /**
     * moment format for value (onChange will be called with formatted value if outputFormat specified otherwise with Moment object)
     */
    outputFormat?: string;
    /**
     * onChange event handler
     */
    onChange?: (value: string[] | Moment[]) => void;
    /**
     * calendar day renderer
     * @param DateRangePickerDayProps
     * @default ({ date, state, ...handlers }) => (<Day state={state} {...handlers}>{date.date()}</Day>)
     */
    renderDay?: (props: DateRangePickerDayProps) => React.ReactChild;
}

export class DateRangePicker extends React.Component<DateRangePickerProps> {}


interface CommonDateInputProps {
    /**
     * moment format for value
     * DD/MM/YYYY
     */
    outputFormat?: string;
    /**
     * input mask placeholder
     */
    maskPlaceholder?: string;
    /**
     * input placeholder
     */
    placeholder?: string;
    /**
     * whether close DatePicker on date select or not
     * @default true
     */
    closeOnSelect?: boolean;
    /**
     * colors theme
     */
    colors?: {
        day: {
            default: ColorsShape;
            active: ColorsShape;
            current: ColorsShape;
            disabled: ColorsShape;
            hover: ColorsShape;
        };
        input: InputColors;
        controls: {
            color: string;
            hoverColor: string;
            monthAndYear: string;
        };
    };
}

export interface DateInputProps extends DatePickerProps, CommonDateInputProps {
    /**
     * DateInput value
     */
    value?: string;
}

export class DateInput extends React.Component<DateInputProps> {}


export interface DateRangeInputProps extends DateRangePickerProps, CommonDateInputProps {
    /**
     * DateRangeInput value
     */
    value?: string[];
}

export class DateRangeInput extends React.Component<DateRangeInputProps> {}

export interface TimeOptionProps {
    /**
     * React key
     */
    key: string;
    /**
     * is option selected
     */
    isSelected: boolean;
    /**
     * onClick event handler
     */
    onClick?: React.EventHandler<void>;
    /**
     * option
     */
    data: object;
    /**
     * option value key
     */
    valueKey: string;
    /**
     * option label key
     */
    labelKey: string;
    /**
     * divider between hours and minutes
     */
    divider: React.ReactNode;
    /**
     * whether option leads to another option or not
     */
    withRedirect?: boolean;
    /**
     * colors theme
     */
    colors?: {
        active: ColorsShape;
        default: ColorsShape;
        disabled: ColorsShape;
    };
}

export interface TimePickerProps {
    /**
     * custom array of time options {[valueKey]: String, [labelKey]: String}
     */
    options?: object[];
    /**
     * time slot in minutes for generating options
     * @default 60
     */
    timeSlot?: number;
    /**
     * moment format for value (onChange will be called with formatted value if no custom options)
     * @default HH:mm
     */
    outputFormat?: string;
    /**
     * current value
     */
    value?: string;
    /**
     * mark defaultSelectedValue as selected if no value
     * @default true
     */
    showDefaultSelectionIfNoValue?: boolean;
    /**
     * default selected value
     * @default first option value
     */
    defaultSelectedValue?: string;
    /**
     * option value key
     * @default value
     */
    valueKey?: string;
    /**
     * option label key
     * @default label
     */
    labelKey?: string;
    /**
     * onChange event handler
     */
    onChange?: (value: any) => void;
    /**
     * function that accepts time string and should return boolean if this time can be selected (disabled options will be excluded)
     */
    isTimeDisabled?: (value: any) => boolean;
    /**
     * count of visible items. Should be odd.
     * @default 7
     */
    visibleOptionsCount?: number;
    /**
     * divider between hours and minutes
     * @default :
     */
    divider?: string;
    /**
     * custom option renderer
     */
    renderOption?: (props: TimeOptionProps) => React.ReactChild;
    /**
     * colors theme
     */
    colors?: {
        time: {
            active: ColorsShape;
            default: ColorsShape;
            disabled: ColorsShape;
        };
    };
}

export class TimePicker extends React.Component<TimePickerProps> {}


export interface TimeInputProps extends TimePickerProps {
    /**
     * input mask placeholder
     * @default __:__
     */
    maskPlaceholder?: string;
    /**
     * input placeholder
     */
    placeholder?: string;
    /**
     * colors theme
     */
    colors?: {
        time: {
            active: ColorsShape;
            default: ColorsShape;
            disabled: ColorsShape;
        };
        input: InputColors;
    };
}

export class TimeInput extends React.Component<TimeInputProps> {}
