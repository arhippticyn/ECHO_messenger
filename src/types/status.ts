export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const

export type MESSAGE_STATUS = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS]
