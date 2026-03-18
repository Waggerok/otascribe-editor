import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AppRouter: React.FC = () =>
{

    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='*' element={<NotFoundPage/>} />
        </Routes>
    );
}
