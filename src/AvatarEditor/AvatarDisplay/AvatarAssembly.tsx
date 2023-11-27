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
    console.info('avatarPartNames', avatarPartNames)
    console.info('parts', parts)
    console.info('skeletonNodes', skeletonNodes)
    return (
        <group name="Scene">
            <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                {!partName ? (
                    avatarPartNames.map((name) => (
                        <AvatarAssemblyPart
                            key={name}
                            name={name}
                            parts={parts}
                            skeletonNodes={skeletonNodes}
                        />
                    ))
                ) : partName === 'Hair' ? (
                    <>
                        <AvatarAssemblyPart
                            key={'Hair'}
                            name={'Hair'}
                            parts={parts}
                            skeletonNodes={skeletonNodes}
                        />
                        <AvatarAssemblyPart
                            key={'Face'}
                            name={'Face'}
                            parts={parts}
                            skeletonNodes={skeletonNodes}
                        />
                    </>
                ) : (
                    <AvatarAssemblyPart
                        key={partName}
                        name={partName}
                        parts={parts}
                        skeletonNodes={skeletonNodes}
                    />
                )}

                <primitive key={skeletonNodes.Hips.uuid} object={skeletonNodes.Hips} />
            </group>
        </group>
    )
}
