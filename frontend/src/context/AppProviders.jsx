import { FavoritesProvider } from "./FavoritesContext";

export function AppProviders({ children }) {
  return (
        <FavoritesProvider>{children}</FavoritesProvider>
  );
}
