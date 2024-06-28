export type RouteType = {
    path: string;
    component: () => JSX.Element;
    exact: boolean;
    isPublic: boolean;
};
