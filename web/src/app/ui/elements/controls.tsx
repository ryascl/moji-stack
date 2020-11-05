import { percent } from 'csx'
import { styled } from '../../../lib/typestyle-ext/styled'
import type { NestedCSSProperties } from 'typestyle/lib/types'
import { centerChild } from '../../../lib/typestyle-ext/layouts'
import { colors, sizes } from '../../services/theme'

const buttonBase: NestedCSSProperties = {
  padding: 0,
  background: colors.lightest,
  border: `1px solid ${colors.medium}`,
  borderRadius: 3,
  cursor: 'pointer',
  $nest: {
    '&:focus': {
      outline: 0
    },
    '&:hover': {
      filter: 'brightness(95%)',
    }
  }
}

export const GlyphOption = styled('button', {
  ...buttonBase,
  ...centerChild,
  fontSize: percent(150),
  width: sizes.characterButton,
  height: sizes.characterButton
})