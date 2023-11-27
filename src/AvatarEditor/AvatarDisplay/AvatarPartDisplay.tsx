import styled from '@emotion/styled'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FunctionComponent, forwardRef, useImperativeHandle, useRef } from 'react'
import { Group } from 'three'
import { useAvatar } from '../AvatarContext'
import { AvatarPartName, GLTFResult } from '../types'
import { AvatarAnimation } from './AvatarAnimation'
import { AvatarAssembly } from './AvatarAssembly'
import { AvatarControls } from './AvatarControls'
import { AvatarExporter, AvatarExporterHandles } from './AvatarExporter'
import Light from './Light'

export interface AvatarDisplayHandles {
    partName: AvatarPartName
    option: {
        name: string
    }
}

export const AvatarPartDisplay: FunctionComponent<AvatarDisplayHandles> = (props) => {
    const rootRef = useRef<Group>(null)

    const { currentAnimation, blueprint, ...parts } = useAvatar()
    const { nodes, animations } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult
    console.info('props', props)
    console.info('parts', parts)
    console.info('nodes', nodes)
    return (
        <StyledCanvas
            gl={{
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: true
            }}
        >
            <AvatarControls isPart={true}>
                <AvatarAssembly
                    skeletonNodes={nodes}
                    rootRef={rootRef}
                    parts={parts}
                    partName={props.partName}
                />
                <Light />
            </AvatarControls>
            <AvatarAnimation rootRef={rootRef} currentAnimation={currentAnimation} animations={animations} />
        </StyledCanvas>
    )
}

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
`
