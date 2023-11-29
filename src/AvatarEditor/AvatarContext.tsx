import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { allAvatarBlueprints } from './blueprints'
import { AvatarBlueprint, AvatarPart, AvatartPartType } from './types'

type SetPartType = (Hair: AvatarPart | undefined) => void

interface AvatarContextValue {
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
    Glasses: AvatarPart | undefined
    setGlasses: SetPartType
}

const AvatarContext = React.createContext({} as AvatarContextValue)

export function AvatarProvider({
    children,
    defaultAvatar
}: {
    children: ReactNode
    defaultAvatar: AvatartPartType | null
}) {
    const [blueprint, setBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[0])
    const [currentAnimation, setCurrentAnimation] = useState<string>('Idle')
    const [Hair, setHair] = useState<AvatarPart>()
    const [Face, setFace] = useState<AvatarPart>()
    const [Body, setBody] = useState<AvatarPart>()
    const [Leg, setLeg] = useState<AvatarPart>()
    const [Foot, setFoot] = useState<AvatarPart>()
    const [Hand, setHand] = useState<AvatarPart>()
    const [Glasses, setGlasses] = useState<AvatarPart>()

    useEffect(() => {
        setHair(blueprint.hairs[0])
        setFace(blueprint.faces[0])
        setBody(blueprint.bodies[0])
        setLeg(blueprint.legs[0])
        setFoot(blueprint.feet[0])
        setHand(blueprint.hands[0])
        setGlasses(undefined)
    }, [blueprint])

    useEffect(() => {
        if (defaultAvatar) {
            const findBlueprint = allAvatarBlueprints.find(
                (item) => item.skeleton.name === defaultAvatar?.Sex
            )
            if (!findBlueprint) return
            const hair = findBlueprint.hairs.find((hair) => hair.name === defaultAvatar!.Hair)
            const face = findBlueprint.faces.find((face) => face.name === defaultAvatar!.Face)
            const body = findBlueprint.bodies.find((body) => body.name === defaultAvatar!.Body)
            const leg = findBlueprint.legs.find((leg) => leg.name === defaultAvatar!.Leg)
            const foot = findBlueprint.feet.find((foot) => foot.name === defaultAvatar!.Foot)
            const hand = findBlueprint.hands.find((hand) => hand.name === defaultAvatar!.Hand)
            const glasses = findBlueprint.glasses.find((glasses) => glasses.name === defaultAvatar!.Glasses)
            setBlueprint(findBlueprint)
            setHair(hair)
            setFace(face)
            setBody(body)
            setLeg(leg)
            setFoot(foot)
            setHand(hand)
            setGlasses(glasses)
        }
    }, [defaultAvatar, setBlueprint, setBody, setFace, setFoot, setGlasses, setHair, setHand, setLeg])

    const context = {
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
        Glasses,
        setGlasses
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
