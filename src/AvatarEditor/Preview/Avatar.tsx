import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimationMixer } from 'three'
import { useAvatar } from '../contexts/AvatarContext'
import { GLTFResult, PartView } from './PartView'

export default function Avatar() {
    const { avatarInstance, rootRef } = useAvatar()
    const { nodes, animations } = useGLTF(avatarInstance.skeleton.fileUrl) as GLTFResult
    const [mixer, setMixer] = useState<AnimationMixer>(null!)

    useEffect(() => {
        if (rootRef.current) setMixer(new AnimationMixer(rootRef.current))
    }, [rootRef])

    useEffect(() => {
        if (mixer) {
            animations.forEach((clip) => {
                const action = mixer.clipAction(clip)
                if (clip.name && clip.name === avatarInstance.currentAnimation) {
                    const action = mixer.clipAction(clip)
                    action.play()
                }
                action.reset()
            })
        }
    }, [animations, avatarInstance.currentAnimation, mixer])

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta)
        }
    })

    return (
        <group>
            <group name="Scene">
                <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                    <primitive object={nodes.Hips} />
                    <PartView name={'Hair'} rootNodes={nodes} />
                    <PartView name={'Face'} rootNodes={nodes} />
                    <PartView name={'Body'} rootNodes={nodes} />
                    <PartView name={'Leg'} rootNodes={nodes} />
                    <PartView name={'Hand'} rootNodes={nodes} />
                    <PartView name={'Foot'} rootNodes={nodes} />
                    <PartView name={'Glass'} rootNodes={nodes} />
                </group>
            </group>
        </group>
    )
}
