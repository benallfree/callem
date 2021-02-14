# Callem

Callem is a Typescript-first micro event library based on a convenient observer pattern often found in React and similar tools.

# Installation

```
npm i callem
```

# Usage

Create an event

```typescript
import {callem} from 'callem'
const [onMyEvent, emitMyEvent] = callem<{id:number}>()

const unsubscribe = onMyEvent( e => {
    console.log(`Event is ${e.id}`)
})

emitMyEvent({id: 42})
```

# Advanced Usage

Suppose you want to await an event with a timeout. Let's see it in action.

```typescript
type MyEventData = {id:number}
const [onMyEvent, emitMyEvent] = callem<MyEventdata>()

export const awaitEventWithTimeout = () => {
  return new Promise<MyEventData>((resolve, reject) => {
    let tid: ReturnType<typeof setTimeout>
    const unsub = onMyEvent((eventData) => {
      clearTimeout(tid)
      unsub()
      resolve(eventData)
    })
    tid = setTimeout(() => {
      unsub()
      reject(new Error(`Timed out waiting for event data`))
    }, 5000)
  })
}

const myEventData = await awaitEventWithTimeout()
```
