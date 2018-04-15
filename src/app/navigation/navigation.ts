export const navigation = [
    {
        'id'       : 'applications',
        'title'    : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'     : 'group',
        'icon'     : 'apps',
        'children' : [
            {
                'id'       : 'e-commerce',
                'title'    : 'Nhập hàng',
                'translate': 'NAV.ECOMMERCE',
                'type'     : 'collapse',
                'icon'     : 'shopping_cart',
                'children' : [
                    {
                        'id'   : 'dashboard',
                        'title': 'Dashboard',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/dashboard'
                    },
                    {
                        'id'        : 'products',
                        'title'     : 'Products',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/products',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'stores',
                        'title'     : 'Stores',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/stores',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'couriers',
                        'title'     : 'Couriers',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/couriers',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'buys',
                        'title'     : 'Buys',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/buys',
                        'exactMatch': true
                    },
                    {
                        'id'        : 'orders',
                        'title'     : 'Orders',
                        'type'      : 'item',
                        'url'       : '/apps/e-commerce/orders',
                        'exactMatch': true
                    },
                ]
            }
        ]
    },
];
