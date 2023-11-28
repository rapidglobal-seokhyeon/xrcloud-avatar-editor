import styled from '@emotion/styled'
import { useGLTF } from '@react-three/drei'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { FunctionComponent, forwardRef, useImperativeHandle, useRef } from 'react'
import { Group } from 'three'
import { useAvatar } from '../AvatarContext'
import { AvatarPart, AvatarPartName, GLTFResult } from '../types'
import { AvatarAnimation } from './AvatarAnimation'
import { AvatarAssembly } from './AvatarAssembly'
import { AvatarControls } from './AvatarControls'
import { AvatarExporter, AvatarExporterHandles } from './AvatarExporter'
import Light from './Light'
import { AvatarAssemblyForPart } from './AvatarAssemblyForPart'

export interface AvatarDisplayHandles {
    partName: AvatarPartName
    option: AvatarPart
}

export const AvatarPartDisplay: FunctionComponent<AvatarDisplayHandles> = (props) => {
    const rootRef = useRef<Group>(null)

    const { currentAnimation, blueprint } = useAvatar()
    const { nodes } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    return (
        <StyledCanvas
            gl={{
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: true
            }}
            scene={{
                dispose: null
            }}
        >
            <AvatarControls partName={props.partName}>
                <AvatarAssemblyForPart
                    skeletonNodes={nodes}
                    rootRef={rootRef}
                    part={props.option}
                    partName={props.partName}
                />
                <Light />
            </AvatarControls>
            {/* <AvatarAnimation rootRef={rootRef} currentAnimation={currentAnimation} animations={animations} /> */}
        </StyledCanvas>
    )
}

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
`