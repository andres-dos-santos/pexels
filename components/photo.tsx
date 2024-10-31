import type { TPhoto } from '@/types/photo.type'
import { Dimensions, Image, View } from 'react-native'

type Props = {
  item: TPhoto
  index: number
}

const { width } = Dimensions.get('screen')

const _imageWidth = width * 0.7
const _imageHeight = _imageWidth * 1.76

export function Photo({ index, item }: Props) {
  return (
    <View>
      <Image
        alt=""
        source={{ uri: item.src.large }}
        style={{ width: _imageWidth, height: _imageHeight }}
      />
    </View>
  )
}
