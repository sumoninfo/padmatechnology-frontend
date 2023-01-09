const BackendRoutes = [
    {
        path     : 'dashboard',
        name     : 'adminDashboard',
        component: () => import('../backend/pages/Dashboard'),
        meta     : {
            title: 'Dashboard'
        }
    },
    //==============Amenities routes=================
    {
        path     : 'amenities',
        name     : 'adminAmenities',
        component: () => import('../backend/pages/amenity/Index'),
        meta     : {
            title: 'Amenities List'
        }
    },
    {
        path     : 'amenities/create',
        name     : 'adminAmenityCreate',
        component: () => import('../backend/pages/amenity/Create'),
        meta     : {
            title: 'Amenity Create'
        }
    },
    {
        path     : 'amenities/edit/:id',
        name     : 'adminAmenityEdit',
        component: () => import('../backend/pages/amenity/Create'),
        meta     : {
            title: 'Amenity Edit'
        }
    },
    //==============Rooms routes=================
    {
        path     : 'rooms',
        name     : 'adminRooms',
        component: () => import('../backend/pages/room/Index'),
        meta     : {
            title: 'Rooms List'
        }
    },
    {
        path     : 'rooms/create',
        name     : 'adminRoomCreate',
        component: () => import('../backend/pages/room/Create'),
        meta     : {
            title: 'Room Create'
        }
    },
    {
        path     : 'rooms/edit/:id',
        name     : 'adminRoomEdit',
        component: () => import('../backend/pages/room/Create'),
        meta     : {
            title: 'Room Edit'
        }
    },
    //==============Bookings==================
    {
        path     : 'bookings',
        name     : 'adminBookings',
        component: () => import('../backend/pages/booking/Index'),
        meta     : {
            title: 'Bookings List'
        }
    }, {
        path     : 'bookings/:id',
        name     : 'adminBookingShow',
        component: () => import('../backend/pages/booking/Show'),
        meta     : {
            title: 'Booking Details'
        }
    },
    //==========================
    {
        path     : 'customers',
        name     : 'adminCustomers',
        component: () => import('../backend/pages/customer/Index'),
        meta     : {
            title: 'Customers List'
        }
    },
    {
        path     : 'profile',
        name     : 'adminProfile',
        component: () => import('../backend/pages/Profile'),
        meta     : {
            title: 'Admin Profile'
        }
    }

];

export default BackendRoutes;
