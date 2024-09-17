import { HomePage } from '@/pages/home-page'

import { AppProvider } from './providers/app-provider'

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  )
}

export default App
