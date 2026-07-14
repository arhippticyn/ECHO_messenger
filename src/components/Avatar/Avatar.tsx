import { getAvatarColor } from '../../utils/avatar'
import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
  size?: number
  online?: boolean
}

const Avatar = ({ name, size = 44, online }: AvatarProps) => {
  const safeName = name || '?'
  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: getAvatarColor(safeName),
      }}
    >
      {safeName.slice(0, 1).toUpperCase()}
      {online && <span className={styles.dot} />}
    </div>
  )
}

export default Avatar
