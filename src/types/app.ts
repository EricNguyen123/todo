export type RouteType = {
    path: string;
    component: () => JSX.Element;
    exact: boolean;
    isPublic: boolean;
};

export type SelectTodoOptionsType = {
  [key: string]: {
    sortBy: string;
    order: string;
  };
};

export type StylesCardTodoType = {
  [key: string]: string
}
