import styled from '@emotion/styled'
import { FunctionComponent, Suspense, useRef, useState } from 'react'
import { AvatarProvider } from './AvatarContext'
import { AvatarDisplay, AvatarDisplayHandles } from './AvatarDisplay'
import { AvatarSelector } from './AvatarSelector'
import { Button, Flex } from 'antd'

interface IProps {
    isEditMode: boolean
}
export const AvatarEditor: FunctionComponent<IProps> = (props) => {
    const displayRef = useRef<AvatarDisplayHandles | null>(null)
    const [avatarImage, setAvatarImage] = useState<string | undefined>()

    const handleDownloadGlb = async () => {
        const result = await displayRef.current?.exportAvatar()

        if (result) {
            const blob = new Blob([result], { type: 'model/gltf-binary' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a') as unknown as HTMLAnchorElement
            a.href = url
            a.download = 'avatar.glb'
            a.click()
        } else {
            alert('export failed')
        }
    }

    const handleSnapshot = async () => {
        const imageUrl = displayRef.current?.getSnapshot()
        setAvatarImage(imageUrl)
    }

    return (
        <AvatarProvider>
            <RowFrame>
                <CanvasFrame>
                    <Suspense fallback={<p>Loading...</p>}>
                        <AvatarDisplay ref={displayRef} />
                    </Suspense>
                </CanvasFrame>
                {/* <div>
                    {avatarImage && <SnapshotView src={avatarImage} alt="Avatar Thumbnail" />}
                </div> */}
            </RowFrame>
            {props.isEditMode && (
                <>
                    <AvatarSelector />
                    <Flex
                        align="center"
                        justify="center"
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Button type="primary" onClick={handleDownloadGlb} size="large">
                            저장하기
                        </Button>
                    </Flex>
                </>
            )}
        </AvatarProvider>
    )
}

const CanvasFrame = styled.div`
    width: 400px;
    height: 600px;
    background: #f8f8f8;
`
const RowFrame = styled.div`
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
`
