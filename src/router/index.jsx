import { NotFoundRoute, Outlet, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "../App";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/v1",
  component: App,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h3 style={{textAlign: 'center'}}>Page not found</h3>,
});


const routeTree = rootRoute.addChildren([
  appRoute
]);

export const router = createRouter({ routeTree, notFoundRoute });
