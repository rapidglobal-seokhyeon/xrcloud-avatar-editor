import { useGLTF } from '@react-three/drei'
import { SkinnedMesh } from 'three'
import { AvatarPart, AvatarPartName, GLTFResult } from '../types'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export interface AvatarParts {
    Hair: AvatarPart | undefined
    Face: AvatarPart | undefined
    Body: AvatarPart | undefined
    Leg: AvatarPart | undefined
    Foot: AvatarPart | undefined
    Hand: AvatarPart | undefined
    Glasses: AvatarPart | undefined
}

interface Props {
    part: AvatarPart
    name: AvatarPartName
    skeletonNodes: Record<string, SkinnedMesh>
}

export function AvatarAssemblyPartForPart({ name, skeletonNodes, part }: Props) {
    const partUrl = part?.fileUrl
    const { nodes, materials } = useGLTF(partUrl || []) as GLTFResult
    const { scene, gl } = useThree()

    useEffect(() => {
        return () => {
            scene.traverse((o: any) => {
                if (o.geometry) {
                    o.geometry.dispose()
                    // console.log("dispose geometry ", o.geometry)
                }
                if (o.texture) {
                    o.texture.dispose()
                    // console.log("dispose geometry ", o.geometry)
                }
                if (o.material) {
                    if (o.material.length) {
                        for (let i = 0; i < o.material.length; ++i) {
                            o.material[i].dispose()
                            // console.log("dispose material ", o.material[i])
                        }
                    } else {
                        o.material.dispose()
                        // console.log("dispose material ", o.material)
                    }
                }
            })
            scene.clear()
            gl.dispose()
            gl.forceContextLoss()
        }
    }, [gl, materials, name, nodes, scene])
    if (!nodes || !materials || !nodes[name]) return <group />

    return (
        <skinnedMesh
            key={nodes[name].uuid}
            name={part.name}
            geometry={nodes[name].geometry}
            material={materials[name]}
            skeleton={skeletonNodes[name].skeleton}
            dispose={null}
        />
    )
}
