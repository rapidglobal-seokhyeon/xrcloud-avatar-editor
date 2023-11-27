import styled from '@emotion/styled'
import { useAvatar } from './AvatarContext'
import { allAvatarBlueprints } from './blueprints'
import { AvatarPartName, avatarAnimations } from './types'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Grid, Radio, Row, Tabs, TabsProps } from 'antd'
import { AvatarPartDisplay } from './AvatarDisplay/AvatarPartDisplay'

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
        setCurrentAnimation
    } = useAvatar()
    console.info('blueprint', blueprint)

    const items: TabsProps['items'] = [
        {
            key: 'Hair',
            label: '헤어',
            children: (
                <SelectComponent
                    partName="Hair"
                    options={blueprint.hairs}
                    onChange={(event) => setHair(blueprint.hairs[parseInt(event.target.value)])}
                />
            )
        },
        {
            key: 'Face',
            label: '얼굴',
            children: (
                <SelectComponent
                    partName="Face"
                    options={blueprint.faces}
                    onChange={(event) => setFace(blueprint.faces[parseInt(event.target.value)])}
                />
            )
        },
        {
            key: 'Body',
            label: '상의',
            children: (
                <SelectComponent
                    partName="Body"
                    options={blueprint.bodies}
                    onChange={(event) => setBody(blueprint.bodies[parseInt(event.target.value)])}
                />
            )
        },
        {
            key: 'Leg',
            label: '하의',
            children: (
                <SelectComponent
                    partName="Leg"
                    options={blueprint.legs}
                    onChange={(event) => setLeg(blueprint.legs[parseInt(event.target.value)])}
                />
            )
        },
        {
            key: 'Foot',
            label: '발',
            children: (
                <SelectComponent
                    partName="Foot"
                    options={blueprint.feet}
                    onChange={(event) => setFoot(blueprint.feet[parseInt(event.target.value)])}
                />
            )
        },
        {
            key: 'Glasses',
            label: '안경',
            children: (
                <SelectComponent
                    partName="Glasses"
                    options={blueprint.glasses}
                    onChange={(event) => setGlasses(blueprint.glasses[parseInt(event.target.value)])}
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
                <Tabs defaultActiveKey="1" items={items} onChange={onChangePartTab} />
            </Container>
            <Container>
                <div></div>
            </Container>
        </div>
    )
}

interface SelectComponentProps {
    partName: AvatarPartName
    options: { name: string }[]
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent: React.FC<SelectComponentProps> = ({ partName, options, onChange }) => {
    console.info('options', options)
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            {options.map((option, index) => (
                <div
                    className="gutter-row"
                    key={index}
                    style={{
                        height: 100,
                        width: 100
                    }}
                >
                    <AvatarPartDisplay option={option} partName={partName} />
                </div>
            ))}
        </div>
    )
}

const Container = styled.div``
