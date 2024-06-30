export enum SelectTodo {
  TITLE = '0',
  DATE_ASC = '1',
  DATE_DESC = '2',
}

export enum MenuNavigation {
  USER = '1',
  HOME = '2',
  TODO_LIST = '3',

  TODAY = '10',
  TOMORROW = '11',
  ACCOMPLISHED = '12',
  ALL_TODO = '13',

  LOGOUT = 'logout'
}

export enum Complete {
  TRUE='true',
  FALSE='false',
}

export enum RelativeTime {
  OTHER = 'other',
  YESTERDAY = '-1',
  TODAY = '0',
  TOMORROW = '1',
  ACCOMPLISHED = Complete.TRUE,
  EXIT = 'exit',
}
