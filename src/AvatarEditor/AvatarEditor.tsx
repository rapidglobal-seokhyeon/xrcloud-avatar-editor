import styled from '@emotion/styled'
import { FunctionComponent, Suspense, useRef, useState } from 'react'
import { AvatarProvider } from './AvatarContext'
import { AvatarDisplay, AvatarDisplayHandles } from './AvatarDisplay'
import { AvatarSelector } from './AvatarSelector'
import { Button, Flex } from 'antd'
import { AvatarSaveButton } from './AvatarSaveButton'
import { AvatartPartType } from './types'

interface IProps {
    onSave?: () => void
    isEditMode: boolean
    defaultAvatar: AvatartPartType | null
}
export const AvatarEditor: FunctionComponent<IProps> = (props) => {
    const displayRef = useRef<AvatarDisplayHandles | null>(null)
    const [avatarImage, setAvatarImage] = useState<string | undefined>()

    return (
        <AvatarProvider defaultAvatar={props.defaultAvatar}>
            <RowFrame>
                <CanvasFrame>
                    <Suspense fallback={<p>Loading...</p>}>
                        <AvatarDisplay ref={displayRef} defaultAvatar={props.defaultAvatar} />
                    </Suspense>
                </CanvasFrame>
                {/* <div>
                    {avatarImage && <SnapshotView src={avatarImage} alt="Avatar Thumbnail" />}
                </div> */}
            </RowFrame>
            {props.isEditMode && props.onSave && (
                <>
                    <AvatarSelector />
                    <Flex
                        align="center"
                        justify="center"
                        style={{
                            marginTop: 20
                        }}
                    >
                        <AvatarSaveButton displayRef={displayRef} onSave={props.onSave} />
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
