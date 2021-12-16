import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode: 'history',
    // scrollBehavior: function(to) {
    //     if (to.hash) {
    //         return { selector: to.hash };
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // },
    routes: [
        // Auth
        {
            path: '/login',
            name: 'LoginPage',
            component: (resolve) => require(['@/pages/auth/Login.vue'], resolve),
            meta: {
                layout: 'blank-layout',
            },
        },
        // graph
        {
            path: '/',
            name: 'GraphPage',
            component: (resolve) => require(['@/pages/graph/Index.vue'], resolve),
            meta: {
                layout: 'graph-layout',
                requiresAuth: true,
            },
        },
        // BDI
        {
            path: '/bdi/search',
            // name: 'BDI_SearchShell',
            component: (resolve) => require(['@/pages/bdi/Index'], resolve),
            children: [
                {
                    path: '',
                    name: 'BDI_SearchResult',
                    component: (resolve) => require(['@/pages/bdi/search/Index'], resolve),
                },
            ],
        },
        {
            path: '/bdi',
            name: 'BdiPage',
            component: (resolve) => require(['@/pages/bdi/Index'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                // {
                //     path: 'search',
                //     name: 'BDI_Search',
                //     component: resolve => require(['@/pages/bdi/search/Index'], resolve),
                // },
                {
                    path: 'organisasi/:keyword?',
                    name: 'BDI_ListOfOrganization',
                    component: (resolve) => require(['@/pages/bdi/ListOfOrganization'], resolve),
                },
                {
                    path: 'tokoh/:keyword?',
                    name: 'BDI_ListOfActor',
                    component: (resolve) => require(['@/pages/bdi/ListOfActor'], resolve),
                },
                {
                    path: 'isu',
                    name: 'BDI_ListOfIssues',
                    component: (resolve) => require(['@/pages/bdi/ListOfIssues'], resolve),
                },
                {
                    path: 'foto',
                    // name: 'BDI_ListOfPhoto',
                    component: (resolve) => require(['@/pages/bdi/ListOfPhoto'], resolve),
                    children: [
                        {
                            path: '',
                            name: 'BDI_ListOfPhotoIndex',
                            component: (resolve) => require(['@/pages/bdi/photo/Index'], resolve),
                        },
                        {
                            path: 'album',
                            name: 'BDI_ListOfPhotoAlbum',
                            component: (resolve) => require(['@/pages/bdi/photo/Album'], resolve),
                        },
                        {
                            path: 'form/:id',
                            name: 'BDI_ListOfPhotoForm',
                            component: (resolve) => require(['@/pages/bdi/photo/Form'], resolve),
                        },
                    ],
                },
            ],
        },
        // Organization
        {
            path: '/organisasi/:id',
            name: 'OrganizationPage',
            component: (resolve) => require(['@/pages/organization/Shell'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'detail',
                    name: 'DetailOfOrganization',
                    component: (resolve) => require(['@/pages/organization/Index'], resolve),
                    children: [
                        {
                            path: 'profil',
                            name: 'ProfileOfOrganization',
                            component: (resolve) => require(['@/pages/organization/profile/Index'], resolve),
                        },

                        {
                            path: 'profil/log',
                            name: 'ProfileLogOfOrganization',
                            component: (resolve) => require(['@/pages/organization/profile/Log'], resolve),
                        },

                        {
                            path: 'profil/log/detail/:data?',
                            name: 'DetailProfileLogOfOrganization',
                            component: (resolve) => require(['@/pages/organization/profile/Old'], resolve),
                        },

                        {
                            path: 'struktur',
                            name: 'StructureOfOrganization',
                            component: (resolve) => require(['@/pages/organization/structure/Index'], resolve),
                        },
                        {
                            path: 'motif-agenda',
                            name: 'MotiveOfOrganization',
                            component: (resolve) => require(['@/pages/organization/motive/Index'], resolve),
                        },
                        {
                            path: 'aktivitas',
                            name: 'ActivitiesOfOrganization',
                            component: (resolve) => require(['@/pages/organization/activities/Index'], resolve),
                        },
                        {
                            path: 'sikap',
                            name: 'FigureOfOrganization',
                            component: (resolve) => require(['@/pages/organization/figure/Index'], resolve),
                        },
                        {
                            path: 'prilaku',
                            name: 'BehaviorOfOrganization',
                            component: (resolve) => require(['@/pages/organization/behavior/Index'], resolve),
                        },
                    ],
                },
                {
                    path: 'form',
                    name: 'FormOfOrganization',
                    component: (resolve) => require(['@/pages/organization/Form'], resolve),
                    children: [
                        {
                            path: 'profile',
                            name: 'FormOfOrganizationProfile',
                            component: (resolve) => require(['@/pages/organization/profile/Form'], resolve),
                        },
                        {
                            path: 'related-people',
                            name: 'FormOfOrganizationOrganizer',
                            component: (resolve) => require(['@/pages/organization/profile/PeopleRelated'], resolve),
                        },
                        {
                            path: 'Structure',
                            name: 'FormOfOrganizationStructure',
                            component: (resolve) => require(['@/pages/organization/structure/Form'], resolve),
                        },
                    ],
                },
            ],
        },
        // Actor
        {
            path: '/tokoh/:id',
            name: 'ActorPage',
            component: (resolve) => require(['@/pages/actor/Shell'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'detail',
                    name: 'DetailOfActor',
                    component: (resolve) => require(['@/pages/actor/Index'], resolve),
                    children: [
                        {
                            path: 'profil',
                            name: 'ProfileOfActor',
                            component: (resolve) => require(['@/pages/actor/profile/Index'], resolve),
                        },
                        {
                            path: 'profil/log',
                            name: 'ProfileLogOfActor',
                            component: (resolve) => require(['@/pages/actor/profile/Log'], resolve),
                        },
                        {
                            path: 'profil/log/detail/:data?',
                            name: 'DetailProfileLogOfActor',
                            component: (resolve) => require(['@/pages/actor/profile/Old'], resolve),
                        },

                        {
                            path: 'karakter',
                            name: 'CharacterOfActor',
                            component: (resolve) => require(['@/pages/actor/character/Index'], resolve),
                        },
                        {
                            path: 'ambisi',
                            name: 'AmbitionOfActor',
                            component: (resolve) => require(['@/pages/actor/ambition/Index'], resolve),
                        },
                        {
                            path: 'opini',
                            name: 'OpinionOfActor',
                            component: (resolve) => require(['@/pages/actor/opinion/Index'], resolve),
                        },
                        {
                            path: 'kekuatan',
                            name: 'StrengthOfActor',
                            component: (resolve) => require(['@/pages/actor/strength/Index'], resolve),
                        },
                        {
                            path: 'keluarga',
                            name: 'FamilyOfActor',
                            component: (resolve) => require(['@/pages/actor/family/Index'], resolve),
                        },
                        {
                            path: 'aktivitas',
                            name: 'ActivitiesOfActor',
                            component: (resolve) => require(['@/pages/actor/activities/Index'], resolve),
                        },
                        {
                            path: 'motif-agenda',
                            name: 'MotiveOfActor',
                            component: (resolve) => require(['@/pages/actor/motive/Index'], resolve),
                        },
                        {
                            path: 'sikap',
                            name: 'FigureOfActor',
                            component: (resolve) => require(['@/pages/actor/figure/Index'], resolve),
                        },
                        {
                            path: 'perilaku',
                            name: 'BehaviorOfActor',
                            component: (resolve) => require(['@/pages/actor/behavior/Index'], resolve),
                        },
                    ],
                },
                {
                    path: 'form',
                    name: 'FormOfActor',
                    component: (resolve) => require(['@/pages/actor/Form'], resolve),
                    children: [
                        {
                            path: 'profile',
                            name: 'ProfileOfActorForm',
                            component: (resolve) => require(['@/pages/actor/profile/Form'], resolve),
                        },
                        {
                            path: 'bio',
                            name: 'ProfileOfActorFormBio',
                            component: (resolve) => require(['@/pages/actor/profile/FormBiography'], resolve),
                        },
                        {
                            path: 'experience',
                            name: 'ProfileOfActorFormExperience',
                            component: (resolve) => require(['@/pages/actor/profile/FormExperience'], resolve),
                        },
                        {
                            path: 'character',
                            name: 'CharacterOfActorForm',
                            component: (resolve) => require(['@/pages/actor/character/Form'], resolve),
                        },
                        {
                            path: 'ambition',
                            name: 'AmbitionOfActorForm',
                            component: (resolve) => require(['@/pages/actor/ambition/Form'], resolve),
                        },
                        {
                            path: 'opinion',
                            name: 'opinionOfActorForm',
                            component: (resolve) => require(['@/pages/actor/opinion/Form'], resolve),
                        },
                        {
                            path: 'strength',
                            name: 'strengthOfActorForm',
                            component: (resolve) => require(['@/pages/actor/strength/Form'], resolve),
                        },
                        {
                            path: 'family',
                            name: 'familyOfActorForm',
                            component: (resolve) => require(['@/pages/actor/family/Form'], resolve),
                        },
                    ],
                },
            ],

        },
        // Issue
        {
            // path:'/isu/:id',
            path: '/isu/:id',
            name: 'IssuePage',
            component: (resolve) => require(['@/pages/issue/Shell'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'detail',
                    name: 'IssueOfIndex',
                    component: (resolve) => require(['@/pages/issue/Index'], resolve),
                    children: [
                        {
                            path: 'profil',
                            name: 'IssueOfprofile',
                            component: (resolve) => require(['@/pages/issue/profile/Index'], resolve),
                        },
                        {
                            path: 'aktivitas',
                            name: 'IssueOfActivity',
                            component: (resolve) => require(['@/pages/issue/activities/Index'], resolve),
                        },
                    ],
                },
                {
                    path: 'form',
                    name: 'FormOfIssue',
                    component: (resolve) => require(['@/pages/issue/Form'], resolve),
                    children: [
                        {
                            path: 'profil',
                            name: 'IssueOfFormprofile',
                            component: (resolve) => require(['@/pages/issue/profile/Form'], resolve),
                        },
                    ],
                },
            ],
        },

        // Management
        {
            path: '/manajemen',
            name: 'ManagementPage',
            component: (resolve) => require(['@/pages/management/Shell'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'isu/:id?/:data?',
                    name: 'IssueOfActor',
                    component: (resolve) => require(['@/pages/management/Index'], resolve),
                },
            ],
        },

        // general Cases
        {
            // path: '/cases/:id?/:data?',
            path: '/cases/:id?',
            // name: 'GeneralCasesShell',
            component: (resolve) => require(['@/pages/general/cases/Shell.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'GeneralCasesIndex',
                    component: (resolve) => require(['@/pages/general/cases/Index.vue'], resolve),
                },
                // {
                //     path: 'form',
                //     name: 'GeneralCasesForm',
                //     component: resolve => require(["@/pages/general/cases/Form.vue"], resolve),
                // },
                {
                    path: 'create',
                    name: 'GeneralCasesCreate',
                    component: (resolve) => require(['@/pages/general/cases/Form.vue'], resolve),
                },
                {
                    path: 'edit',
                    name: 'GeneralCasesEdit',
                    component: (resolve) => require(['@/pages/general/cases/Form.vue'], resolve),
                },
            ],
        },

        // general profile
        {
            path: '/profile',
            name: 'GeneralProfilePage',
            component: (resolve) => require(['@/pages/general/profile/Index.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
        },

        // general Help
        {
            path: '/help',
            name: 'HelpPage',
            component: (resolve) => require(['@/pages/general/help/Index.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
        },
        // general profile
        {
            path: '/notification',
            name: 'NotificationPage',
            component: (resolve) => require(['@/pages/general/notification/Index.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
        },

        // general ACL
        {
            path: '/acl',
            name: 'AclPage',
            component: (resolve) => require(['@/pages/general/acl/Index.vue'], resolve),
        },

        // general Roles
        {
            // path: '/roles/:id?/:data?',
            path: '/roles/:id?',
            // name: 'GeneralRolesShell',
            component: (resolve) => require(['@/pages/general/roles/Shell.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'GeneralRolesIndex',
                    component: (resolve) => require(['@/pages/general/roles/Index.vue'], resolve),
                },
                // {
                //     path: 'form',
                //     name: 'GeneralRolesForm',
                //     component: resolve => require(["@/pages/general/roles/Form.vue"], resolve),
                // },
                {
                    path: 'create',
                    name: 'GeneralRolesCreate',
                    component: (resolve) => require(['@/pages/general/roles/Form.vue'], resolve),
                },
                {
                    path: 'edit',
                    name: 'GeneralRolesEdit',
                    component: (resolve) => require(['@/pages/general/roles/Form.vue'], resolve),
                },
            ],
        },

        // general Users
        {
            // path: '/users/:id?/:data?',
            path: '/users/:id?',
            // name: 'GeneralUsersShell',
            component: (resolve) => require(['@/pages/general/users/Shell.vue'], resolve),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'GeneralUsersIndex',
                    component: (resolve) => require(['@/pages/general/users/Index.vue'], resolve),
                },
                // {
                //     path: 'form',
                //     name: 'GeneralUsersForm',
                //     component: resolve => require(["@/pages/general/users/Form.vue"], resolve),
                // },
                {
                    path: 'create',
                    name: 'GeneralUsersCreate',
                    component: (resolve) => require(['@/pages/general/users/Form.vue'], resolve),
                },
                {
                    path: 'edit',
                    name: 'GeneralUsersEdit',
                    component: (resolve) => require(['@/pages/general/users/Form.vue'], resolve),
                },
            ],
        },
    ],
});
