import AddService from '@/components/dashboard/AddService';
import AllServices from '@/components/dashboard/AllServices';
import React from 'react';

const ServicesPage = () => {
    return (
        <div>
            <AddService></AddService>
            <AllServices></AllServices>
        </div>
    );
};

export default ServicesPage;