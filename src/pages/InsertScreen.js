import React from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'

const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const InsertScreen = () => (
    <BackGroundView>
        <InsertForms />
    </BackGroundView>
)

export default InsertScreen