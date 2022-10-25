import Profile from "./Components/Profile/Profile";
import Explore from "./Components/Explore/Explore";
import MainPosts from "./Components/MainPosts/MainPosts";
import SavedPosts from "./Components/SavedPosts/SavedPosts";
import Direct from "./Components/Direct/Direct";
import DirectEmptySide from "./Components/DirectEmptySide/DirectEmptySide";
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Settings from "./Components/Settings/Settings";
import PrivateRoute from "./Components/PrivateRoute";
import OthersProfile from "./Components/OthersProfile/OthersProfile";

export let Routes = [
   { path: "/login", element: <Login /> },
   { path: "/signup", element: <SignUp /> },

   {
      path: "/*",
      element: <PrivateRoute />,
      children: [
         { path: "", element: <Home /> },
         { path: "explore", element: <Explore /> },
         { path: "settings", element: <Settings /> },
         { path: ":username", element: <OthersProfile /> },

         {
            path: "profile/*",
            element: <Profile />,
            children: [
               {
                  path: "posts",
                  element: <MainPosts />,
               },
               {
                  path: "saved",
                  element: <SavedPosts />,
               },
            ],
         },

         {
            path: "direct/*",
            element: <Direct />,
            children: [
               {
                  path: "inbox",
                  element: <DirectEmptySide />,
               },
               {
                  path: ":id",
                  element: <p>choosen</p>,
               },
            ],
         },
      ],
   },
];
