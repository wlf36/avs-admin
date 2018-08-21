import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    },

    {
        path: '/vocabulary',
        component: Layout,
        redirect: '/vocabulary/list',
        name: 'Vocabulary',
        meta: {
            title: '词汇表',
            icon: 'component'
        },
        children: [{
                path: 'create',
                component: () =>
                    import ('@/views/vocabulary/create'),
                name: 'Create Vocabulary',
                meta: {
                    title: '创建词汇表',
                    icon: 'edit'
                }
            },
            {
                path: 'list',
                component: () =>
                    import ('@/views/vocabulary/list'),
                name: 'Vocabulary List',
                meta: {
                    title: '词汇表',
                    icon: 'list'
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import ('@/views/vocabulary/edit'),
                name: 'Edit Vocabulary',
                meta: {
                    title: '编辑词汇表',
                    noCache: true
                },
                hidden: true
            },
            {
                path: ':id(\\d+)',
                component: () =>
                    import ('@/views/vocabulary/category'),
                name: 'Category List',
                meta: {
                    title: '分类列表',
                    noCache: true
                },
                hidden: true
            },
            {
                path: ':vocabulary_id/category/:category_id/create',
                component: () =>
                    import ('@/views/category/create'),
                name: 'Create Category',
                meta: {
                    title: '创建分类',
                    icon: 'edit'
                },
                hidden: true
            },
            {
                path: 'category/:category_id/edit',
                component: () =>
                    import ('@/views/category/edit'),
                name: 'Edit Category',
                meta: {
                    title: '编辑分类',
                    icon: 'edit'
                },
                hidden: true
            },
            {
                path: 'tag/create',
                component: () =>
                    import ('@/views/tag/create'),
                name: 'Create Tag',
                meta: {
                    title: '创建标签',
                    icon: 'edit'
                }
            },
            {
                path: 'tag/:id/edit',
                component: () =>
                    import ('@/views/tag/edit'),
                name: 'Edit Tag',
                meta: {
                    title: '编辑标签',
                    icon: 'edit'
                },
                hidden: true
            },
            {
                path: 'tag/list',
                component: () =>
                    import ('@/views/vocabulary/taglist'),
                name: 'Tag List',
                meta: {
                    title: '标签列表',
                    icon: 'list'
                }
            },

        ]
    },

    {
        path: '/banner',
        component: Layout,
        redirect: '/banner/list',
        name: 'Banner',
        meta: {
            title: 'Banner',
            icon: 'example'
        },
        children: [{
                path: 'list',
                component: () =>
                    import ('@/views/banner/list'),
                name: 'Banner list',
                meta: {
                    title: 'Banner list',
                    icon: 'table'
                }
            },
            {
                path: 'create',
                component: () =>
                    import ('@/views/banner/create'),
                name: 'Create banner',
                meta: {
                    title: 'Create banner',
                    icon: 'tree'
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import ('@/views/banner/edit'),
                name: 'Edit banner',
                meta: {
                    title: 'Edit banner',
                    noCache: true
                },
                hidden: true
            },
            {
                path: ':banner_id(\\d+)',
                component: () =>
                    import ('@/views/banner_item/list'),
                name: 'BannerItem List',
                meta: {
                    title: 'banner项目',
                    noCache: true
                },
                hidden: true
            },
            {
                path: ':banner_id/create',
                component: () =>
                    import ('@/views/banner_item/create'),
                name: 'Add Banner Item',
                meta: {
                    title: '添加banner项目',
                    icon: 'edit'
                },
                hidden: true
            },
            {
                path: ':banner_id/banneritem/edit/:banneritem_id',
                component: () =>
                    import ('@/views/banner_item/edit'),
                name: 'Edit BannerItem',
                meta: {
                    title: '编辑banner项目',
                    icon: 'edit'
                },
                hidden: true
            },
        ]
    },

    {
        path: '/product',
        component: Layout,
        redirect: '/product/list',
        name: 'Product',
        meta: {
            title: '商品',
            icon: 'example'
        },
        children: [{
                path: 'list',
                component: () =>
                    import ('@/views/product/list'),
                name: 'Product list',
                meta: {
                    title: '商品列表',
                    icon: 'table'
                }
            },
            {
                path: 'create',
                component: () =>
                    import ('@/views/product/create'),
                name: 'Create product',
                meta: {
                    title: '创建商品',
                    icon: 'tree'
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import ('@/views/product/edit'),
                name: 'Edit product',
                meta: {
                    title: '编辑商品',
                    noCache: true
                },
                hidden: true
            }
        ]
    },

    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        name: 'Order',
        meta: {
            title: '订单管理',
            icon: 'example'
        },
        children: [{
                path: 'list',
                name: 'Order list',
                component: () =>
                    import ('@/views/order/list'),
                meta: {
                    title: '订单管理',
                    icon: 'table'
                }
            },
            // { 
            //   path: 'edit/:id(\\d+)',
            //   name: 'editOrder',
            //   component: () => import('@/views/order/edit'),
            //   meta: { title: '订单编辑', noCache: true },
            //   hidden: true
            // }

        ]
    },

    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'User',
        meta: {
            title: '用户管理',
            icon: 'example'
        },
        children: [{
            path: 'list',
            name: 'User list',
            component: () =>
                import ('@/views/user/list'),
            meta: {
                title: '用户管理',
                icon: 'table'
            }
        }]
    },

    {
        path: '/settings',
        component: Layout,
        redirect: '/settings/userinfo',
        name: 'Settings',
        meta: {
            title: '设置',
            icon: 'example'
        },
        children: [{
                path: 'userinfo',
                name: 'User info',
                component: () =>
                    import ('@/views/settings/userinfo'),
                meta: {
                    title: '用户信息',
                    icon: 'user'
                }
            },
            {
                path: 'password',
                name: 'Password',
                component: () =>
                    import ('@/views/settings/password'),
                meta: {
                    title: '修改密码',
                    icon: 'password'
                }
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})
