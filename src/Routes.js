import Profile from "./Components/Profile/Profile";
import Explore from "./Components/Explore/Explore";
import MainPosts from "./Components/MainPosts/MainPosts";
import SavedPosts from "./Components/SavedPosts/SavedPosts";
import Direct from "./Components/Direct/Direct";
import DirectEmptySide from "./Components/DirectEmptySide/DirectEmptySide";
import Home from "./Components/Home/Home";

export let Routes = [
   { path: "/", element: <Home /> },
   { path: "/explore", element: <Explore /> },
   {
      path: "/profile/*",
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
      path: "/direct/*",
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
];
