import React from 'react';
import { Flex, Spin } from 'antd';
interface Props {
    isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
    return (
        <>
            {isLoading && (
                <Flex align="center" gap="middle">
                    <Spin size="large" fullscreen={isLoading} />
                </Flex>
            )}
        </>
    );
};

export default Loading;
