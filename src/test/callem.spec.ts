import { callem } from '..'

describe('Callem can', () => {
  test('create events', () => {
    const [on, emit] = callem<{ id: number }>()
    return new Promise<void>((resolve) => {
      on((e) => {
        expect(e.id).toBe(42)
        resolve()
      })
      emit({ id: 42 })
    })
  })

  test('create unsubscribe from', () => {
    const [on, emit] = callem<{ id: number }>()
    return new Promise<void>((resolve) => {
      let count = 0
      const unsub = on((e) => {
        expect(e.id).toBe(42)
        count++
      })
      emit({ id: 42 })
      unsub()
      emit({ id: 42 })
      expect(count).toBe(1)
      resolve()
    })
  })

  test('create multiple subscribers', () => {
    const [on, emit] = callem<{ id: number }>()
    return new Promise<void>((resolve) => {
      let count = 0
      on((e) => {
        expect(e.id).toBe(42)
        count++
      })
      on((e) => {
        expect(e.id).toBe(42)
        count++
      })
      emit({ id: 42 })
      expect(count).toBe(2)
      emit({ id: 42 })
      expect(count).toBe(4)
      resolve()
    })
  })
})
