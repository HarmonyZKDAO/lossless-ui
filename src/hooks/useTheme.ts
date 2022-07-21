import { ThemeContext } from '@losslessproject/react-components'
import { useContext } from 'react'

export const useTheme = () => {
  return useContext(ThemeContext)
}
