import { ScreenLayout } from '@Components';
import React from 'react';
import Header from './Header.component';
import Today from './Today.component';

const Calendar = () => {
    return (
        <ScreenLayout edges={['top']} >
            <Header />
            <Today />
        </ScreenLayout>
    );
};

export default Calendar;
