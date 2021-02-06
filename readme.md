# Callem

Callem is a Typescript-first micro event library based on a convenient observer pattern often found in React and similar tools.

# Installation

```
npm i callem
```

# Usage

Create an event

```
include {callem} from 'callem'
const [onMyEvent, emitMyEvent] = callem<{id:number}>()

const unsubscribe = onMyEvent( e => {
    console.log(`Event is ${e.id}`)
})

emitMyEvent({id: 42})
```
