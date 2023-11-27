import { OrbitControls } from '@react-three/drei'
import { RefObject, useCallback, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type Props = {
    children: React.ReactNode
    isPart: boolean
}

export function AvatarControls(props: Props) {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const minDistance = 0.5
    const maxDistance = props.isPart ? 0.55 : 1.5

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
            console.info('newModelHeight', newModelHeight)
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
                target={[0, props.isPart ? 0.1 : -0.3, 0]}
            />
        </group>
    )
}
