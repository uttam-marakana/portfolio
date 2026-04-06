import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext.jsx";
import { SearchProvider } from "../context/SearchContext.jsx";

export function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <SearchProvider>{ui}</SearchProvider>
    </ThemeProvider>,
  );
}

export function renderWithProvidersAndRouter(ui, { route = "/" } = {}) {
  window.history.pushState({}, "", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider>
        <SearchProvider>{ui}</SearchProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );
}
