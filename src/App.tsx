import { Button, Flex, Modal } from 'antd'
import './App.css'
import { AvatarEditor } from './AvatarEditor'
import { EmptyAvatar } from './components/EmptyAvatar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AvatartPartType } from './AvatarEditor/types'
import { CloseOutlined } from '@ant-design/icons'
import { getUserNo } from './utils/getUserNo'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [defaultAvatar, setDefaultAvatar] = useState<AvatartPartType | null>(null)

    useEffect(() => {
        const userNo = getUserNo()
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/${userNo}`)
            .then((res) => {
                setDefaultAvatar(res.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        alert('저장되었습니다.')
        window.location.reload()
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="App">
            <Flex align="center" justify="center" gap={40}>
                {defaultAvatar ? (
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem'
                            }}
                        >
                            나의 아바타
                        </div>
                        <AvatarEditor isEditMode={false} defaultAvatar={defaultAvatar} />
                        <Button type="primary" onClick={showModal}>
                            편집하기
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem'
                            }}
                        >
                            나의 아바타
                        </div>
                        <EmptyAvatar />
                        <Button type="primary" onClick={showModal}>
                            등록하기
                        </Button>
                    </div>
                )}
            </Flex>
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        bottom: 0,
                        right: 0,
                        background: '#000000b4',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            width: 600,
                            maxHeight: '90vh',
                            background: '#fff',
                            overflowY: 'scroll',
                            padding: 20
                        }}
                    >
                        <div>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={handleCancel}
                                type="link"
                                style={{
                                    float: 'right'
                                }}
                            />
                            <AvatarEditor
                                key={Date.now()}
                                onSave={handleOk}
                                defaultAvatar={defaultAvatar}
                                isEditMode={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
