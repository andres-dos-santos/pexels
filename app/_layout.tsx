import { View, StyleSheet } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { PexelsWallpaper } from '@/components/pexells-wallpapers'

const client = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <View style={s.container}>
        <PexelsWallpaper />
      </View>
    </QueryClientProvider>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
