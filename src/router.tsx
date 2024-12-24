import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const SignIn = Loader(lazy(() => import('src/content/pages/Auth/Signin')));

const Groups = Loader(lazy(() => import('src/content/pages/Groups/Groups')));
const AddGroups = Loader(lazy(() => import('src/content/pages/Groups/Add')));
const EditGroup = Loader(lazy(() => import('src/content/pages/Groups/Edit')));

const Employees = Loader(lazy(() => import('src/content/pages/Employees/Employees')));
const AddEmployee = Loader(lazy(() => import('src/content/pages/Employees/Add') ));
const EditEmployee = Loader(lazy(() => import('src/content/pages/Employees/Edit')));

const Tasks = Loader(lazy(() => import('src/content/pages/Tasks/Tasks')));
const AddTasks = Loader(lazy(() => import('src/content/pages/Tasks/Add')));
const EditTasks = Loader(lazy(() => import('src/content/pages/Tasks/Edit')));

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/employees" replace />
      },

      {
        path: 'overview',
        element: <Navigate to="/employees" replace />
      },

      {
        path: '*',
        element: <Status404 />
      },

      {
        path: '/signin',
        element: <SignIn />
      },
      
    ]
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'groups',
        element: <Groups />
      },
      {
        path: 'groups-add',
        element: <AddGroups />
      },
      {
        path: 'groups/edit/:id',
        element: <EditGroup />
      }
    ]
  },

  {
    path: '',
    element: <SidebarLayout />,
    children: [
     {
      path: 'employees',
      element: <Employees />
     },
     {
      path: 'employee-add',
      element: <AddEmployee />
     },
     {
      path: 'employees/edit/:id',
      element: <EditEmployee />
     }
    ]
  },  

  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'tasks',
        element: <Tasks />
       },
      {
        path: 'tasks-add',
        element: <AddTasks />
       },
      {
        path: 'tasks/edit/:id',
        element: <EditTasks />
       },
    ]
  },
];

export default routes;
