import { Button, Flex, Modal } from 'antd'
import './App.css'
import { AvatarEditor } from './AvatarEditor'
import CommonLayout from './layouts/CommonLayout'
import { EmptyAvatar } from './components/EmptyAvatar'
import { useState } from 'react'
import { AvatarPopup } from './components/AvatarPopup'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="App">
            <CommonLayout>
                <Flex align="center" justify="center" gap={40}>
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

                        <Button type="primary">등록하기</Button>
                    </div>
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.25rem'
                            }}
                        >
                            나의 아바타
                        </div>
                        <AvatarEditor isEditMode={false} />
                        <Button type="primary" onClick={showModal}>
                            편집하기
                        </Button>
                    </div>
                </Flex>
            </CommonLayout>
            <Modal
                width={650}
                title="아바타 편집"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer=""
            >
                <AvatarPopup />
            </Modal>
        </div>
    )
}

export default App
