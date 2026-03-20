import { AppRouter } from "@/app/providers/AppRouter"
import ModalManager from "@/widgets/modals/ModalManager"

export function App() {
    return (
        <>
            <ModalManager/>
            <AppRouter />
        </>
    )
}

export default App
