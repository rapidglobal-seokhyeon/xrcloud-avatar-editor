import React from 'react'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserAddOutlined,
    UserOutlined
} from '@ant-design/icons'

export const EmptyAvatar: React.FunctionComponent = () => {
    return (
        <div
            style={{
                width: 408,
                height: 608,
                background: '#f8f8f8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    fontSize: 50,
                    background: 'blue',
                    width: 80,
                    height: 80,
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%'
                }}
            >
                <UserAddOutlined />
            </div>
        </div>
    )
}
