import { createNanoEvents } from 'nanoevents'

export type DataPrimitives = any
export type CallemData = { [_: string]: DataPrimitives }
export type Unsubscribe = () => void
export type CallemHandler<TData extends CallemData> = (data: TData) => void
export type CallemSubscriber<TData extends CallemData> = (
  cb: CallemHandler<TData>
) => Unsubscribe
export type CallemEmitter<TData extends CallemData> = (data: TData) => void

export type CallemPair<TData extends CallemData> = [
  CallemSubscriber<TData>,
  CallemEmitter<TData>
]

/*
Usage example:

const [on, emit] = callem<string>()

const unsub = on( s=>{
  console.log('got string', s)
})
emit('hello')
unsub() // Unsubscribe, stop listening

*/
export function callem<TData extends CallemData>(): CallemPair<TData> {
  const emitter = createNanoEvents()
  return [
    (callback: CallemHandler<TData>): Unsubscribe => {
      const unsub = emitter.on('callem', callback)
      return unsub
    },
    (data: TData) => {
      emitter.emit('callem', data)
    },
  ]
}
