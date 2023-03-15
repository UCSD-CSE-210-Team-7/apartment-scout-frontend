import "../../test_setup";
import { render as _r, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../auth";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

function render(children, params = {}) {
  const { initialEntries = ["/test"], mocks = [] } = params;
  return _r(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}
import { execute, gql, ApolloLink } from "@apollo/client";
import { ApolloProvider, getLink } from "../apollo";

jest.mock("@apollo/client", () => {
  const originalModule = jest.requireActual("@apollo/client");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    ApolloProvider: () => <h1>test</h1>,
    HttpLink: function () {
      this.request = (operation, forward) => {
        operation.setContext((data) => {
          return {
            ...data,
            transport: "http",
          };
        });

        return forward(operation);
      };
    },
  };
});

jest.mock("@apollo/client/link/subscriptions", () => {
  const originalModule = jest.requireActual(
    "@apollo/client/link/subscriptions"
  );

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    GraphQLWsLink: function () {
      this.request = (operation, forward) => {
        operation.setContext((data) => {
          return {
            ...data,
            transport: "ws",
          };
        });

        return forward(operation);
      };
    },
  };
});

function executeRequest(query, link) {
  execute(link, { query }).subscribe(() => {});
}

test("includes a reference apolloclient", () => {
  const { container } = render(<ApolloProvider />);

  expect(screen.getByText("test")).not.toBeNull();
});

test("sends query over HTTP", () => {
  const lastLink = new ApolloLink(
    jest.fn((operation) => {
      expect(operation.getContext().transport).toEqual("http");
      return null;
    })
  );

  const link = ApolloLink.from([getLink({ credential: "token" }), lastLink]);

  executeRequest(
    gql`
      query {
        foo
      }
    `,
    link
  );
  expect(lastLink.request).toHaveBeenCalled();
});

test("sends mutations over HTTP", () => {
  const lastLink = new ApolloLink(
    jest.fn((operation) => {
      expect(operation.getContext().transport).toEqual("http");
      return null;
    })
  );

  const link = ApolloLink.from([getLink({ credential: "token" }), lastLink]);

  executeRequest(
    gql`
      mutation {
        foo
      }
    `,
    link
  );
  expect(lastLink.request).toHaveBeenCalled();
});

test("sends subscriptions over ws", () => {
  const lastLink = new ApolloLink(
    jest.fn((operation) => {
      expect(operation.getContext().transport).toEqual("ws");
      return null;
    })
  );

  const link = ApolloLink.from([getLink({ credential: "token" }), lastLink]);

  executeRequest(
    gql`
      subscription {
        foo
      }
    `,
    link
  );
  expect(lastLink.request).toHaveBeenCalled();
});

test("sets the `Authorization` header to the correct value", () => {
  const lastLink = new ApolloLink(
    jest.fn((operation) => {
      expect(operation.getContext().headers.authorization).toEqual("token");
      return null;
    })
  );

  const link = ApolloLink.from([getLink({ credential: "token" }), lastLink]);

  executeRequest(
    gql`
      query {
        foo
      }
    `,
    link
  );
  expect(lastLink.request).toHaveBeenCalled();
});
