import * as React from "react";
import {Admin, Resource} from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';

import {PostList, PostEdit, PostCreate, PostIcon} from './posts';

const App = () => {
    return(
        <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
            <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
        </Admin>
    );
}

export default App;
