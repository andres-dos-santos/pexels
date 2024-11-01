import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  View,
} from 'react-native'

import { usePexels } from '@/hooks/use-pexels'

import type { TPhoto } from '@/types/photo.type'

const { width } = Dimensions.get('screen')

const _spacing = 12
const _imageWidth = width * 0.7
const _imageHeight = _imageWidth * 1.76

type Props = {
  item: TPhoto
  index: number
}

export function Photo({ item }: Props) {
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}
    >
      <Image alt="" source={{ uri: item.src.large }} style={{ flex: 1 }} />
    </View>
  )
}

export function PexelsWallpaper() {
  const { data, isLoading } = usePexels()

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
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={_imageWidth + _spacing}
        decelerationRate="fast"
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        renderItem={({ item, index }) => <Photo item={item} index={index} />}
      />
    </View>
  )
}
