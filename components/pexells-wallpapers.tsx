import { ActivityIndicator, FlatList, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { Photo } from './photo'

import type { TPhoto } from '@/types/photo.type'

const uri = `https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait`
const PEXELS_API_KEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY

type SearchPayload = {
  total_results: number
  page: number
  per_page: number
  photos: TPhoto[]
}

export function PexelsWallpaper() {
  const { data, isLoading } = useQuery<SearchPayload>({
    queryKey: ['wallpapers'],
    queryFn: async () => {
      const res = await fetch(uri, {
        method: 'GET',
        headers: {
          Authorization: PEXELS_API_KEY ?? '',
        },
      }).then((res) => res.json())

      console.log(res)

      return res
    },
  })

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data?.photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <Photo item={item} index={index} />}
      />
    </View>
  )
}
