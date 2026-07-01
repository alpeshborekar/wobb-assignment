import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((m) => ({ default: m.SearchPage }))
);
const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((m) => ({ default: m.ProfileDetailPage }))
);
const SelectedListPage = lazy(() =>
  import("@/pages/SelectedListPage").then((m) => ({ default: m.SelectedListPage }))
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
          <Route path="/list" element={<SelectedListPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
