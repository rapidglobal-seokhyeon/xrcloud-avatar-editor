import { MutableRefObject } from 'react'
import { Group, SkinnedMesh } from 'three'
import { AvatarPartName, avatarPartNames } from '../types'
import { AvatarAssemblyPart, AvatarParts } from './AvatarAssemblyPart'

interface Props {
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    skeletonNodes: Record<string, SkinnedMesh>
    partName?: AvatarPartName
}

export function AvatarAssembly({ rootRef, skeletonNodes, parts, partName }: Props) {
    return (
        <group name="Scene">
            <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                {avatarPartNames.map((name) => (
                    <AvatarAssemblyPart
                        key={`${Date.now()}-${name}`}
                        name={name}
                        parts={parts}
                        skeletonNodes={skeletonNodes}
                    />
                ))}

                <primitive key={skeletonNodes.Hips.uuid} dispose={null} object={skeletonNodes.Hips} />
            </group>
        </group>
    )
}
