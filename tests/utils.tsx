import { render as rtlRender } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";

function render(
  path: string,
  element: React.ReactElement,
  children: any[] = [],
  initialEntries: string[] = [path]
) {
  let RemixStub = createRemixStub([
    {
      path,
      children,
    },
  ]);

  return rtlRender(<RemixStub initialEntries={initialEntries} />);
}

export * from "@remix-run/react";
export * from "@remix-run/testing";
export * from "@testing-library/react";

export { render };
