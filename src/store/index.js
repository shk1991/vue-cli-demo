import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    state: {
        // token:null,
        // userName:"",
        // userInfo:"",
        // isAdmin:false,
        // roleScopes:null,
        // roleScopesDetail:{},
        // mangerEdit:false,
        // showProportion:false,
        // areaData:{
        //     realLocation:null,  //实时所在地数据
        //     longLocation:null   //长居地数据
        // },
        // bureauData:null,
        // tagData:null
    },
    // getters,
    actions,
    mutations,
    strict: debug
});

if (module.hot) {
    module.hot.accept([
        // './getters',
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            // getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default
        });
    });
}

export default store;
