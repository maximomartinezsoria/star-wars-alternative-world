import { useState, useEffect } from 'react'
import Emitter from '../lib/eventEmitter'

export default function useNewId(eventName) {
  const [newId, setNewId] = useState(null)

  useEffect(() => {
    Emitter.on(eventName, (planetId) => {
      setNewId(planetId)
      setTimeout(() => {
        setNewId(null)
      }, 10000)
    })
  }, [eventName])

  return newId
}
