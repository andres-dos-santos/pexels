import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'

import { usePexels } from '@/hooks/use-pexels'

import type { TPhoto } from '@/types/photo.type'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

const { width } = Dimensions.get('screen')

const _spacing = 12
const _imageWidth = width * 0.7
const _imageHeight = _imageWidth * 1.76

function Photo({
  item,
  scrollX,
  index,
}: {
  item: TPhoto
  scrollX: SharedValue<number>
  index: number
}) {
  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6],
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [10, 0, -10],
          )}deg`,
        },
      ],
    }
  })

  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: 'hidden',
        borderRadius: 16,
      }}
    >
      <Animated.Image
        alt=""
        source={{ uri: item.src.large }}
        style={[{ flex: 1 }, styles]}
      />
    </View>
  )
}

function BackdropPhoto({
  photo,
  scrollX,
  index,
}: {
  photo: TPhoto
  scrollX: SharedValue<number>
  index: number
}) {
  const styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
      ),
    }
  })

  return (
    <Animated.Image
      alt=""
      source={{ uri: photo.src.large }}
      style={[StyleSheet.absoluteFill, styles]}
      blurRadius={50}
    />
  )
}

export function PexelsWallpaper() {
  const { data, isLoading } = usePexels()

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing)
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
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos.map((photo, index) => (
          <BackdropPhoto
            key={index}
            photo={photo}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </View>
      <Animated.FlatList
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
        renderItem={({ item, index }) => (
          <Photo item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // 16.6ms
      />
    </View>
  )
}
