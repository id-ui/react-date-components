# React Date Components

[![NPM](https://img.shields.io/npm/v/@idui/react-date-components.svg)](https://www.npmjs.com/package/@idui/react-date-components/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-date-components)](https://www.npmjs.com/package/@idui/react-date-components)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-date-components/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-date-components?branch=main)
[![LICENSE](https://img.shields.io/github/license/id-ui/react-date-components)](https://github.com/id-ui/react-date-components/blob/main/LICENSE)


## Advantages
- Easily customisable;
- uses styled-components
- supports custom renderers for almost all components
- validates any date format and does not require specifying validation
- guesses date format on paste

## Install

```bash
npm install --save @idui/react-date-components
```

```bash
yarn add @idui/react-date-components
```

### Calendar

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/calendar--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/calendar--playground)

```jsx
import React from 'react'
import { Calendar } from '@idui/react-date-components'

function CalendarExample() {
  return <Calendar />
}
```

### DatePicker

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/datepicker--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/datepicker--playground)

```jsx
import React, { useState } from 'react'
import { DatePicker } from '@idui/react-date-components'

function DatePickerExample(props) {
    const [value, setValue] = useState();

    return <DatePicker {...props} value={value} onChange={setValue} />;
}
```

### DateInput

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/dateinput--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/dateinput--playground)

```jsx
import React, { useState } from 'react'
import { DateInput } from '@idui/react-date-components'

function DateInputExample(props) {
    const [value, setValue] = useState();

    return <DateInput {...props} value={value} onChange={setValue} />;
}
```

### DateRangePicker

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/daterangepicker--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/daterangepicker--playground)

```jsx
import React, { useState } from 'react'
import { DateRangePicker } from '@idui/react-date-components'

function DateRangePickerExample(props) {
    const [value, setValue] = useState();

    return <DateRangePicker {...props} value={value} onChange={setValue} />;
}
```

### DateRangeInput

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/daterangeinput--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/daterangeinput--playground)

```jsx
import React, { useState } from 'react'
import { DateRangeInput } from '@idui/react-date-components'

function DateRangeInputExample(props) {
    const [value, setValue] = useState();

    return <DateRangeInput {...props} value={value} onChange={setValue} />;
}
```

### TimePicker

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/timepicker--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/timepicker--playground)

```jsx
import React, { useState } from 'react'
import { TimePicker } from '@idui/react-date-components'

function TimePickerExample(props) {
    const [value, setValue] = useState();

    return <TimePicker {...props} value={value} onChange={setValue} />;
}
```

### TimeInput

- [Docs](https://id-ui.github.io/react-date-components/?path=/docs/timeinput--playground)
- [Playground](https://id-ui.github.io/react-date-components/?path=/story/timeinput--playground)

```jsx
import React, { useState } from 'react'
import { TimeInput } from '@idui/react-date-components'

function TimeInputExample(props) {
    const [value, setValue] = useState();

    return <TimeInput {...props} value={value} onChange={setValue} />;
}
```

### Custom renderers

- You can provide custom renderers renderHeader, renderWeek, renderDay to every date component
- You can provide custom renderer renderOption to every time component
- Read more in storybook docs

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)