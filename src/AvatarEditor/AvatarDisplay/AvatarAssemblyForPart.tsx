import { MutableRefObject } from 'react'
import { Group, SkinnedMesh } from 'three'
import { AvatarPart, AvatarPartName, avatarPartNames } from '../types'
import { AvatarAssemblyPart, AvatarParts } from './AvatarAssemblyPart'
import { AvatarAssemblyPartForPart } from './AvatarAssemblyPartForPart'

interface Props {
    part: AvatarPart
    rootRef: MutableRefObject<Group | null>
    skeletonNodes: Record<string, SkinnedMesh>
    partName?: AvatarPartName
}

export function AvatarAssemblyForPart({ rootRef, skeletonNodes, part, partName }: Props) {
    return (
        <group name="Scene">
            <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                <AvatarAssemblyPartForPart
                    key={`part-${part.name}`}
                    name={partName!}
                    part={part}
                    skeletonNodes={skeletonNodes}
                />

                <primitive key={skeletonNodes.Hips.uuid} object={skeletonNodes.Hips} dispose={null} />
            </group>
        </group>
    )
}
