import React from 'react'
import { UserAddOutlined } from '@ant-design/icons'
import { AvatarEditor } from '../AvatarEditor'

interface IProps {}

export const AvatarPopup: React.FunctionComponent<IProps> = () => {
    return <AvatarEditor key={`AvatarPopup`} isEditMode={true} />
}
