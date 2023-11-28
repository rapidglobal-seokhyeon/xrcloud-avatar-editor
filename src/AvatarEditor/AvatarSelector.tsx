import styled from '@emotion/styled'
import { useAvatar } from './AvatarContext'
import { allAvatarBlueprints } from './blueprints'
import { AvatarPart, AvatarPartName, avatarAnimations } from './types'
import { LeftOutlined, ManOutlined, RightOutlined, WomanOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Grid, Radio, Row, Tabs, TabsProps } from 'antd'
import { AvatarPartDisplay } from './AvatarDisplay/AvatarPartDisplay'
import { Suspense, useState } from 'react'

export function AvatarSelector() {
    const {
        blueprint,
        setBlueprint,
        setBody,
        setFace,
        setFoot,
        setGlasses,
        setHair,
        setLeg,
        setCurrentAnimation,
        Hair,
        Face,
        Body,
        Leg,
        Foot,
        Glasses
    } = useAvatar()
    const items: TabsProps['items'] = [
        {
            key: 'Hair',
            label: '헤어',
            children: (
                <SelectComponent
                    defaultValue={Hair}
                    partName="Hair"
                    options={blueprint.hairs}
                    onChange={(option) => setHair(option)}
                />
            )
        },
        {
            key: 'Face',
            label: '얼굴',
            children: (
                <SelectComponent
                    partName="Face"
                    defaultValue={Face}
                    options={blueprint.faces}
                    onChange={(option) => setFace(option)}
                />
            )
        },
        {
            key: 'Body',
            label: '상의',
            children: (
                <SelectComponent
                    partName="Body"
                    defaultValue={Body}
                    options={blueprint.bodies}
                    onChange={(option) => setBody(option)}
                />
            )
        },
        {
            key: 'Leg',
            label: '하의',
            children: (
                <SelectComponent
                    partName="Leg"
                    defaultValue={Leg}
                    options={blueprint.legs}
                    onChange={(option) => setLeg(option)}
                />
            )
        },
        {
            key: 'Foot',
            label: '발',
            children: (
                <SelectComponent
                    partName="Foot"
                    defaultValue={Foot}
                    options={blueprint.feet}
                    onChange={(option) => setFoot(option)}
                />
            )
        },
        {
            key: 'Glasses',
            label: '안경',
            children: (
                <SelectComponent
                    partName="Glasses"
                    defaultValue={Glasses}
                    options={blueprint.glasses}
                    onChange={(option) => setGlasses(option)}
                />
            )
        }
    ]
    const onChangePartTab = (key: string) => {
        console.log(key)
    }
    return (
        <div>
            <Container>
                <Flex align="center">
                    <Radio.Group
                        defaultValue={blueprint.skeleton.name === 'MAN' ? '1' : '0'}
                        onChange={(e) => setBlueprint(allAvatarBlueprints[parseInt(e.target.value)])}
                    >
                        <Radio.Button value="1">
                            <ManOutlined />
                        </Radio.Button>
                        <Radio.Button value="0">
                            <WomanOutlined />
                        </Radio.Button>
                    </Radio.Group>
                </Flex>
            </Container>
            <Container>
                <Tabs centered defaultActiveKey="1" items={items} onChange={onChangePartTab} />
            </Container>
            <Container>
                <div></div>
            </Container>
        </div>
    )
}

interface SelectComponentProps {
    partName: AvatarPartName
    options: AvatarPart[]
    defaultValue?: AvatarPart
    onChange: (option: AvatarPart) => void
}
const PAGE_SIZE = 4
const SelectComponent: React.FC<SelectComponentProps> = ({ partName, options, onChange, defaultValue }) => {
    const [page, setPage] = useState(0)

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Button onClick={() => setPage(page - 1)} disabled={page === 0} icon={<LeftOutlined />} />
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10
                }}
            >
                {[...options].slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((option, index) => {
                    return (
                        <div
                            className="gutter-row"
                            key={`${partName}-${option.name}-${index}`}
                            style={{
                                height: 100,
                                width: 100,
                                backgroundColor: '#f8f8f8',
                                border: '2px solid',
                                borderColor: defaultValue?.name === option.name ? '#1890ff' : '#e8e8e8',
                                borderRadius: 5
                            }}
                            onClick={() => onChange(option)}
                        >
                            <Suspense fallback={<p>Loading...</p>}>
                                <AvatarPartDisplay option={option} partName={partName} />
                            </Suspense>
                            {/* {option.name} */}
                        </div>
                    )
                })}
            </div>
            <Button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 === Math.ceil(options.length / PAGE_SIZE)}
                icon={<RightOutlined />}
            />
        </div>
    )
}

const Container = styled.div``
