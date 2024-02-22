export default {
    getTabs
}

function getTabs() {
    return [
        {
            title: '全部',
            value: 'all',
            icon: 'app'
        },
        {
            title: '监控',
            value: 'monitor',
            icon: 'precise-monitor'
        },
        {
            title: '发布',
            value: 'release',
            icon: 'share'
        },
        {
            title: '仓库',
            value: 'warehouse',
            icon: 'logo-github'
        },
        {
            title: '工单|审计',
            value: 'audit',
            icon: 'menu-fold'
        },
        {
            title: '运维',
            value: 'operation',
            icon: 'tools'
        },
        {
            title: '工作后台',
            value: 'workbench',
            icon: 'desktop'
        },
        {
            title: 'CRM',
            value: 'crm',
            icon: 'dashboard'
        },
        {
            title: '其它',
            value: 'other',
            icon: 'tips'
        }
    ]
}
