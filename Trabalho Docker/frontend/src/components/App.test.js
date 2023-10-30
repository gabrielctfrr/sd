import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const alimentos = [
  { _id: 1, title: "Alimento 1" },
  { _id: 2, title: "Alimento 2" },
  { _id: 3, title: "Alimento 3" },
];

const newAlimento = { _id: 4, title: "Novo alimento" };

const apiEndpoint = "http://localhost:4001/api/alimentos";

const server = setupServer(
  rest.get(apiEndpoint, (req, res, ctx) => res(ctx.json(alimentos))),
  rest.post(apiEndpoint, (req, res, ctx) => res(ctx.json(newAlimento))),
  rest.delete(apiEndpoint + "/" + alimentos[0]._id, (req, res, ctx) =>
    res(ctx.status(204))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Componente de aplicativo", () => {
  test("Renderiza todos os alimentos buscados no servidor", async () => {
    render(<App />);

    const listItems = await screen.findAllByRole("listitem");

    expect(listItems.length).toEqual(alimentos.length);
  });

  test("Exibe um erro se a chamada para o servidor falhar", async () => {
    server.use(rest.get(apiEndpoint, (req, res, ctx) => res(ctx.status(500))));

    render(<App />);

    await screen.findByRole("alert");
  });

  describe("Quando um novo alimento é adicionado", () => {
    test("O campo de entrada é limpo", async () => {
      await renderApp();

      addAlimento();
      await screen.findByText(newAlimento.title);

      const inputField = screen.getByLabelText("Novo Alimento");
      expect(inputField).toHaveValue("");
    });

    test("É adicionado à lista", async () => {
      await renderApp();

      addAlimento();

      await screen.findByText(newAlimento.title);
    });

    test("É removido da lista se a chamada para o servidor falhar", async () => {
      server.use(
        rest.post(apiEndpoint, (req, res, ctx) => res(ctx.status(500)))
      );

      await renderApp();

      addAlimento();

      await waitForElementToBeRemoved(() => screen.queryByText(newAlimento.title));
    });

    test("Um erro é exibido se a chamada para o servidor falhar", async () => {
      server.use(
        rest.post(apiEndpoint, (req, res, ctx) => res(ctx.status(500)))
      );

      await renderApp();

      addAlimento();

      const error = await screen.findByRole("alert");
      expect(error).toHaveTextContent(/save/i);
    });
  });

  describe("Quando um alimento é deletado", () => {
    test("É removido da lista", async () => {
      await renderApp();

      deleteAlimento();

      expect(screen.queryByText(alimentos[0].title)).not.toBeInTheDocument();
    });

    test("É reinserido na lista se a chamada para o servidor falhar", async () => {
      server.use(
        rest.delete(apiEndpoint + "/" + alimentos[0]._id, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      await renderApp();

      deleteAlimento();

      await screen.findByText(alimentos[0].title);
    });

    test("Um erro é exibido se a chamada para o servidor falhar", async () => {
      server.use(
        rest.delete(apiEndpoint + "/" + alimentos[0]._id, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      await renderApp();

      deleteAlimento();

      const error = await screen.findByRole("alert");
      expect(error).toHaveTextContent(/delete/i);
    });
  });
});

// Helper functions
const renderApp = async () => {
  render(<App />);
  await screen.findAllByRole("listitem");
};

const addAlimento = () => {
  const inputField = screen.getByLabelText("Novo Filme");
  fireEvent.change(inputField, {
    target: { value: newAlimento.title },
  });
  fireEvent.submit(inputField);
};

const deleteAlimento = () => fireEvent.click(screen.getAllByRole("button")[0]);
