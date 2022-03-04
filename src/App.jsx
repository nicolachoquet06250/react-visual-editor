import { VisualEditorComponentsRegisterer } from "./example/registerer";
import { VisualEditor } from "./components/visual-editor";
import { Layout } from "./example/Layout";

export default function App() {
  return (
    <VisualEditor layout={Layout}
                  registerer={VisualEditorComponentsRegisterer} />
  )
}
