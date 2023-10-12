import { useGLTF } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint } from './blueprints'
import { AvatarBlueprint, AvatarPart } from './types'

type SetPartType = (Hair: AvatarPart | undefined) => void

interface AvatarContextValue {
    rootRef: MutableRefObject<Group | null>
    blueprint: AvatarBlueprint
    setBlueprint: (blueprint: AvatarBlueprint) => void
    currentAnimation: string
    setCurrentAnimation: (clipName: string) => void
    Hair: AvatarPart | undefined
    setHair: SetPartType
    Face: AvatarPart | undefined
    setFace: SetPartType
    Body: AvatarPart | undefined
    setBody: SetPartType
    Leg: AvatarPart | undefined
    setLeg: SetPartType
    Foot: AvatarPart | undefined
    setFoot: SetPartType
    Hand: AvatarPart | undefined
    setHand: SetPartType
    Glass: AvatarPart | undefined
    setGlass: SetPartType
}

const AvatarContext = React.createContext({} as AvatarContextValue)

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [blueprint, setBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[0])
    const [currentAnimation, setCurrentAnimation] = useState<string>('Idle')
    const [Hair, setHair] = useState<AvatarPart>()
    const [Face, setFace] = useState<AvatarPart>()
    const [Body, setBody] = useState<AvatarPart>()
    const [Leg, setLeg] = useState<AvatarPart>()
    const [Foot, setFoot] = useState<AvatarPart>()
    const [Hand, setHand] = useState<AvatarPart>()
    const [Glass, setGlass] = useState<AvatarPart>()

    useEffect(() => {
        setHair(blueprint.hairs[0])
        setFace(blueprint.faces[0])
        setBody(blueprint.bodies[0])
        setLeg(blueprint.legs[0])
        setFoot(blueprint.feet[0])
        setHand(blueprint.hands[0])
        setGlass(undefined)

        loopThroughBlueprint(blueprint, (item) => {
            useGLTF.preload(item.fileUrl)
        })
    }, [blueprint])

    const context = {
        rootRef,
        currentAnimation,
        setCurrentAnimation,
        blueprint,
        setBlueprint,
        Hair,
        setHair,
        Face,
        setFace,
        Body,
        setBody,
        Leg,
        setLeg,
        Foot,
        setFoot,
        Hand,
        setHand,
        Glass,
        setGlass
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)