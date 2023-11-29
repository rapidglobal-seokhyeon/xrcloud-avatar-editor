import { FunctionComponent, forwardRef } from 'react'
import { useAvatar } from './AvatarContext'
import { Button } from 'antd'
import axios from 'axios'
import { avatarPartNames } from './types'
import { getUserNo } from '../utils/getUserNo'
interface IProps {
    displayRef: any
    onSave: () => void
}
export const AvatarSaveButton: FunctionComponent<IProps> = (props) => {
    const { ...parts } = useAvatar()
    const handleDownloadGlb = async () => {
        try {
            const result = await props.displayRef?.current?.exportAvatar()
            const userNo = getUserNo()
            if (userNo && result) {
                const blob = new Blob([result], { type: 'model/gltf-binary' })
                const formData = new FormData()
                formData.append('avatarFile', blob, 'Avatar.glb')
                formData.append('avatarPath', '/attachfile/avatar/')
                formData.append('userId', userNo)
                formData.append('Sex', parts.blueprint.skeleton.name)
                avatarPartNames.forEach((partName) => {
                    if (partName && parts[partName]) {
                        formData.append(partName, parts[partName]!.name)
                    }
                })
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${userNo}`, formData, {})
                props.onSave()
            } else {
                alert('export failed')
            }

            console.info('{ currentAnimation, blueprint, ...parts }', parts)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Button type="primary" onClick={handleDownloadGlb} size="large">
            저장하기
        </Button>
    )
}
