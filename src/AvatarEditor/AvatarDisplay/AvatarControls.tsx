import { OrbitControls } from '@react-three/drei'
import { RefObject, useCallback, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { AvatarPartName } from '../types'
import { Vector3 } from 'three'

type Props = {
    children: React.ReactNode
    partName?: AvatarPartName
}

const POSITION_BY_PART: { [key in AvatarPartName]: Vector3 | [x: number, y: number, z: number] } = {
    Hair: [0.1, 0.3, 0],
    Face: [0.1, 0.3, 0],
    Body: [0.1, -0.1, 0],
    Leg: [0.15, -0.8, 0],
    Foot: [0.2, -1.25, 0],
    Hand: [0, -0.1, 0],
    Glasses: [0.1, 0.3, 0]
}

export function AvatarControls(props: Props) {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const minDistance = 0.5
    const maxDistance = props.partName ? 0.55 : 1.5

    const modelHeightMax = -1.2
    const modelHeightMin = -1.7
    const [modelHeight, setModelHeight] = useState<number>(modelHeightMax)

    const handleZoomChange = useCallback(() => {
        if (controlsRef.current) {
            const {
                object: { position },
                target
            } = controlsRef.current

            const distance = position.distanceTo(target)
            const distanceRatio = (distance - minDistance) / (maxDistance - minDistance)
            const newModelHeight = modelHeightMin + distanceRatio * (modelHeightMax - modelHeightMin)

            setModelHeight(newModelHeight)
        }
    }, [modelHeightMax, modelHeightMin, setModelHeight])

    return (
        <group position={[0, modelHeight, 0]}>
            {props.children}

            <OrbitControls
                ref={orbitControlsRef}
                minDistance={minDistance}
                maxDistance={maxDistance}
                minPolarAngle={0.8}
                maxPolarAngle={2}
                enablePan={false}
                enableDamping
                onChange={handleZoomChange}
                target={props.partName ? POSITION_BY_PART[props.partName] : [0, -0.3, 0]}
            />
        </group>
    )
}
