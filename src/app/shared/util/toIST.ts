import * as moment from 'moment-timezone'

import { TZ } from '../../core/constants/env.constants'

export const convertTimeToIST = (date?: Date) => {
  return moment.tz(date ? date : new Date(), TZ).format()
}
