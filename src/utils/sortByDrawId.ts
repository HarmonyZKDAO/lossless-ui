import { Draw } from '@losslessproject/client-js'

export const sortDrawsByDrawIdDesc = (a: Draw, b: Draw) => b.drawId - a.drawId
export const sortDrawsByDrawIdAsc = (a: Draw, b: Draw) => a.drawId - b.drawId
