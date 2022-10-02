import PostCard from "./Components/PostCard/PostCard";
import Profile from "./Components/Profile/Profile";

export let Routes = [
   {
      path: "/profile/*",
      element: <Profile />,
      children: [
         {
            path: "posts",
            element: (
               <>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/post-1.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/post-2.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/post-3.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/post-4.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/post-5.jpg`} />
                  </div>
               </>
            ),
         },
         {
            path: "saved",
            element: (
               <>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/saved-1.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/saved-2.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/saved-3.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/saved-4.jpg`} />
                  </div>
                  <div className=" col-4 ">
                     <PostCard picture={`/pics/saved-5.jpg`} />
                  </div>
               </>
            ),
         },
      ],
   },
];
